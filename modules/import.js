import { openGitHubProfile, teamMembers } from '/modules/gitHub_export.js';

// footer에 있는 팀원별 버튼 클릭 이벤트 지정
teamMembers.forEach((member) => {
  const clickMember = document.getElementById(member.id);
  clickMember.addEventListener('click', () => openGitHubProfile(member.url));
});
