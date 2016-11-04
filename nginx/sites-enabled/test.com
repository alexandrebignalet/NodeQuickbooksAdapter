server {
  listen 80 default_server;
  #listen [::]:80 default_server ipv6only=on;
  server_name localhost;

  root   /src/webapp;
  index  index.html;
 }

  location ~* /(api|socket\.io) {
      #proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      #proxy_set_header X-NginX-Proxy true;

      proxy_pass http://localhost:3000;
      proxy_redirect off;

      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }
}