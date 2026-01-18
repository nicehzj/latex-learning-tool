# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/client/package.json ./packages/client/
COPY packages/server/package.json ./packages/server/
RUN npm install

COPY packages/client ./packages/client
# Build the React app to packages/client/dist
RUN npm run build -w packages/client

# Stage 2: Final Image
FROM node:18-bullseye-slim

# Install TeX Live and essential tools
# texlive-xetex: The compiler
# texlive-lang-chinese: For Chinese support (ctex)
# texlive-latex-extra: Common packages (geometry, enumitem, etc.)
# texlive-bibtex-extra: For BibTeX support
RUN apt-get update && apt-get install -y --no-install-recommends \
    texlive-xetex \
    texlive-lang-chinese \
    texlive-latex-extra \
    texlive-bibtex-extra \
    latexmk \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./
COPY packages/client/package.json ./packages/client/
COPY packages/server/package.json ./packages/server/

# Install only production dependencies
RUN npm install --omit=dev

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/packages/client/dist ./packages/client/dist

# Copy server code
COPY packages/server ./packages/server

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "packages/server/src/index.js"]
