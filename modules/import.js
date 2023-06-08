import {
  openGitHubProfile,
  teamMembers,
  goToDomain,
  categorys,
} from '/modules/gitHub_export.js';

// footer에 있는 팀원별 버튼 클릭 이벤트 지정
teamMembers.forEach((member) => {
  const clickMember = document.getElementById(member.id);
  clickMember.addEventListener('click', () => openGitHubProfile(member.url));
});

// 서브페이지 카테고리 하나당 클릭 이벤트 지정
categorys.forEach((categorys) => {
  const clickCategory = document.getElementById(categorys.id);
  clickCategory.addEventListener('click', () => goToDomain(categorys.category));
});
