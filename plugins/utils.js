export default ({ app }, inject) => {
  inject("getLectureBrandLogo", (siteName) => {
    let imgName = "";

    if (siteName === "탈잉") {
      imgName = "taling";
    } else if (siteName === "인프런") {
      imgName = "inflearn";
    } else if (siteName === "유데미") {
      imgName = "udemy";
    } else if (siteName === "클래스101") {
      imgName = "class101";
    } else if (siteName === "리메인") {
      imgName = "remain";
    } else if (siteName === "패스트캠퍼스") {
      imgName = "fastcampus";
    } else if (siteName === "프로그래머스") {
      imgName = "programmers";
    } else if (siteName === "노마드코더") {
      imgName = "nomadecoders";
    } else if (siteName === "코드잇") {
      imgName = "codeit";
    } else {
      imgName = "etc";
    }

    return require(`assets/imgs/logo/lecturesite/${imgName}.png`);
  });
};
