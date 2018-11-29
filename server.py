import http.server
import socketserver

PORT = 80

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map['.mjs'] = 'application/javascript'

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()