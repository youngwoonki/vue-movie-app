describe("첫번째 테스트", () => {
  // e2e 테스트에서는 test 함수 대신 it 사용
  it("프로젝트 페이지 이동합니다.", () => {
    // visit : cypress 객체를 생성 후 해당 페이지로 실제 이동시킴
    cy.visit("/");
    cy.get("header .logo"); // css 선택자로 요소 찾아오기
    // cy.get(".young"); => 찾을 수 없는 요소라서 에러
  });
});