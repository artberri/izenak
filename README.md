# izenak.eus

[![Build Status](https://travis-ci.org/artberri/izenak.svg?branch=master)](https://travis-ci.org/artberri/izenak)
[![Coverage Status](https://coveralls.io/repos/github/artberri/izenak/badge.svg?branch=master)](https://coveralls.io/github/artberri/izenak?branch=master)

Web Application to find Basque names. Deployed at [https://izenak.eus/](https://izenak.eus/).

## Project setup

```bash
pnpm install
```

### Compiles and hot-reloads for development

```bash
pnpm run dev
```

### Compiles and minifies for production

```bash
npnpmpm run build
```

### QA (static code analysis and tests)

```bash
pnpm run qa
```

## Scraper

Create Python virtual env

```bash
cd scraper
python3 -m venv env
source env/bin/activate
```

Install dependencies

```bash
python3 -m pip install -r requirements.txt
```

Run the scraper

```bash
scrapy runspider euskaltzaindia.py -o ../public/izenak.json
```

Deactivate virtual env

```bash
deativate
```

## License

izenak.eus. Aurkitu izena zure seme-alabentzat.

Copyright (C) 2019-2022 Alberto Varela <alberto@berriart.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
