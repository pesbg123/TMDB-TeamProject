// 팀원 깃헙 프로필로 넘겨주는 함수
export const openGitHubProfile = (url) => {
  window.open(url);
};

// 배열안에 array로 각각 깃헙 주소 할당
export const teamMembers = [
  { id: 'JH', url: 'https://github.com/pesbg123' },
  { id: 'SH', url: 'https://github.com/jrmun' },
  { id: 'JK', url: 'https://github.com/jinkyung127' },
  { id: 'HW', url: 'https://github.com/hyunwoo87' },
  { id: 'HK', url: 'https://github.com/kwakhyunkyu' },
];

// 상세페이지에서 카테고리들로 넘어가는 함수
export const goToDomain = (domain) =>
  (window.location.href = `/main_page/main_pro8.html?domain=${domain}`);

export const categorys = [
  { id: 'popular-category', category: 'Popular' },
  { id: 'nowplaying-category', category: 'NowPlaying' },
  { id: 'toprate-category', category: 'TopRated' },
  { id: 'upcoming-category', category: 'Upcoming' },
];
