
import { RelaxActivity } from './types';

export const INITIAL_RELAX_ACTIVITIES: RelaxActivity[] = [
  { id: '1', title: 'Đọc sách', description: 'Đắm mình vào những trang sách để mở mang kiến thức và thư giãn tâm hồn.', icon: 'fa-book-open' },
  { id: '2', title: 'Đan len', description: 'Rèn luyện sự kiên nhẫn và tạo ra những món đồ handmade cực xinh.', icon: 'fa-mitten' },
  { id: '3', title: 'Làm việc nhà', description: 'Vừa vận động nhẹ nhàng vừa giúp không gian sống thêm gọn gàng, chill chill.', icon: 'fa-broom' },
  { id: '4', title: 'Chạy & Đi bộ', description: 'Giải phóng năng lượng tiêu cực, hít thở không khí trong lành.', icon: 'fa-person-running' },
  { id: '5', title: 'Đạp xe', description: 'Khám phá phố phường và rèn luyện sức bền cực hiệu quả.', icon: 'fa-bicycle' },
  { id: '6', title: 'Trồng cây', description: 'Kết nối với thiên nhiên và chăm sóc mầm xanh của riêng mình.', icon: 'fa-seedling' },
  { id: '7', title: 'Bóng rổ', description: 'Vận động mạnh mẽ, rèn luyện tinh thần đồng đội và chiều cao.', icon: 'fa-basketball' },
  { id: '8', title: 'Bơi lội', description: 'Sảng khoái trong làn nước mát, giúp cơ thể dẻo dai và thư giãn tuyệt đối.', icon: 'fa-person-swimming' },
  { id: '9', title: 'Nghe nhạc', description: 'Để giai điệu dẫn dắt cảm xúc, xua tan mọi mệt mỏi sau giờ học.', icon: 'fa-music' },
  { id: '10', title: 'Nhảy', description: 'Giải phóng hình thể, bùng nổ năng lượng theo từng nhịp điệu.', icon: 'fa-person-rays' },
  { id: '11', title: 'Hát', description: 'Tự tin thể hiện giọng ca, giải tỏa căng thẳng cực hiệu quả.', icon: 'fa-microphone-lines' },
  { id: '12', title: 'Nấu ăn', description: 'Sáng tạo những món ngon, tận hưởng niềm vui chăm sóc bản thân.', icon: 'fa-utensils' },
];

export const STUDY_SYSTEM_INSTRUCTION = `
Bạn là MindStudy AI, một "chiến thần" tư vấn học thuật cực kỳ Gen Z và tâm lý. 
Nhiệm vụ của bạn là dựa trên hồ sơ học sinh (Lớp, Thế mạnh, Yếu điểm, Thách thức, Mục tiêu) và kết quả của 8 câu hỏi trắc nghiệm tâm lý học tập để tạo ra một lộ trình học tập 4 bước (roadmap) cá nhân hóa.

Yêu cầu định dạng phản hồi:
1. Trả về một đối tượng JSON duy nhất.
2. Roadmap: Mảng gồm 4 nút, mỗi nút có 'title' (tiêu đề ngắn, "giật gân" kiểu Gen Z) và 'content' (nội dung chi tiết, hướng dẫn cụ thể từng bước).
3. Summary: Một đoạn tóm tắt giải pháp tổng quát ngắn gọn, súc tích nhưng đầy đủ ý tưởng.
4. Advice: Lời khuyên chuyên sâu, thực tế để giải quyết thách thức cụ thể của học sinh.
5. motivationalQuote: Một câu danh ngôn truyền cảm hứng hoặc một câu "quote" Gen Z cực chất bằng tiếng Việt.

Lưu ý: Ngôn ngữ phải năng động, sử dụng một ít từ lóng Gen Z phù hợp (như "chill", "flex", "slay", "vibe") nhưng vẫn đảm bảo tính chuyên môn. Phản hồi PHẢI là JSON hợp lệ.
`;
