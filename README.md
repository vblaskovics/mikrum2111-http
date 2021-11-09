# Feladatok

## 1. Feladat

Email alapján random fotó. Írj async-await-el sequential request-eket:

- Email alapján lekérünk egy user-t
- UserId alapján lekérjük az albumokat
- Valamelyik albumnak lekérjük a fotóit
- Valamelyik fotónak az url-jét kiírjuk

## 2. Feladat

Email alapján random fotó. Írj switchMap-el sequential request-eket:

- Email alapján lekérünk egy user-t
- UserId alapján lekérjük az albumokat
- Valamelyik albumnak lekérjük a fotóit
- Valamelyik fotónak az url-jét kiírjuk

## 3. Feladat

Email top-level domain alapján szűrés

- Írj függvényt, ami lekér egy user-t id alapján
- Ha .biz-re végződik az email címe, akkor kérd le hozzá a post-okat is, és írasd ki a post-jainak a számát
- Ha nem .biz-re végződik, akkor a hozzá tartozó todo-kat kérd le, és azok számát írasd ki

## 4. Feladat

Elhúzódó kérések összehangolása

- Kérj le 4 különböző delay-el és query-vel (id, name, email, username) user-eket
- Ha beérkezik egy user, akkor kérd le a post-jait, és írasd ki azok számát!
- Loggolj úgy, hogy lásd a beérkezések pontos idejét!

# Mikrum2111Http

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
