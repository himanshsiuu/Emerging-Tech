#!/usr/bin/env python3
"""
NovaTech - Local Web & API Server
Serves static frontend and provides backend API endpoints on port 8081.
"""

import http.server
import socketserver
import os
import sys
import json
import urllib.request
import urllib.parse
import webbrowser

PORT = 8081
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
ENV_FILE = os.path.join(DIRECTORY, ".env")


def load_env_api_key():
    key = os.environ.get("GEMINI_API_KEY", "")
    if key:
        return key.strip()
    if os.path.exists(ENV_FILE):
        try:
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
    home_env = os.path.expanduser("~/.env")
    if os.path.exists(home_env):
        try:
            with open(home_env, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
    return ""


def save_env_api_key(api_key):
    try:
        lines = []
        if os.path.exists(ENV_FILE):
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                lines = [l for l in f if not l.startswith("GEMINI_API_KEY=")]
        lines.append(f"GEMINI_API_KEY={api_key.strip()}\n")
        with open(ENV_FILE, "w", encoding="utf-8") as f:
            f.writelines(lines)
        os.environ["GEMINI_API_KEY"] = api_key.strip()
        return True
    except Exception:
        return False


def call_gemini(api_key, model, prompt, response_mime_type="application/json"):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.2}
    }
    if response_mime_type == "application/json":
        payload["generationConfig"]["responseMimeType"] = "application/json"

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")

    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            body = resp.read().decode("utf-8")
            res_json = json.loads(body)
            return True, res_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
    except Exception as e:
        return False, str(e)


class NovaTechApiHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stderr.write(f"[NovaTech] {self.address_string()} - {format % args}\n")

    def send_json(self, status_code, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            key = load_env_api_key()
            has_key = bool(key and len(key) > 5)
            self.send_json(200, {
                "status": "ok",
                "hasApiKey": has_key,
                "maskedKey": f"{key[:6]}...{key[-4:]}" if has_key else None,
                "recommendedModel": "gemini-3.7-flash"
            })
            return

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_len = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_len) if content_len > 0 else b"{}"
        try:
            body = json.loads(post_data.decode("utf-8"))
        except Exception:
            body = {}

        if path == "/api/save-key":
            key = body.get("apiKey", "").strip()
            if key:
                save_env_api_key(key)
                self.send_json(200, {"status": "saved"})
            else:
                if os.path.exists(ENV_FILE):
                    os.remove(ENV_FILE)
                self.send_json(200, {"status": "cleared"})
            return

        if path == "/api/chat":
            api_key = body.get("apiKey") or load_env_api_key()
            model = body.get("model", "gemini-3.7-flash")
            message = body.get("message", "")

            if not api_key:
                self.send_json(400, {"error": "Missing Gemini API key"})
                return

            prompt = f"You are NovaTech Principal Frontier Technology Analyst. Respond to: {message}"
            success, text = call_gemini(api_key, model, prompt, response_mime_type="text/plain")
            if success:
                self.send_json(200, {"reply": text})
            else:
                self.send_json(502, {"error": text})
            return

        self.send_json(404, {"error": "Not Found"})


def find_free_port(start_port=8081, max_attempts=20):
    import socket
    for p in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', p)) != 0:
                return p
    return start_port


def main():
    port = find_free_port(PORT)
    url = f"http://localhost:{port}/index.html"

    print("\n" + "=" * 65)
    print("⚡ NovaTech — Autonomous Emerging Tech Intelligence Agent")
    print("=" * 65)
    print(f"📁 Serving directory: {DIRECTORY}")
    print(f"🚀 Local Server running at: {url}")
    print("💡 Press Ctrl+C to stop the server anytime.")
    print("=" * 65 + "\n")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    with socketserver.TCPServer(("", port), NovaTechApiHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Shutting down NovaTech server.")
            httpd.server_close()


if __name__ == "__main__":
    main()
