# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 09-06-2022
### Corrigido
- Corrigido funcionalidade de increment no fetchListSuccess, será validado o número da página, caso a página for igual a 1, então os dados da lista serão resetados, senão será incrementado, isto resolve o problema de quando mudamos de página e voltamos para a mesma e os dados são duplicados.

## [1.0.3] - 14-03-2022
### Corrigido
- Corrigido versão do `vue` em `peerDependencies` para ter compatibilidade com a v2 e v3.

[comment]: <> (A partir da versão 1.0.3, o CHANGELOG.md deve ser escrito em português.)

## 1.0.2
### Fixed
- adjusting response data on update and replace action.

## 0.0.21 - 11-05-2020
### Changed
- fixed splice in replaceSuccess

## 0.0.20 - 11-05-2020
### Changed
- fixed splice in replaceStart

## 0.0.19 - 11-05-2020
### Added
- added new option `idAttribute` to constructor
