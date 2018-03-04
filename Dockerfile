FROM alekzonder/puppeteer:1.1.1

RUN mkdir -p /home/pptruser/app

WORKDIR /home/pptruser/app

RUN mkdir -p /home/pptruser/.npm-global
RUN npm config set prefix '/home/pptruser/.npm-global'
ENV PATH="/home/pptruser/.npm-global/bin:${PATH}"

RUN chown -R pptruser:pptruser /home/pptruser/.npm-global
RUN chown -R pptruser:pptruser /home/pptruser/app

COPY ./src/ /home/pptruser/app/src/
COPY ./bin/ /home/pptruser/app/bin/
COPY ./package.json /home/pptruser/app/package.json
COPY ./yarn.lock /home/pptruser/app/yarn.lock

RUN  cd /home/pptruser/app && \
      yarn && \ 
      yarn build && \
      yarn global add /home/pptruser/app
