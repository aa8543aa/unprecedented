# 작업 관리: GitHub Project 보드

- 날짜: 2026-11-23
- 이슈: #10
- PR: (이 PR)
- 상태: 채택

## 배경

규칙 1(모든 작업은 이슈)에 따라 생기는 이슈들의 진행 상황을 한눈에 보고, 협업자가 합류해도 바로 이해할 수 있는 관리 도구가 필요했다.

## 검토한 선택지

1. **GitHub Projects**: 이슈/PR과 바로 연동되고 무료다. 외부 도구 계정이 필요 없다.
2. **외부 도구 (Notion, Jira, Trello 등)**: 기능은 풍부하지만 이슈와 이중으로 관리해야 하고, 협업자에게 계정과 권한을 따로 줘야 한다.

## 결정

- 사용자 소유 Project `unprecedented`(public)를 만들고 저장소와 연결한다. https://github.com/users/aa8543aa/projects/2
- Status 필드: 기본값 `Todo` / `In Progress` / `Done`
  - 이슈 생성 → `Todo`, PR 생성 → `In Progress`, PR 머지로 이슈가 닫히면 → `Done` (기본 워크플로)
- Phase 필드: `MVP` / `post-MVP` (라벨 `phase: *`와 같은 값을 쓴다)
- 새 이슈는 생성 즉시 보드에 추가하고 Status와 Phase를 지정한다.

## 이유

- 이슈 중심 흐름과 가장 잘 맞고, 저장소가 public이라 보드도 public으로 두면 협업자가 권한 없이 볼 수 있다.
- Phase를 보드 필드로도 두면 MVP 항목만 걸러 보거나 묶어 볼 수 있다.

## 영향

- 라벨과 Phase 필드가 중복되므로 이슈를 만들 때 둘 다 맞춰야 한다. 번거로워지면 Project의 auto-add 워크플로(웹 UI 설정)를 켜는 방안을 검토한다.
- 리뷰 대기 단계가 필요해지면 Status에 `In Review`를 추가한다.
