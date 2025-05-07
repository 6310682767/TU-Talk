export const campuses = [
    { name: 'รังสิต' },
    { name: 'ท่าพระจันทร์' },
    { name: 'ลำปาง' },
    { name: 'พัทยา' },
  ];
  
  export type CategoryIconName =
    | 'chat-question'
    | 'book-open-variant'
    | 'account-star'
    | 'home-city'
    | 'magnify'
    | 'silverware-fork-knife'
    | 'newspaper-variant-outline'
    | 'briefcase-variant-outline'
    | 'calendar-star';
  
  export interface Category {
    name: string;
    icon: CategoryIconName;
  }
  
  export const categories: Category[] = [
    { name: 'ถาม-ตอบทั่วไป', icon: 'chat-question' },
    { name: 'วิชาการ', icon: 'book-open-variant' },
    { name: 'รีวิววิชา & อาจารย์', icon: 'account-star' },
    { name: 'หอพัก', icon: 'home-city' },
    { name: 'ตามหาของหาย', icon: 'magnify' },
    { name: 'ร้านเด็ดในมอ', icon: 'silverware-fork-knife' },
    { name: 'ข่าวสาร', icon: 'newspaper-variant-outline' },
    { name: 'ฝึกงาน/สหกิจ', icon: 'briefcase-variant-outline' },
    { name: 'กิจกรรม/ชมรม', icon: 'calendar-star' },
  ];
  
  export const targetGroups = [
    { name: 'ทุกคน', icon: 'account-group' },
    { name: 'คณะเดียวกัน', icon: 'account-multiple' },
    { name: 'สาขาเดียวกัน', icon: 'account' },
  ];