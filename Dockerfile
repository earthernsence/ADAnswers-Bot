FROM oven/bun

WORKDIR /usr/src/adab

COPY package.json .
COPY bun.lockb .

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "run", "start"]