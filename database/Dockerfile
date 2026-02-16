FROM postgres:16

RUN apt-get update \
 && apt-get install -y --no-install-recommends locales \
 && sed -i '/pt_BR.UTF-8/s/^# //' /etc/locale.gen \
 && locale-gen \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV LANG=pt_BR.UTF-8
ENV LC_ALL=pt_BR.UTF-8
