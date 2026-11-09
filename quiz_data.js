/**
 * ENDY - KHO DỮ LIỆU ĐỐ VUI AN TOÀN CHO TRẺ EM (200 CÂU HỎI TOÀN DIỆN)
 * Bản quyền thuộc về Hành trình số Việt Nam My Love
 * Phát triển bởi Cô giáo Đinh Thị Ngọc - Giáo viên Trường TH Thanh Bình
 */

const QUIZ_BANK = [
  {
    "q": "Khi thấy bạn không may rơi xuống nước sâu, việc em nên làm ĐẦU TIÊN là gì?",
    "options": [
      "Nhảy ngay xuống nước để kéo bạn lên",
      "Hô thật to gọi người lớn và tìm vật nổi ném cho bạn",
      "Bỏ chạy về nhà không nói với ai",
      "Đứng im xem bạn bơi thế nào"
    ],
    "correct": 1,
    "explain": "Chính xác! Trẻ em tuyệt đối không tự nhảy xuống nước cứu bạn vì rất dễ bị kéo chìm theo. Hãy hô to và ném vật nổi!",
    "category": "Đuối nước"
  },
  {
    "q": "Trước khi xuống hồ bơi hoặc tắm biển, em cần làm gì để tránh bị chuột rút?",
    "options": [
      "Ăn thật no ngay trước khi bơi",
      "Khởi động kỹ các khớp tay, chân từ 10 - 15 phút",
      "Uống thật nhiều nước ngọt có ga",
      "Chạy ngay xuống nước lạnh mà không chuẩn bị"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Khởi động giúp làm nóng cơ bắp, lưu thông máu và phòng tránh chuột rút nguy hiểm dưới nước.",
    "category": "Đuối nước"
  },
  {
    "q": "Nếu đang bơi mà chẳng may bị chuột rút ở chân, em nên xử lý như thế nào?",
    "options": [
      "Hoảng loạn vùng vẫy thật mạnh",
      "Bình tĩnh thả lỏng, ngửa cổ thả nổi trên mặt nước và giơ tay kêu cứu",
      "Lặn xuống đáy hồ để nghỉ ngơi",
      "Cố gắng bơi thật nhanh bằng hai tay"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Thả nổi ngửa giúp em lấy được dưỡng khí thở và bảo tồn sức lực trong khi chờ người tới cứu.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi đi trên tàu, thuyền, ca-nô hoặc đò qua sông, quy tắc an toàn bắt buộc là gì?",
    "options": [
      "Mặc áo phao đúng quy cách trong suốt chuyến đi",
      "Đứng lên mũi thuyền đùa giỡn chụp ảnh",
      "Thò tay chân xuống nước nghịch sóng",
      "Ngồi dồn hết về một bên mạn thuyền"
    ],
    "correct": 0,
    "explain": "Chính xác! Luôn luôn mặc áo phao cài khóa chắc chắn khi đi bất kỳ phương tiện giao thông đường thủy nào.",
    "category": "Đuối nước"
  },
  {
    "q": "Tại sao các chum, vại, bể chứa nước hoặc giếng nước ở gia đình cần phải có nắp đậy chắc chắn?",
    "options": [
      "Để nước không bị bốc hơi",
      "Để phòng tránh trẻ nhỏ vô tình ngã vào gây đuối nước",
      "Để nước nhìn trong hơn",
      "Chỉ để ngăn lá cây rơi vào"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Rất nhiều tai nạn đuối nước thương tâm xảy ra ngay tại xô chậu, lu chứa nước sâu trong gia đình.",
    "category": "Đuối nước"
  },
  {
    "q": "Vào mùa hè trời nóng, em có được tự ý rủ bạn bè ra sông, suối, hồ đá để tắm không?",
    "options": [
      "Được, chỉ cần biết bơi là đi thoải mái",
      "Tuyệt đối KHÔNG, chỉ được tắm bơi khi có người lớn giám sát và ở nơi an toàn",
      "Đi tắm lén không để bố mẹ biết",
      "Đi bơi ở nơi nước sâu chảy xiết mới vui"
    ],
    "correct": 1,
    "explain": "Chính xác! Sông suối tự nhiên có nhiều vùng nước xoáy, bùn lầy, hốc đá ngầm cực kỳ nguy hiểm kể cả với người biết bơi.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi cứu bạn bị ngã xuống nước từ trên bờ, em có thể dùng vật dụng nào sau đây?",
    "options": [
      "Một hòn đá to ném xuống",
      "Cây sào dài, cành cây chắc, sợi dây thừng hoặc can nhựa rỗng có nắp",
      "Nhảy đè lên người bạn",
      "Ném điện thoại cho bạn"
    ],
    "correct": 1,
    "explain": "Rất tốt! Ném vật nổi như can nhựa, phao hoặc đưa cành cây, sào dài để bạn bám vào kéo vào bờ an toàn.",
    "category": "Đuối nước"
  },
  {
    "q": "Tại bể bơi có cắm biển báo 'Khu vực nước sâu 2m - Cấm nhảy chúi đầu', em phải làm gì?",
    "options": [
      "Cứ nhảy thử xem có chạm đáy không",
      "Tuyệt đối không bơi vào khu vực nước sâu vượt quá chiều cao của mình và tuân thủ biển báo",
      "Thi lặn cùng các bạn",
      "Nhảy cầu lộn nhào xuống"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuân thủ biển báo độ sâu để tránh đuối nước và chấn thương đốt sống cổ do va chạm đáy hồ.",
    "category": "Đuối nước"
  },
  {
    "q": "Dòng chảy xa bờ (dòng rip) ở bãi biển nguy hiểm như thế nào?",
    "options": [
      "Làm nước biển ấm hơn",
      "Cuốn trôi người bơi ra xa khỏi bờ biển rất nhanh và mạnh",
      "Tạo ra nhiều cá lớn",
      "Làm sóng vỗ êm đềm"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Dòng chảy xa bờ là nguyên nhân hàng đầu gây đuối nước ở biển, cuốn người bơi ra xa bờ trong tích tắc.",
    "category": "Đuối nước"
  },
  {
    "q": "Nếu không may bị dòng chảy xa bờ cuốn ra xa ngoài biển, em nên bơi như thế nào?",
    "options": [
      "Cố bơi ngược dòng thẳng vào bờ cho tới khi kiệt sức",
      "Bình tĩnh bơi ngang song song với bờ biển để thoát khỏi dòng chảy, rồi mới bơi vào bờ",
      "Lặn xuống đáy biển",
      "Buông xuôi không làm gì"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Không bơi ngược dòng vì sẽ kiệt sức. Hãy bơi song song với bờ biển để thoát khỏi luồng nước xiết rồi bơi vào.",
    "category": "Đuối nước"
  },
  {
    "q": "Sau khi vừa ăn cơm no xong, em có nên nhảy ngay xuống hồ bơi không?",
    "options": [
      "Nên bơi ngay cho dễ tiêu hóa thức ăn",
      "Không nên, vì dễ gây tức bụng, nôn ói, trào ngược và co rút cơ bắp",
      "Bơi càng sớm càng tốt",
      "Ăn càng no bơi càng khỏe"
    ],
    "correct": 1,
    "explain": "Chính xác! Nên nghỉ ngơi ít nhất 45 - 60 phút sau khi ăn no rồi mới xuống bơi.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi tắm biển, nhìn thấy cờ màu đỏ cắm trên bãi cát có ý nghĩa gì?",
    "options": [
      "Nơi biển an toàn nhất được phép bơi",
      "Cảnh báo vùng nước nguy hiểm, sóng lớn, cấm tắm biển tại khu vực này",
      "Nơi có nhiều quà tặng",
      "Nơi dành riêng cho trẻ em"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Cờ đỏ là biển báo nguy hiểm cấm tắm biển. Luôn quan sát cờ hiệu cứu hộ bờ biển!",
    "category": "Đuối nước"
  },
  {
    "q": "Áo phao cứu sinh an toàn nhất khi nào?",
    "options": [
      "Mặc vừa vặn với cơ thể và đã cài đủ tất cả các chốt khóa an toàn",
      "Chỉ cần khoác hờ trên vai không cài khóa",
      "Mặc áo phao quá rộng của người lớn",
      "Buộc áo phao vào chân"
    ],
    "correct": 0,
    "explain": "Chính xác! Áo phao phải vừa vặn và cài đủ các khóa bấm (kể cả đai luồn qua đùi nếu có) để không bị tuột khi xuống nước.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi trời bắt đầu đổ mưa dông, có sấm chớp khi em đang tắm biển hoặc bể bơi ngoài trời, em cần làm gì?",
    "options": [
      "Tiếp tục tắm dưới mưa cho mát",
      "Lên bờ ngay lập tức, lau khô người và tìm nơi trú ẩn an toàn trong nhà",
      "Trèo lên chòi cứu hộ ngắm sét",
      "Lặn sâu xuống nước để tránh sét"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Nước dẫn điện cực tốt, ở dưới nước khi có sấm sét có nguy cơ bị sét đánh tử vong.",
    "category": "Đuối nước"
  },
  {
    "q": "Tại sao trẻ em tuyệt đối KHÔNG ĐƯỢC chơi đùa, rượt đuổi nhau xung quanh bờ thành bể bơi?",
    "options": [
      "Vì bể bơi không có người phục vụ",
      "Vì sàn gạch quanh bể bơi rất trơn trượt, dễ trượt ngã đập đầu chấn thương hoặc rơi xuống nước",
      "Vì sợ làm bẩn nước bể bơi",
      "Vì sẽ làm ồn người khác"
    ],
    "correct": 1,
    "explain": "Rất đúng! Xung quanh hồ bơi luôn ướt và trơn trượt, tuyệt đối không chạy nhảy xô đẩy bạn.",
    "category": "Đuối nước"
  },
  {
    "q": "Hố công trình xây dựng có nước mưa đọng lại có an toàn để tắm không?",
    "options": [
      "Rất an toàn vì nước mưa sạch",
      "Cực kỳ NGUY HIỂM vì hố sâu không xác định, bùn lún và có cọc sắt nhọn",
      "Có thể rủ bạn ra tắm",
      "Nước nông nên chơi thoải mái"
    ],
    "correct": 1,
    "explain": "Chính xác! Đã có rất nhiều vụ tai nạn do hố móng công trình ngập nước lún bùn sâu. Tuyệt đối không lại gần!",
    "category": "Đuối nước"
  },
  {
    "q": "Khi ở nhà một mình, em có nên tự ý ra ao, hồ cạnh nhà nghịch nước không?",
    "options": [
      "Được, chỉ cần cẩn thận",
      "Tuyệt đối KHÔNG, luôn tránh xa các khu vực ao hồ nguy hiểm",
      "Rủ thêm các em nhỏ đi cùng",
      "Chỉ nghịch nước khi trời nắng"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Tuyệt đối không được chơi đùa gần ao hồ sông suối một mình.",
    "category": "Đuối nước"
  },
  {
    "q": "Biện pháp phòng ngừa đuối nước hiệu quả và bền vững nhất cho học sinh là gì?",
    "options": [
      "Học bơi an toàn và rèn luyện kỹ năng tự cứu, kỹ năng cứu đuối an toàn",
      "Ở nhà không bao giờ nhìn thấy nước",
      "Chỉ cần mang theo phao nhựa đồ chơi",
      "Uống thuốc chống đuối nước"
    ],
    "correct": 0,
    "explain": "Tuyệt vời! Học bơi đúng kỹ thuật và nắm vững kỹ năng an toàn nước giúp bảo vệ tính mạng suốt đời.",
    "category": "Đuối nước"
  },
  {
    "q": "Phao bơi đồ chơi bằng nhựa mỏng (phao thiên nga, phao vịt) có thay thế được áo phao cứu sinh không?",
    "options": [
      "Thay thế hoàn toàn tốt",
      "KHÔNG, phao đồ chơi dễ bị xì hơi, lật úp hoặc trôi dạt ra xa bờ rất nguy hiểm",
      "Phao đồ chơi tốt hơn áo phao",
      "Dùng phao đồ chơi ở biển sâu rất an toàn"
    ],
    "correct": 1,
    "explain": "Chính xác! Phao đồ chơi không phải là thiết bị cứu sinh chuẩn, không được chủ quan.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi người lớn đang đưa bạn bị ngạt nước lên bờ, việc đầu tiên cần làm là gì?",
    "options": [
      "Vác dốc ngược bạn lên vai chạy vòng quanh",
      "Đặt bạn nằm ngửa trên mặt phẳng cứng, kiểm tra hơi thở và ép tim thổi ngạt nếu ngừng thở",
      "Đắp chăn bông thật dày và bỏ đi",
      "Cho bạn uống ngay một cốc nước đường"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Động tác dốc ngược nạn nhân là sai lầm nguy hiểm làm mất thời gian vàng cấp cứu ép tim hồi sinh tim phổi.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi đi bè, phà qua sông, nếu thấy phà quá đông người và không còn áo phao, em nên làm gì?",
    "options": [
      "Cứ chen lên đi đại cho kịp giờ",
      "Khuyên bố mẹ chờ chuyến phà sau có đủ áo phao và không chở quá tải",
      "Nhảy xuống nước bơi theo phà",
      "Trèo lên nóc phà ngồi"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuyệt đối không đi các chuyến đò ngang, phà chở quá tải trọng quy định.",
    "category": "Đuối nước"
  },
  {
    "q": "Trò chơi 'nhấn đầu bạn dưới nước' trong bể bơi có nguy hiểm không?",
    "options": [
      "Không sao, chơi đùa một chút càng vui",
      "CỰC KỲ NGUY HIỂM, có thể làm bạn bị sặc nước, ngạt thở và dẫn đến đuối nước tử vong",
      "Giúp bạn nín thở giỏi hơn",
      "Làm nước trong bể bơi sạch hơn"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Tuyệt đối không chơi trò nhấn đầu dìm bạn xuống nước dưới mọi hình thức.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi thấy biển báo 'CẢNH BÁO: KHU VỰC THƯỜNG XUYÊN XẢ NƯỚC ĐẬP THỦY ĐIỆN', em phải làm gì?",
    "options": [
      "Xuống lòng sông bắt cá lúc cạn",
      "Tránh xa khu vực lòng sông, hạ lưu đập vì nước lũ có thể dâng lên cuồn cuộn bất ngờ",
      "Dựng lều cắm trại ngay bờ sông",
      "Rủ bạn bơi thi qua sông"
    ],
    "correct": 1,
    "explain": "Rất đúng! Nước xả đập thủy điện dâng cao và chảy cực xiết chỉ trong vài phút, cuốn phăng mọi thứ.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi bơi ở hồ bơi sâu, nếu cảm thấy mệt mỏi, khó thở hoặc lạnh buốt, em nên làm gì?",
    "options": [
      "Cố gắng bơi tiếp thêm vài vòng",
      "Bơi vào thành bể bơi ngay, leo lên bờ lau khô người và báo người lớn",
      "Lặn xuống đáy hồ nghỉ ngơi",
      "Nhắm mắt thả trôi tự do"
    ],
    "correct": 1,
    "explain": "Chính xác! Phải lập tức lên bờ khi thấy cơ thể lạnh run hoặc kiệt sức để tránh chuột rút đột ngột.",
    "category": "Đuối nước"
  },
  {
    "q": "Kỹ thuật 'thả nổi sống còn' (bơi tự cứu) khi rơi xuống nước sâu gồm các bước nào?",
    "options": [
      "Vùng vẫy loạn xạ gào khóc",
      "Thả lỏng cơ thể, ngửa đầu lên trên hít thở sâu, hai tay dang rộng ngang vai",
      "Cố đập chân thật mạnh không ngừng nghỉ",
      "Gập cong người ôm chặt hai đầu gối"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Thả lỏng và ngửa đầu giúp mũi miệng nhô lên khỏi mặt nước để thở nhẹ nhàng mà không tốn sức.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi nhà bị ngập lụt sâu do bão lũ, trẻ em có được tự ý bơi lội trong dòng nước lụt không?",
    "options": [
      "Được, nước lụt tắm rất vui",
      "Tuyệt đối KHÔNG, vì nước lụt chứa rác bẩn, vi khuẩn, dòng chảy xiết và nguy cơ điện giật từ cột điện rò rỉ",
      "Cứ chèo thuyền xốp ra đường",
      "Rủ bạn lội nước bắt cá"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Nước lũ tiềm ẩn nguy cơ nắp cống bị bật mở, dòng xoáy ngầm và rò rỉ điện từ cột điện gãy đổ.",
    "category": "Đuối nước"
  },
  {
    "q": "Tại bể bơi, phao cứu sinh hình tròn treo trên tường dùng để làm gì?",
    "options": [
      "Dùng làm đồ chơi ném nhau",
      "Dùng để nhân viên cứu hộ hoặc người trên bờ ném cứu người đang bị đuối nước",
      "Dùng để ngồi lên nghỉ ngơi",
      "Dùng để trang trí bể bơi"
    ],
    "correct": 1,
    "explain": "Chính xác! Phao cứu sinh tròn là thiết bị khẩn cấp, chỉ sử dụng khi cứu nạn cứu hộ.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi đi tắm biển cùng gia đình, khoảng cách an toàn em nên giữ với bố mẹ là bao nhiêu?",
    "options": [
      "Bơi cách xa hàng trăm mét không cần ai thấy",
      "Luôn ở trong tầm mắt và tầm với tay của bố mẹ hoặc người lớn",
      "Bơi ra ngoài hàng rào phao chắn sóng",
      "Bơi một mình ở bãi biển vắng"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Luôn ở gần người lớn để kịp thời được hỗ trợ khi có sóng lớn bất ngờ.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi thấy bạn đang chới với dưới nước, nếu xung quanh không có người lớn, em ném đồ vật gì cho bạn là TỐT NHẤT?",
    "options": [
      "Một hòn gạch",
      "Can nhựa 5 lít rỗng có đậy nắp kín, hoặc quả bóng đá, thùng xốp",
      "Một chiếc dép nhựa mỏng",
      "Một chiếc khăn mặt ướt"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Can nhựa có nắp, thùng xốp, bóng đá có sức nổi rất lớn, giúp bạn bám vào để không bị chìm.",
    "category": "Đuối nước"
  },
  {
    "q": "Động tác nào sau đây giúp kiểm tra độ an toàn của áo phao trước khi mặc?",
    "options": [
      "Kéo thử các khóa bấm và đường chỉ may xem có chắc chắn, nguyên vẹn không",
      "Chỉ cần nhìn màu sắc áo có đẹp không",
      "Không cần kiểm tra",
      "Ngửi mùi áo phao"
    ],
    "correct": 0,
    "explain": "Chính xác! Kiểm tra các chốt cài, dây đai để đảm bảo áo không bị rách hay gãy khóa khi chịu lực nước.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi tắm ở thác nước tự nhiên, nguy hiểm ngầm lớn nhất là gì?",
    "options": [
      "Nước quá trong",
      "Đá trơn trượt phủ rêu, vực sâu bất ngờ dưới chân thác và xoáy nước ngầm",
      "Nhiều cây xanh che bóng mát",
      "Có nhiều chim hót"
    ],
    "correct": 1,
    "explain": "Rất tốt! Chân các thác nước thường có hố xoáy sâu và đá tảng rất trơn trượt nguy hiểm.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi nhảy từ trên bờ xuống bể bơi, tư thế an toàn cho người mới tập là gì?",
    "options": [
      "Nhảy chúi đầu thẳng đứng xuống",
      "Nhảy thẳng đứng hai chân tiếp nước trước ở vị trí được người lớn cho phép",
      "Nhảy xoay lưng đập gáy xuống",
      "Vừa chạy đà vừa nhảy"
    ],
    "correct": 1,
    "explain": "Chính xác! Nhảy tiếp nước bằng chân giúp kiểm soát thăng bằng và không bị đập đầu xuống đáy bể.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi bơi, nếu vô tình bị sặc nước vào mũi họng, em nên làm gì?",
    "options": [
      "Hít thật mạnh qua mũi",
      "Nhanh chóng bám vào thành bể hoặc phao nổi, ho tống nước ra ngoài và thở bằng miệng",
      "Lặn sâu xuống đáy hồ",
      "Cố gắng nuốt hết nước vào bụng"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Bình tĩnh bám vào điểm tựa, ho nhẹ để tống dị vật nước ra khỏi đường thở.",
    "category": "Đuối nước"
  },
  {
    "q": "Kính bơi có tác dụng chính là gì?",
    "options": [
      "Bảo vệ mắt khỏi hóa chất clo và vi khuẩn trong nước, giúp quan sát rõ ràng dưới nước",
      "Làm cho mình bơi nhanh hơn cá voi",
      "Để chống nắng ban đêm",
      "Chỉ để chụp ảnh cho đẹp"
    ],
    "correct": 0,
    "explain": "Rất chuẩn! Kính bơi bảo vệ mắt và giúp em nhìn rõ đường bơi, tránh va chạm với người khác.",
    "category": "Đuối nước"
  },
  {
    "q": "Số điện thoại nào của Việt Nam tiếp nhận thông tin tìm kiếm cứu nạn trên sông biển khẩn cấp?",
    "options": [
      "111",
      "114 hoặc 112",
      "119",
      "116"
    ],
    "correct": 1,
    "explain": "Chính xác! 114 là số Cứu nạn cứu hộ chuyên nghiệp và 112 là số cứu nạn khẩn cấp quốc gia.",
    "category": "Đuối nước"
  },
  {
    "q": "Khi đi bộ trên đoạn đường không có vỉa hè, em phải đi như thế nào là đúng luật?",
    "options": [
      "Đi ở giữa lòng đường cho rộng",
      "Đi sát mép đường bên tay phải của mình",
      "Đi dàn hàng ngang với các bạn",
      "Đi sát mép đường bên trái bất chấp xe cộ"
    ],
    "correct": 1,
    "explain": "Chính xác! Luôn đi sát mép đường bên phải khi không có vỉa hè để cùng chiều quan sát luồng xe an toàn.",
    "category": "Giao thông"
  },
  {
    "q": "Khi muốn sang đường ở nơi có vạch kẻ đường dành cho người đi bộ, quy tắc đúng là gì?",
    "options": [
      "Cắm đầu chạy thật nhanh sang đường",
      "Quan sát trái - phải - trái, giơ cao tay xin đường và bước đi cẩn thận",
      "Vừa đi vừa xem điện thoại hoặc đọc truyện",
      "Nhắm mắt nhảy qua dải phân cách"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Quan sát kỹ cả 2 phía và giơ cao tay giúp các tài xế từ xa nhận biết em đang qua đường.",
    "category": "Giao thông"
  },
  {
    "q": "Tín hiệu đèn giao thông màu VÀNG báo hiệu điều gì cho người tham gia giao thông?",
    "options": [
      "Được phép tăng ga chạy thật nhanh qua ngã tư",
      "Phải giảm tốc độ và dừng lại trước vạch dừng, trừ khi đã đi quá vạch dừng",
      "Được bấm còi liên tục",
      "Tất cả các xe được đi tự do"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đèn vàng là tín hiệu chuyển giao, chuẩn bị sang đèn đỏ, em phải đi chậm và dừng trước vạch.",
    "category": "Giao thông"
  },
  {
    "q": "Từ bao nhiêu tuổi thì trẻ em bắt buộc phải đội mũ bảo hiểm khi ngồi trên xe mô tô, xe gắn máy, xe đạp điện?",
    "options": [
      "Từ 3 tuổi",
      "Từ đủ 6 tuổi trở lên",
      "Từ 15 tuổi",
      "Chỉ người lớn mới cần đội"
    ],
    "correct": 1,
    "explain": "Chính xác! Trẻ em từ đủ 6 tuổi trở lên bắt buộc phải đội mũ bảo hiểm đạt chuẩn cài quai đúng cách.",
    "category": "Giao thông"
  },
  {
    "q": "Đội mũ bảo hiểm đúng quy cách là cài quai như thế nào?",
    "options": [
      "Cài quai thật lỏng để mũ lắc lư",
      "Cài quai vừa khít dưới cằm, chỉ luồn vừa 1 đến 2 ngón tay",
      "Không cần cài quai, chỉ đội lên đầu",
      "Cài quai vòng qua sau gáy"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Quai mũ phải vừa khít dưới cằm để khi có va chạm, mũ bảo hiểm không bị văng ra khỏi đầu.",
    "category": "Giao thông"
  },
  {
    "q": "Khi ngồi sau xe máy của bố mẹ, tư thế an toàn nhất cho em là gì?",
    "options": [
      "Đứng lên yên xe để đón gió",
      "Ngồi ngay ngắn, hai đùi khép nhẹ ôm eo người lái, hai chân đặt lên gác chân",
      "Quay lưng lại với người lái xe",
      "Thò hai chân ra phía bánh xe"
    ],
    "correct": 1,
    "explain": "Chính xác! Ngồi ngay ngắn ôm eo người lái giúp giữ thăng bằng và không bị ngã khi xe vào cua hay phanh gấp.",
    "category": "Giao thông"
  },
  {
    "q": "Khi đi xe buýt công cộng hoặc ô tô con, hành vi nào sau đây TUYỆT ĐỐI BỊ CẤM vì nguy hiểm?",
    "options": [
      "Thắt dây an toàn khi xe chạy",
      "Thò đầu, thò tay hoặc ném đồ vật ra ngoài cửa sổ xe",
      "Ngồi trật tự trên ghế ngồi",
      "Nhường ghế cho người già và phụ nữ mang thai"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Thò đầu hay tay ra ngoài cửa sổ có thể bị các xe chạy ngược chiều va quẹt dẫn đến thương tích rất nặng.",
    "category": "Giao thông"
  },
  {
    "q": "Biển báo giao thông có hình tròn, viền đỏ, nền trắng là loại biển báo gì?",
    "options": [
      "Biển báo CẤM",
      "Biển báo NGUY HIỂM",
      "Biển báo HIỆU LỆNH",
      "Biển CHỈ DẪN"
    ],
    "correct": 0,
    "explain": "Chính xác! Biển hình tròn viền đỏ biểu thị những điều cấm người tham gia giao thông không được vi phạm.",
    "category": "Giao thông"
  },
  {
    "q": "Biển báo giao thông hình tam giác đều, viền đỏ, nền vàng biểu thị điều gì?",
    "options": [
      "Báo hiệu đường cấm",
      "Cảnh báo nguy hiểm cần chú ý phía trước",
      "Bắt buộc rẽ phải",
      "Khu vực đỗ xe miễn phí"
    ],
    "correct": 1,
    "explain": "Rất tốt! Hình tam giác nền vàng viền đỏ là biển báo nguy hiểm (như đường trơn, trẻ em qua đường, dốc đứng...).",
    "category": "Giao thông"
  },
  {
    "q": "Học sinh tiểu học có được phép tự đi xe máy điện hoặc xe máy trên 50cc đến trường không?",
    "options": [
      "Được đi thoải mái",
      "Tuyệt đối KHÔNG, vì chưa đủ tuổi luật định và chưa có kỹ năng phản xạ an toàn",
      "Chỉ cần bố mẹ cho phép là được",
      "Được đi nếu đi chậm"
    ],
    "correct": 1,
    "explain": "Chính xác! Học sinh dưới 16 tuổi chưa đủ tuổi điều khiển xe gắn máy, xe máy điện theo Luật Giao thông.",
    "category": "Giao thông"
  },
  {
    "q": "Hành vi đi xe đạp dàn hàng ba, hàng bốn trên đường có tác hại gì?",
    "options": [
      "Làm đẹp đội hình",
      "Gây cản trở giao thông cho xe khác và rất dễ va quẹt gây ngã tai nạn liên hoàn",
      "Giúp nói chuyện vui hơn",
      "Được ưu tiên nhường đường"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đi xe dàn hàng ngang rất nguy hiểm cho bản thân và người đi đường.",
    "category": "Giao thông"
  },
  {
    "q": "Khi đi xe đạp, hành động nào sau đây là NGUY HIỂM?",
    "options": [
      "Buông cả hai tay, hoặc dùng một tay cầm ô (dù), nghe điện thoại",
      "Dùng chuông báo hiệu khi xin đường",
      "Bóp phanh giảm tốc độ khi xuống dốc",
      "Đi đúng làn đường dành cho xe thô sơ"
    ],
    "correct": 0,
    "explain": "Rất chuẩn! Buông hai tay hoặc cầm ô khi đi xe đạp làm mất thăng bằng, chỉ cần va ổ gà là ngã xe ngay.",
    "category": "Giao thông"
  },
  {
    "q": "Tại nơi giao nhau giữa đường bộ và đường sắt không có rào chắn, khi nghe thấy còi tàu hỏa hú, em phải làm gì?",
    "options": [
      "Cố phóng xe thật nhanh băng qua trước tàu",
      "Dừng lại ngay ở khoảng cách an toàn (tối thiểu 5 mét cách ray ngoài cùng), quan sát chờ tàu qua hẳn",
      "Đứng sát mép đường ray vẫy tay",
      "Nhảy nhót trên đường ray"
    ],
    "correct": 1,
    "explain": "Chính xác! Tàu hỏa chạy quán tính rất lớn và không thể phanh gấp. Luôn dừng cách xa ray ít nhất 5m.",
    "category": "Giao thông"
  },
  {
    "q": "Khi xe ô tô buýt đang dừng đón trả khách ở điểm dừng, người đi bộ muốn qua đường nên làm gì?",
    "options": [
      "Chạy vụt qua ngay trước đầu xe buýt",
      "Chờ xe buýt đi khỏi hẳn để tầm nhìn thông thoáng rồi mới quan sát qua đường",
      "Chui qua gầm xe buýt",
      "Đi sát đuôi xe buýt rồi chạy vèo qua"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Thân xe buýt to lớn che khuất toàn bộ tầm nhìn của em và các tài xế xe khác đi phía sau.",
    "category": "Giao thông"
  },
  {
    "q": "'Điểm mù' của xe tải, xe công-ten-nơ là gì?",
    "options": [
      "Nơi tài xế ngủ trưa",
      "Những khu vực xung quanh xe mà tài xế KHÔNG THỂ nhìn thấy qua gương chiếu hậu",
      "Bánh xe dự phòng",
      "Kính chắn gió của xe"
    ],
    "correct": 1,
    "explain": "Chính xác! Điểm mù trước đầu xe cao, hai bên hông xe và phía sau đuôi xe tải cực kỳ nguy hiểm. Tránh xa ít nhất 3-5m!",
    "category": "Giao thông"
  },
  {
    "q": "Khi đi bộ trên đường vào trời tối hoặc ban đêm, em nên mặc trang phục như thế nào?",
    "options": [
      "Mặc quần áo toàn màu đen kịt",
      "Mặc quần áo sáng màu hoặc có gắn dải phản quang phát sáng",
      "Trùm chăn kín người",
      "Mặc áo tàng hình"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Trang phục sáng màu giúp tài xế từ xa phát hiện ra người đi bộ trong đêm để chủ động tránh.",
    "category": "Giao thông"
  },
  {
    "q": "Khi xe cứu thương hoặc xe cứu hỏa đang phát tín hiệu còi ưu tiên xin đường, người đi đường phải làm gì?",
    "options": [
      "Cố chạy đua chặn đầu xe ưu tiên",
      "Nhanh chóng giảm tốc độ, tấp sát vào lề đường bên phải để nhường đường",
      "Dừng xe giữa tim đường đứng nhìn",
      "Bấm còi to hơn xe cứu thương"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Nhường đường cho xe ưu tiên giúp cứu người bệnh và kịp thời dập tắt các đám cháy khẩn cấp.",
    "category": "Giao thông"
  },
  {
    "q": "Trẻ em có được phép đá bóng, đá cầu, chơi đuổi bắt dưới lòng đường không?",
    "options": [
      "Được, nếu đường vắng xe",
      "Tuyệt đối KHÔNG, vì xe cộ đi tới bất ngờ không kịp phanh, rất dễ xảy ra tai nạn chết người",
      "Chỉ chơi vào buổi trưa",
      "Chỉ đá bóng cao su"
    ],
    "correct": 1,
    "explain": "Chính xác! Lòng đường chỉ dành cho phương tiện lưu thông. Hãy chơi đá bóng trong sân trường hoặc công viên.",
    "category": "Giao thông"
  },
  {
    "q": "Khi bước lên hoặc xuống xe ô tô, cửa xe an toàn nhất để lên xuống là cửa nào?",
    "options": [
      "Cửa phía sát lề đường bên phải",
      "Cửa phía ngoài sát dòng xe cộ chạy vùn vụt",
      "Nhảy ra từ cốp sau",
      "Trèo qua cửa sổ"
    ],
    "correct": 0,
    "explain": "Rất tốt! Luôn mở cửa phía sát vỉa hè hoặc lề đường sau khi đã quan sát phía sau không có xe đi tới.",
    "category": "Giao thông"
  },
  {
    "q": "Khi đang đi xe đạp mà trời đổ mưa to gió lớn, em nên làm gì?",
    "options": [
      "Một tay cầm ô to, một tay lái xe thật nhanh",
      "Tìm nơi có mái hiên an toàn trên vỉa hè để trú mưa, không che ô khi đang đạp xe",
      "Cố phóng nhanh qua vũng nước ngập sâu",
      "Đi bám sát đuôi xe tải"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Cầm ô che mưa khi đi xe đạp làm gió quật ngã xe và che khuất hoàn toàn tầm nhìn.",
    "category": "Giao thông"
  },
  {
    "q": "Dải phân cách giữa đường có tác dụng gì?",
    "options": [
      "Để học sinh trèo lên tập giữ thăng bằng",
      "Phân chia hai chiều xe chạy riêng biệt, chống va chạm đối đầu",
      "Dùng để phơi lúa",
      "Để trang trí đường phố"
    ],
    "correct": 1,
    "explain": "Chính xác! Dải phân cách giúp tách luồng giao thông an toàn, tuyệt đối không trèo leo qua dải phân cách.",
    "category": "Giao thông"
  },
  {
    "q": "Đèn tín hiệu giao thông dành cho người đi bộ có mấy màu và ý nghĩa là gì?",
    "options": [
      "3 màu: Xanh, Đỏ, Vàng",
      "2 màu: Đỏ (đứng lại) và Xanh (được phép qua đường)",
      "1 màu nhấp nháy",
      "4 màu"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đèn người đi bộ có hình người: Người màu đỏ đứng yên là dừng lại, người màu xanh bước đi là được qua.",
    "category": "Giao thông"
  },
  {
    "q": "Hành động 'kéo, đẩy hoặc bám vào xe khác' khi đang đi xe đạp có bị cấm không?",
    "options": [
      "Không bị cấm",
      "BỊ CẤM HOÀN TOÀN vì cực kỳ nguy hiểm, dễ bị cuốn vào gầm xe khác khi họ phanh",
      "Làm thế đỡ mệt chân",
      "Được làm nếu đi chậm"
    ],
    "correct": 1,
    "explain": "Chính xác! Bám vào xe máy hoặc ô tô khi đi xe đạp là hành vi vi phạm pháp luật và gây tử vong cao.",
    "category": "Giao thông"
  },
  {
    "q": "Khi đi xe buýt, sau khi lên xe em cần làm gì ngay?",
    "options": [
      "Đứng chắn ngay ở cửa lên xuống",
      "Di chuyển vào trong xe, tìm chỗ ngồi ổn định hoặc bám chắc vào tay vịn",
      "Chạy nhảy nô đùa dọc lối đi",
      "Thò tay cạy cửa kính"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Xe buýt thường phanh gấp hoặc rẽ cua đột ngột, luôn bám tay vịn chắc chắn.",
    "category": "Giao thông"
  },
  {
    "q": "Trước khi mở cửa xe ô tô từ bên trong bước ra đường, thao tác bắt buộc là gì?",
    "options": [
      "Đẩy cửa thật mạnh bung ra ngay lập tức",
      "Quan sát kỹ gương chiếu hậu và ngoái đầu nhìn phía sau xem có xe máy nào đang chạy tới không",
      "Nhắm mắt mở cửa",
      "Đạp chân vào cửa"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Mở cửa xe bất cẩn (dooring) là nguyên nhân gây ra vô số tai nạn thương tâm cho người đi xe máy.",
    "category": "Giao thông"
  },
  {
    "q": "Biển báo hình tròn nền màu xanh lam có hình người đi bộ màu trắng có ý nghĩa gì?",
    "options": [
      "Đường cấm người đi bộ",
      "Đường dành riêng cho người đi bộ",
      "Khu vực có công trường",
      "Nơi bán quần áo"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đây là biển hiệu lệnh chỉ đường dành riêng cho người đi bộ, các loại xe khác không được vào.",
    "category": "Giao thông"
  },
  {
    "q": "Khi đi bộ theo nhóm cùng các bạn học sinh, quy tắc di chuyển an toàn là gì?",
    "options": [
      "Đi thành hàng một hoặc hàng hai gọn gàng trên vỉa hè",
      "Nắm tay nhau giăng ngang kín mặt đường",
      "Vừa đi vừa đùa giỡn xô đẩy bạn xuống lòng đường",
      "Đuổi bắt nhau qua lại hai bên đường"
    ],
    "correct": 0,
    "explain": "Chính xác! Đi thành hàng gọn gàng giúp nhường lối cho người khác và tránh bị trượt chân xuống lòng đường.",
    "category": "Giao thông"
  },
  {
    "q": "Phương tiện giao thông nào sau đây KHÔNG ĐƯỢC PHÉP đi lên đường cao tốc?",
    "options": [
      "Xe ô tô con",
      "Xe máy, xe mô tô có tốc độ thiết kế dưới 70km/h, xe đạp và người đi bộ",
      "Xe buýt",
      "Xe tải chở hàng"
    ],
    "correct": 1,
    "explain": "Rất đúng! Đường cao tốc chạy tốc độ rất cao (80-120km/h), nghiêm cấm người đi bộ, xe thô sơ, xe đạp.",
    "category": "Giao thông"
  },
  {
    "q": "Khi đi qua cầu sắt hẹp hoặc ngầm tràn có nước chảy, quy tắc an toàn là gì?",
    "options": [
      "Cố phóng xe máy qua thật nhanh",
      "Đi chậm cẩn thận, nếu nước dâng ngập chảy xiết thì TUYỆT ĐỐI không đi qua, phải quay lại",
      "Nhảy múa trên cầu",
      "Vứt xe đạp lại rồi bơi"
    ],
    "correct": 1,
    "explain": "Chính xác! Rất nhiều trường hợp bị nước lũ cuốn trôi cả người và xe khi cố tình vượt qua ngầm tràn.",
    "category": "Giao thông"
  },
  {
    "q": "Để đảm bảo an toàn, xe đạp của học sinh cần có các bộ phận nào hoạt động tốt?",
    "options": [
      "Chỉ cần có bàn đạp là được",
      "Hệ thống phanh (thắng) trước - sau, lốp xe đủ hơi, đèn phản quang và chuông xe",
      "Gắn thêm loa đài thật to",
      "Gắn còi hơi xe tải"
    ],
    "correct": 1,
    "explain": "Rất tốt! Phanh xe tốt giúp em làm chủ tốc độ và dừng lại kịp thời trước các tình huống bất ngờ.",
    "category": "Giao thông"
  },
  {
    "q": "Hành động 'ném đất đá lên đoàn tàu hỏa đang chạy' bị xử lý như thế nào?",
    "options": [
      "Không sao cả vì tàu bằng sắt",
      "Hành vi vi phạm pháp luật đặc biệt nguy hiểm, làm vỡ kính gây thương tích cho hành khách và tài xế",
      "Được khen ngợi",
      "Chỉ là trò chơi vui"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Tuyệt đối không ném đá lên tàu hỏa. Đã có nhiều hành khách bị thương tật vĩnh viễn do hành vi này.",
    "category": "Giao thông"
  },
  {
    "q": "Khi người lái xe máy chuẩn bị chuyển hướng rẽ trái hoặc rẽ phải, họ phải làm gì?",
    "options": [
      "Cứ rẽ bất ngờ không cần báo trước",
      "Bật đèn xi-nhan báo rẽ từ sớm, giảm tốc độ và quan sát an toàn hai bên",
      "Bấm còi inh ỏi rồi rẽ gắt",
      "Nhắm mắt quẹo xe"
    ],
    "correct": 1,
    "explain": "Chính xác! Đèn xi-nhan giúp các phương tiện đi sau chủ động nhường đường và giữ khoảng cách an toàn.",
    "category": "Giao thông"
  },
  {
    "q": "Khi ngồi trong ô tô, tại sao tất cả mọi người trên xe ĐỀU NÊN thắt dây an toàn?",
    "options": [
      "Để trang trí cho đẹp áo",
      "Để giữ cơ thể không bị văng đập vào kính chắn gió hoặc ghế phía trước khi xe phanh gấp hoặc va chạm",
      "Để không bị công an hỏi thăm",
      "Để ngủ cho ngon"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Dây an toàn giữ chặt bạn trên ghế, giảm tới 75% nguy cơ tử vong trong các vụ tai nạn ô tô.",
    "category": "Giao thông"
  },
  {
    "q": "Khi gặp chú Cảnh sát giao thông đứng điều khiển bằng gậy chỉ đường, ta tuân theo hiệu lệnh của ai?",
    "options": [
      "Tuân theo đèn tín hiệu giao thông",
      "Tuân theo hiệu lệnh của Cảnh sát giao thông (ưu tiên cao nhất)",
      "Tuân theo người đi bên cạnh",
      "Thích đi thế nào thì đi"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Hiệu lệnh của Cảnh sát giao thông có giá trị ưu tiên cao nhất, cao hơn cả đèn tín hiệu và biển báo.",
    "category": "Giao thông"
  },
  {
    "q": "Khẩu hiệu nào sau đây thể hiện văn hóa giao thông chuẩn mực nhất?",
    "options": [
      "Nhanh một giây, chậm cả đời - An toàn giao thông là hạnh phúc của mọi nhà",
      "Cứ vượt đèn đỏ khi không có công an",
      "Đường của ta, ta cứ đi",
      "Phóng nhanh phanh gấp mới ngầu"
    ],
    "correct": 0,
    "explain": "Chính xác! Luôn ghi nhớ: 'An toàn là bạn, tai nạn là thù. Đi đúng làn, dừng đúng vạch!'.",
    "category": "Giao thông"
  },
  {
    "q": "Số điện thoại khẩn cấp quốc gia nào sau đây dùng để gọi CẢNH SÁT PHÒNG CHÁY CHỮA CHÁY?",
    "options": [
      "113",
      "114",
      "115",
      "111"
    ],
    "correct": 1,
    "explain": "Chính xác! 114 là số gọi Cứu hỏa và Cứu nạn cứu hộ trên toàn quốc, hoàn toàn miễn phí cước gọi.",
    "category": "PCCC"
  },
  {
    "q": "Khi phát hiện có đám cháy nhỏ mới bùng phát trong nhà, việc đầu tiên em cần làm là gì?",
    "options": [
      "Chui vào gầm giường trốn",
      "Hô to báo động cho người lớn biết và chạy ra nơi an toàn",
      "Lấy điện thoại ra quay video",
      "Đóng chặt cửa phòng lại đi ngủ"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Hô to 'Cháy! Cháy!' để mọi người xung quanh kịp thời ứng phó và thoát hiểm.",
    "category": "PCCC"
  },
  {
    "q": "Khi di chuyển qua khu vực có nhiều khói độc của đám cháy, tư thế di chuyển đúng là gì?",
    "options": [
      "Đứng thẳng người chạy thật nhanh",
      "Cúi thật thấp người hoặc bò sát sàn nhà men theo chân tường",
      "Nhảy lò cò",
      "Vừa chạy vừa hít thở thật sâu"
    ],
    "correct": 1,
    "explain": "Chính xác! Khói và khí độc nhẹ hơn không khí nên bốc lên cao, sát sàn nhà là nơi có lượng không khí sạch nhất.",
    "category": "PCCC"
  },
  {
    "q": "Để bảo vệ đường hô hấp không bị hít phải khói độc khi thoát khỏi đám cháy, em nên dùng vật dụng gì?",
    "options": [
      "Khăn mặt hoặc mảnh vải thấm ướt nước bịt kín mũi và miệng",
      "Túi ni-lông trùm kín đầu",
      "Áo mưa bọc kín người",
      "Lấy hai tay che mắt"
    ],
    "correct": 0,
    "explain": "Rất chuẩn! Khăn ướt đóng vai trò như một bộ lọc khí, giúp làm mát và ngăn bớt hạt bụi tro than độc hại.",
    "category": "PCCC"
  },
  {
    "q": "Khi xảy ra cháy do chập điện, tại sao TUYỆT ĐỐI KHÔNG ĐƯỢC dùng nước để dập lửa?",
    "options": [
      "Vì nước làm lửa cháy to hơn",
      "Vì nước dẫn điện, người dội nước sẽ bị luồng điện truyền qua người gây giật tử vong",
      "Vì nước quá lạnh",
      "Vì nước làm bẩn sàn nhà"
    ],
    "correct": 1,
    "explain": "Chính xác! Nước dẫn điện cực tốt. Phải ngắt cầu dao tổng trước rồi dùng bình chữa cháy bột hoặc khí CO2.",
    "category": "PCCC"
  },
  {
    "q": "Nếu không may quần áo trên người em bị bắt lửa bén cháy, em phải làm gì NGAY LẬP TỨC?",
    "options": [
      "Hoảng loạn chạy thật nhanh vòng quanh",
      "Dừng lại - Nằm xuống - Lăn tròn qua lại trên sàn để dập tắt lửa (Stop, Drop & Roll)",
      "Dùng tay vỗ mạnh vào ngọn lửa",
      "Chạy vào phòng kín đóng cửa lại"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Càng chạy thì gió càng thổi ngọn lửa bùng to. Hãy nằm xuống và lăn qua lăn lại để ngạt khí dập lửa.",
    "category": "PCCC"
  },
  {
    "q": "Khi xảy ra hỏa hoạn ở tòa nhà chung cư hoặc trung tâm thương mại cao tầng, phương tiện thoát hiểm an toàn là gì?",
    "options": [
      "Thang máy chở khách",
      "Cầu thang bộ thoát hiểm có cửa chống cháy và đèn EXIT màu xanh",
      "Thang cuốn",
      "Trèo ra lan can nhảy xuống đất"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuyệt đối không dùng thang máy khi cháy vì nguồn điện có thể bị cắt bất ngờ, nhốt kín em trong buồng thang.",
    "category": "PCCC"
  },
  {
    "q": "Trước khi mở một cánh cửa phòng trong tòa nhà đang có đám cháy, em nên kiểm tra độ nóng bằng cách nào?",
    "options": [
      "Áp cả lòng bàn tay hoặc ôm chặt cánh cửa",
      "Dùng mu bàn tay chạm nhẹ vào tay nắm cửa và bề mặt cửa",
      "Đạp thật mạnh phá cửa",
      "Kê sát mặt vào cửa ngửi"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Dùng mu bàn tay giúp nếu cửa quá nóng, phản xạ tự nhiên sẽ rụt tay lại mà không bị bỏng dính lòng bàn tay.",
    "category": "PCCC"
  },
  {
    "q": "Nếu tay nắm cửa phòng nóng ran và có khói luồn qua khe cửa, em có nên mở cửa không?",
    "options": [
      "Mở cửa thật to chạy ra",
      "Tuyệt đối KHÔNG mở cửa, vì phía ngoài lửa đang cháy rất dữ dội",
      "Mở hé ra xem thế nào",
      "Mở cửa rồi đóng lại ngay"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Không mở cửa vì ngọn lửa và khói độc sẽ ùa thẳng vào phòng ngay lập tức.",
    "category": "PCCC"
  },
  {
    "q": "Khi bị mắc kẹt trong phòng không thể thoát ra ngoài do hành lang ngập khói lửa, em cần làm gì?",
    "options": [
      "Đóng chặt cửa, lấy chăn/khăn nhúng ướt chèn kín các khe cửa, di chuyển ra ban công/cửa sổ kêu cứu",
      "Chui vào tủ quần áo trốn",
      "Nhảy từ tầng cao xuống đất",
      "Cởi hết quần áo"
    ],
    "correct": 0,
    "explain": "Chính xác! Chèn kín khe cửa ngăn khói độc xâm nhập, ra ban công dùng khăn áo sáng màu vẫy ra hiệu cứu nạn.",
    "category": "PCCC"
  },
  {
    "q": "Khi bước vào nhà mà ngửi thấy mùi khí gas nồng nặc trong bếp, hành động nào sau đây là CỰC KỲ NGUY HIỂM?",
    "options": [
      "Bật công tắc đèn, bật quạt điện hoặc quẹt diêm kiểm tra",
      "Mở toang tất cả các cửa sổ cho thông thoáng khí",
      "Khóa van bình gas lại",
      "Báo người lớn đưa mọi người ra ngoài"
    ],
    "correct": 0,
    "explain": "Đúng vậy! Bật công tắc điện hoặc quẹt lửa sẽ tạo ra tia lửa điện kích nổ toàn bộ lượng khí gas tích tụ trong nhà.",
    "category": "PCCC"
  },
  {
    "q": "Trẻ em có được tự ý nghịch que diêm, bật lửa, đốt rơm rạ hoặc đốt giấy trong nhà không?",
    "options": [
      "Được chơi nếu có bạn",
      "Tuyệt đối KHÔNG, vì lửa bắt rất nhanh và chỉ một tàn lửa nhỏ cũng có thể thiêu rụi cả ngôi nhà",
      "Chỉ đốt vào ban ngày",
      "Đốt xong giấu tàn lửa đi"
    ],
    "correct": 1,
    "explain": "Chính xác! Rất nhiều vụ cháy nhà thương tâm xuất phát từ việc trẻ em nghịch que diêm, bật lửa không kiểm soát.",
    "category": "PCCC"
  },
  {
    "q": "Khi chảo dầu ăn trên bếp ga bị bốc cháy ngọn lửa bùng lên, cách xử lý an toàn nhất là gì?",
    "options": [
      "Hắt ngay một bát nước lạnh vào chảo dầu",
      "Tắt bếp ngay, dùng nắp vung kim loại đậy chặt miệng chảo lại",
      "Bê chảo dầu đang cháy chạy ra ngoài",
      "Thổi phù phù vào chảo"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Hắt nước vào dầu sôi sẽ làm dầu bắn tung tóe thành quả cầu lửa thiêu rụi bếp. Hãy đậy vung dập lửa!",
    "category": "PCCC"
  },
  {
    "q": "Khi gọi điện báo cháy tới số 114, thông tin quan trọng nhất em cần cung cấp là gì?",
    "options": [
      "Họ tên và ngày sinh của em",
      "Địa chỉ chính xác nơi đang xảy ra cháy, cháy cái gì và có ai bị mắc kẹt không",
      "Hỏi xem chú lính cứu hỏa đang làm gì",
      "Kể chuyện trường lớp"
    ],
    "correct": 1,
    "explain": "Chính xác! Địa chỉ rõ ràng giúp xe cứu hỏa di chuyển nhanh nhất tới hiện trường cứu người kịp thời.",
    "category": "PCCC"
  },
  {
    "q": "Biển báo thoát hiểm 'EXIT' trong các tòa nhà thường có chữ màu gì và nền màu gì?",
    "options": [
      "Chữ đỏ nền vàng",
      "Chữ trắng nền màu xanh lá cây phát sáng",
      "Chữ đen nền đen",
      "Chữ tím nền hồng"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đèn EXIT màu xanh lá cây có pin dự phòng, vẫn sáng rõ ngay cả khi tòa nhà bị mất điện toàn bộ.",
    "category": "PCCC"
  },
  {
    "q": "Bình chữa cháy xách tay có ký hiệu CO2 thường dùng để dập tắt đám cháy nào hiệu quả nhất?",
    "options": [
      "Đám cháy thiết bị điện tử, máy tính, phòng kín",
      "Đám cháy ngoài trời gió bão",
      "Dập lửa đốt rác bờ ruộng",
      "Dùng để uống giải khát"
    ],
    "correct": 0,
    "explain": "Rất tốt! Khí CO2 làm loãng oxy dập lửa nhanh và không để lại cặn bột làm hỏng vi mạch điện tử.",
    "category": "PCCC"
  },
  {
    "q": "Khi đốt nến sinh nhật hoặc thắp hương trong nhà, nguyên tắc an toàn PCCC là gì?",
    "options": [
      "Để nến cháy suốt đêm rồi đi ngủ",
      "Để nến trên đế phẳng chống cháy, cách xa rèm cửa, giấy vở và thổi tắt trước khi rời đi",
      "Đặt nến cạnh bình gas",
      "Cắm nến lên đệm mút"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuyệt đối không để nguồn lửa trần gần các vật liệu dễ bắt cháy như rèm cửa, sách vở, nệm mút.",
    "category": "PCCC"
  },
  {
    "q": "Tại sao khi thoát nạn khỏi đám cháy, em không nên mang theo ba lô nặng hay đồ chơi cồng kềnh?",
    "options": [
      "Vì sợ đồ chơi bị hỏng",
      "Vì tính mạng là quan trọng nhất, đồ vật nặng làm em di chuyển chậm chạp và dễ bị kẹt lại",
      "Để nhường đồ cho người khác",
      "Vì đồ chơi không cháy được"
    ],
    "correct": 1,
    "explain": "Rất đúng! Hãy thoát thân càng nhanh càng tốt, không chần chừ tiếc của cải đồ đạc.",
    "category": "PCCC"
  },
  {
    "q": "Cầu thang thoát hiểm của chung cư có cánh cửa chống cháy. Bình thường cửa này phải ở trạng thái nào?",
    "options": [
      "Luôn mở toang chèn gạch lại",
      "Luôn đóng kín để ngăn khói, nhưng không khóa chốt để người dễ dàng đẩy ra thoát hiểm",
      "Khóa chặt bằng ổ khóa xích",
      "Tháo rời cánh cửa cất đi"
    ],
    "correct": 1,
    "explain": "Chính xác! Cửa chống cháy ngăn khói xâm nhập vào buồng thang, giúp lối thoát hiểm luôn an toàn không có khói độc.",
    "category": "PCCC"
  },
  {
    "q": "Khi sạc xe đạp điện, xe máy điện trong gia đình, thời điểm nào KHÔNG NÊN sạc để phòng cháy?",
    "options": [
      "Sạc ban ngày khi có người ở nhà",
      "Cắm sạc qua đêm khi cả nhà đã ngủ say hoặc sạc gần lối thoát hiểm duy nhất",
      "Sạc ở nơi thông thoáng gió",
      "Sạc bằng sạc chính hãng"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Pin lithium khi chập cháy phát nổ rất nhanh và sinh ra lượng khói cực độc. Không nên sạc qua đêm không người trông coi.",
    "category": "PCCC"
  },
  {
    "q": "Khi nghe thấy chuông báo cháy của trường học vang lên liên tục, em cần làm gì?",
    "options": [
      "Ngồi im tại chỗ cười đùa",
      "Nghe theo hướng dẫn của thầy cô giáo, xếp hàng di chuyển nhanh chóng, trật tự ra sân trường",
      "Tranh giành xô đẩy các bạn chạy qua cửa",
      "Nhảy qua cửa sổ tầng 3"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Bình tĩnh nghe theo hiệu lệnh của thầy cô giáo và di chuyển theo hàng lối không xô đẩy dẫm đạp.",
    "category": "PCCC"
  },
  {
    "q": "Vật dụng nào sau đây KHÔNG THỂ dùng để dập đám cháy nhỏ mới bắt lửa?",
    "options": [
      "Bình chữa cháy xách tay",
      "Chăn chiên nhúng đẫm nước",
      "Một can dầu hỏa hoặc chai cồn 90 độ",
      "Cát khô"
    ],
    "correct": 2,
    "explain": "Chính xác! Dầu hỏa và cồn là chất lỏng cực kỳ dễ cháy, đổ vào sẽ làm ngọn lửa bùng phát dữ dội.",
    "category": "PCCC"
  },
  {
    "q": "Khi bị mắc kẹt ở tầng 2 mà lửa chặn lối cầu thang xuống, có nên liều lĩnh nhảy cắm đầu xuống đất không?",
    "options": [
      "Cứ nhảy cắm đầu xuống cho nhanh",
      "Tuyệt đối không; nên thả chăn nệm xuống dưới làm đệm đỡ, tụt người bằng hai tay bám mép ban công để giảm độ cao",
      "Nhảy nhào lộn",
      "Ở yên chờ lửa đến"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Thả nệm xuống dưới và bám hai tay vào mép tường thả lỏng chân giúp giảm hơn một nửa chiều cao rơi.",
    "category": "PCCC"
  },
  {
    "q": "Hút thuốc lá rồi vứt tàn thuốc chưa dập tắt vào thùng rác có gây nguy hiểm không?",
    "options": [
      "Không sao cả",
      "Cực kỳ NGUY HIỂM vì tàn thuốc âm ỉ sẽ bén vào giấy rác gây cháy lan toàn bộ ngôi nhà",
      "Tàn thuốc sẽ tự biến mất",
      "Làm thùng rác ấm hơn"
    ],
    "correct": 1,
    "explain": "Chính xác! Tàn thuốc lá là một trong những nguyên nhân phổ biến nhất gây ra các vụ cháy lớn.",
    "category": "PCCC"
  },
  {
    "q": "Khi đi cắm trại trong rừng, hành động nào sau đây là vi phạm quy định bảo vệ rừng và PCCC?",
    "options": [
      "Tự ý đốt lửa trại bừa bãi và không dập tắt hoàn toàn tro than trước khi rời đi",
      "Nhặt rác bỏ vào túi đem về",
      "Uống nước lọc",
      "Chụp ảnh cây cối"
    ],
    "correct": 0,
    "explain": "Đúng rồi! Chỉ một cơn gió thổi tàn than hồng chưa dập tắt có thể gây cháy bùng cả cánh rừng rộng lớn.",
    "category": "PCCC"
  },
  {
    "q": "Khói của đám cháy nguy hiểm hơn ngọn lửa như thế nào?",
    "options": [
      "Khói có mùi thơm",
      "Khói chứa khí độc CO và CO2, làm nạn nhân bị ngạt thở, hôn mê và tử vong chỉ sau vài hơi thở",
      "Khói làm mát đám cháy",
      "Khói không có tác hại gì"
    ],
    "correct": 1,
    "explain": "Chính xác! Đa số các nạn nhân trong các vụ hỏa hoạn tử vong là do ngạt khói độc trước khi lửa lan tới.",
    "category": "PCCC"
  },
  {
    "q": "Khi cắm nhiều thiết bị điện công suất lớn (nồi lẩu, bàn là, bếp điện) vào cùng một ổ cắm điện lỏng lẻo, điều gì sẽ xảy ra?",
    "options": [
      "Tiết kiệm được tiền điện",
      "Quá tải đường dây, làm chảy nhựa dây điện dẫn đến chập cháy hỏa hoạn",
      "Thiết bị chạy khỏe hơn",
      "Ổ cắm mát hơn"
    ],
    "correct": 1,
    "explain": "Rất đúng! Quá tải điện sinh nhiệt cực lớn làm chảy dây đồng và bùng phát tia lửa điện gây cháy.",
    "category": "PCCC"
  },
  {
    "q": "Trẻ em có được tự ý mua và đốt các loại pháo nổ, pháo hoa tự chế không?",
    "options": [
      "Được đốt vào dịp Tết",
      "NGHIÊM CẤM HOÀN TOÀN vì pháo nổ gây nát bàn tay, mù mắt và cháy nhà",
      "Đốt pháo tự chế rất an toàn",
      "Ai cũng được quyền tự chế pháo"
    ],
    "correct": 1,
    "explain": "Chính xác! Pháp luật nghiêm cấm tự chế và đốt pháo nổ. Rất nhiều bạn nhỏ đã bị cụt tay, hỏng mắt vì nghịch pháo.",
    "category": "PCCC"
  },
  {
    "q": "Để báo động cháy cho hàng xóm khi không có chuông báo cháy, em có thể làm gì?",
    "options": [
      "Gõ mạnh vào chảo kim loại, nắp nồi hoặc hô thật to 'Cháy! Cứu với!'",
      "Nhắn tin qua mạng xã hội chờ trả lời",
      "Ngồi đợi bố mẹ về",
      "Chạy đi xem tivi"
    ],
    "correct": 0,
    "explain": "Rất tốt! Tiếng kim loại gõ vang xa và tiếng hô hoán sẽ đánh thức mọi người xung quanh đến ứng cứu ngay.",
    "category": "PCCC"
  },
  {
    "q": "Thiết bị báo cháy tự động gắn trên trần nhà có tác dụng gì?",
    "options": [
      "Để quay camera giám sát",
      "Tự động phát hiện khói hoặc nhiệt độ tăng cao bất thường để hú còi cảnh báo cháy sớm",
      "Để làm sáng căn phòng",
      "Để phát nhạc thiếu nhi"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đầu báo khói thông minh giúp phát hiện đám cháy ngay từ khi khói mới bắt đầu hình thành.",
    "category": "PCCC"
  },
  {
    "q": "Tại các trường học, cầu thang và hành lang thoát hiểm có được để bàn ghế rác chắn lối đi không?",
    "options": [
      "Được để thoải mái cho gọn lớp",
      "TUYỆT ĐỐI KHÔNG, lối thoát nạn luôn luôn phải thông thoáng để mọi người chạy thoát nhanh khi có sự cố",
      "Để tạm vài ngày không sao",
      "Chỉ để một nửa đường"
    ],
    "correct": 1,
    "explain": "Chính xác! Lối thoát hiểm phải luôn thông thoáng 100%, không có bất kỳ chướng ngại vật nào cản trở.",
    "category": "PCCC"
  },
  {
    "q": "Trong đám cháy, tại sao không nên dùng khăn khô bịt mũi mà phải dùng khăn ẩm ướt?",
    "options": [
      "Vì khăn khô không đẹp",
      "Vì khăn ẩm ướt làm mát luồng khí nóng và bẫy các hạt bụi khói độc hiệu quả hơn nhiều",
      "Vì khăn ẩm đắt tiền hơn",
      "Khăn khô hay ướt đều giống hệt nhau"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Nước trong khăn làm mát không khí bảo vệ niêm mạc phổi không bị bỏng đường thở.",
    "category": "PCCC"
  },
  {
    "q": "Khi chạy thoát ra khỏi ngôi nhà đang cháy an toàn rồi, em có được tự ý quay trở lại để tìm thú cưng hoặc đồ chơi không?",
    "options": [
      "Được, phải chạy vào lấy đồ chơi yêu thích ngay",
      "TUYỆT ĐỐI KHÔNG quay lại, hãy thông báo cho lực lượng cứu hỏa chuyên nghiệp",
      "Rủ thêm bạn cùng vào tìm",
      "Lẻn vào lúc không ai để ý"
    ],
    "correct": 1,
    "explain": "Chính xác! Rất nhiều người đã tử vong khi cố quay trở lại đám cháy đã bùng to. Đã thoát ra là KHÔNG quay lại!",
    "category": "PCCC"
  },
  {
    "q": "Khi sử dụng bàn là (bàn ủi) quần áo xong, việc cần làm ngay để chống cháy là gì?",
    "options": [
      "Đặt úp mặt bàn là nóng xuống nệm vải",
      "Rút phích cắm điện, dựng đứng bàn là trên đế cách nhiệt và để nguội hoàn toàn",
      "Quấn dây điện quanh bàn là còn nóng",
      "Bỏ bàn là vào tủ quần áo đóng lại"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Bàn là nóng để quên trên quần áo có thể gây cháy nhà chỉ trong vài phút.",
    "category": "PCCC"
  },
  {
    "q": "Lực lượng Cảnh sát PCCC và CNCH làm nhiệm vụ gì?",
    "options": [
      "Chỉ đi chữa cháy nhà",
      "Chữa cháy, cứu người bị nạn trong hỏa hoạn, tai nạn giao thông, sập đổ công trình, đuối nước",
      "Đi bán bình cứu hỏa",
      "Đi thu tiền nước"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Các chiến sĩ cứu hỏa là những người anh hùng dũng cảm bảo vệ an toàn tính mạng cho nhân dân.",
    "category": "PCCC"
  },
  {
    "q": "Khi bị bỏng nước sôi hoặc chạm vào đồ vật nóng, bước sơ cứu ĐẦU TIÊN và QUAN TRỌNG NHẤT là gì?",
    "options": [
      "Bôi ngay nước mắm, kem đánh răng hoặc mỡ trăn lên vết bỏng",
      "Xả ngay vết bỏng dưới vòi nước sạch mát liên tục từ 15 đến 20 phút",
      "Lấy đá lạnh chườm trực tiếp đè lên vết bỏng",
      "Chọc vỡ các bọng nước phồng rộp"
    ],
    "correct": 1,
    "explain": "Chính xác! Ngâm hoặc xả nước mát giúp hạ nhiệt độ sâu dưới da, giảm đau rát và hạn chế tổn thương hoại tử.",
    "category": "Thương tích"
  },
  {
    "q": "Tại sao TUYỆT ĐỐI KHÔNG ĐƯỢC bôi kem đánh răng, nước mắm, củ chuối vào vết bỏng?",
    "options": [
      "Vì tốn tiền",
      "Vì gây nhiễm trùng vết thương nặng nề, làm tổn thương da sâu hơn và để lại sẹo xấu",
      "Vì làm da thơm quá",
      "Vì kem đánh răng làm lạnh da"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Bôi các chất lạ làm tăng nguy cơ nhiễm trùng máu nguy hiểm tính mạng.",
    "category": "Thương tích"
  },
  {
    "q": "Khi một bạn nhỏ bị hóc dị vật (kẹo cứng, thạch, hạt nhãn) khó thở tím tái, em TUYỆT ĐỐI KHÔNG ĐƯỢC làm gì?",
    "options": [
      "Hô hoán gọi người lớn tới cứu",
      "Dùng ngón tay móc sâu bừa bãi vào cổ họng bạn",
      "Làm thủ thuật vỗ lưng ấn ngực",
      "Gọi xe cấp cứu 115"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Dùng ngón tay móc họng mù quáng có thể đẩy dị vật vào sâu khí quản hơn làm tắc thở hoàn toàn.",
    "category": "Thương tích"
  },
  {
    "q": "Khi bị chảy máu cam (chảy máu mũi), tư thế ngồi sơ cứu đúng cách là gì?",
    "options": [
      "Ngửa cổ ra sau thật cao và giơ hai tay lên trời",
      "Ngồi thẳng, đầu hơi cúi nhẹ về phía trước, dùng hai ngón tay bóp chặt cánh mũi trong 10 phút",
      "Nằm ngửa ra sàn nhà",
      "Nhét giấy báo bẩn vào mũi"
    ],
    "correct": 1,
    "explain": "Chính xác! Ngửa cổ ra sau làm máu chảy ngược vào họng gây sặc, buồn nôn rất nguy hiểm. Hãy hơi cúi đầu!",
    "category": "Thương tích"
  },
  {
    "q": "Khi gặp một con chó lạ gầm gừ có vẻ hung dữ trên đường, em nên ứng xử thế nào?",
    "options": [
      "Hét thật to và quay lưng bỏ chạy thục mạng",
      "Đứng yên bất động như khúc cây, mắt nhìn thẳng (không nhìn chằm chằm vào mắt chó), từ từ lùi ra xa",
      "Cầm gậy đuổi đánh con chó",
      "Cúi xuống ném đá vào mặt chó"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Bỏ chạy kích thích bản năng săn mồi đuổi cắn của chó. Hãy đứng yên bình tĩnh, chó sẽ mất hứng và bỏ đi.",
    "category": "Thương tích"
  },
  {
    "q": "Nếu không may bị chó hoặc mèo cắn/cào rách da chảy máu, bước sơ cứu bắt buộc là gì?",
    "options": [
      "Rửa sạch vết thương dưới vòi nước chảy với xà phòng trong 15 phút, sát khuẩn và đi tiêm phòng dại ngay",
      "Bắt con chó đập chết ngay",
      "Đắp lá thuốc nam lên vết cắn",
      "Bỏ qua không cần làm gì"
    ],
    "correct": 0,
    "explain": "Chính xác! Bệnh dại nguy hiểm tử vong 100% nếu phát bệnh. Phải rửa xà phòng và đi tiêm vắc-xin dại kịp thời!",
    "category": "Thương tích"
  },
  {
    "q": "Khi bị ong đốt (ong vò vẽ, ong mật), cách xử lý ngòi ong an toàn là gì?",
    "options": [
      "Dùng hai đầu ngón tay bóp nặn thật mạnh vào nốt đốt",
      "Dùng cạnh móng tay sạch hoặc thẻ nhựa cứng gạt nhẹ ngòi ong ra, rồi chườm mát",
      "Bôi phân trâu lên nốt đốt",
      "Lấy kim khâu chọc sâu vào vết đốt"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Bóp nặn bằng tay sẽ vô tình ép thêm túi nọc độc ong phóng sâu vào cơ thể.",
    "category": "Thương tích"
  },
  {
    "q": "Khi bị bụi hoặc hạt cát bay vào mắt gây xốn rát, em nên làm gì?",
    "options": [
      "Lấy tay dụi mắt thật mạnh liên tục",
      "Chớp mắt nhẹ nhàng trong cốc nước sạch hoặc nhỏ nước muối sinh lý 0.9%",
      "Nhờ bạn lấy lưỡi liếm mắt",
      "Thổi bụi bằng miệng"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Dụi tay vào mắt sẽ chà xát hạt cát làm rách, xước giác mạc dẫn đến mù lòa.",
    "category": "Thương tích"
  },
  {
    "q": "Khi cầm chiếc kéo hoặc con dao đưa cho bạn mượn, cách đưa an toàn là gì?",
    "options": [
      "Cầm vào cán kéo và chĩa mũi nhọn thẳng về phía bạn",
      "Cầm vào phần lưỡi kéo (đã xếp gọn), đưa phần cán cầm hướng về phía bạn",
      "Ném chiếc kéo qua bàn cho bạn",
      "Vung vẩy kéo trên không trung"
    ],
    "correct": 1,
    "explain": "Chính xác! Luôn cầm vào phần lưỡi dao/kéo và hướng phần cán cho người nhận để không gây thương tích.",
    "category": "Thương tích"
  },
  {
    "q": "Khi chẳng may bị giẫm phải đinh gỉ sét ngoài vườn, ngoài rửa vết thương em cần làm gì?",
    "options": [
      "Bó lá cây lên chân rồi đi chơi tiếp",
      "Đến trạm y tế hoặc bệnh viện để tiêm phòng uốn ván (SAT)",
      "Lấy bật lửa đốt vết thương",
      "Ngâm chân vào bùn"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Nha bào vi khuẩn uốn ván thường ẩn nấp trong đinh gỉ sét, gây co giật cơ và tử vong nếu không tiêm ngừa.",
    "category": "Thương tích"
  },
  {
    "q": "Khi một bạn bị ngã gãy xương cẳng tay biến dạng, việc sơ cứu ĐÚNG là gì?",
    "options": [
      "Cố gắng nắn bóp, bẻ xương cho thẳng lại",
      "Cố định bất động cánh tay bằng nẹp và băng gạc, giữ nguyên tư thế rồi đưa đi viện",
      "Bắt bạn gập duỗi tay liên tục",
      "Kéo giật thật mạnh ngón tay bạn"
    ],
    "correct": 1,
    "explain": "Rất đúng! Tuyệt đối không tự ý nắn chỉnh xương gãy vì các đầu xương gãy sắc nhọn sẽ đâm rách mạch máu và dây thần kinh.",
    "category": "Thương tích"
  },
  {
    "q": "Khi thấy em bé nhỏ nuốt nhầm hóa chất độc hại (dầu hỏa, nước tẩy bồn cầu), ta có nên tự móc họng gây nôn không?",
    "options": [
      "Cứ móc họng thật sâu cho nôn hết ra",
      "TUYỆT ĐỐI KHÔNG gây nôn, đưa ngay đi viện kèm theo chai hóa chất đã uống nhầm",
      "Cho uống thêm dầu ăn",
      "Ép bụng thật mạnh"
    ],
    "correct": 1,
    "explain": "Chính xác! Hóa chất ăn mòn khi nôn ngược ra sẽ phá hủy thực quản và dễ tràn vào phổi gây suy hô hấp cấp.",
    "category": "Thương tích"
  },
  {
    "q": "Học sinh có được tự ý uống các loại thuốc lạ màu sắc sặc sỡ giống kẹo để trong nhà không?",
    "options": [
      "Thấy ngọt là cứ ăn thoải mái",
      "Tuyệt đối KHÔNG, chỉ uống thuốc khi có chỉ định của bác sĩ và người lớn cho uống",
      "Uống thử một nửa viên",
      "Chia cho các bạn cùng uống"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Rất nhiều loại thuốc người lớn độc hại có hình dạng giống kẹo ngọt, uống nhầm gây ngộ độc tử vong.",
    "category": "Thương tích"
  },
  {
    "q": "Vết thương hở chảy nhiều máu ở cẳng tay cần được cầm máu ban đầu bằng cách nào?",
    "options": [
      "Rắc thuốc lào hoặc bột cà phê lên vết thương",
      "Dùng miếng gạc hoặc vải sạch ép trực tiếp đè chặt lên vết thương, nâng cao tay hơn ngực",
      "Bỏ mặc cho máu chảy tự cầm",
      "Rửa vết thương bằng nước ngọt có ga"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Băng ép trực tiếp là phương pháp cầm máu an toàn và hiệu quả nhất.",
    "category": "Thương tích"
  },
  {
    "q": "Khi bạn bị bất tỉnh ngất xỉu nhưng vẫn còn thở đều đặn, tư thế nằm an toàn nhất là gì?",
    "options": [
      "Đặt bạn nằm nghiêng an toàn (tư thế hồi sức)",
      "Đặt bạn ngồi gục đầu xuống gối",
      "Bế bạn xốc ngược lên",
      "Cho bạn uống nước thật nhanh"
    ],
    "correct": 0,
    "explain": "Chính xác! Tư thế nằm nghiêng giúp đường thở thông thoáng và nếu bạn nôn ói thì chất nôn không chảy ngược vào phổi.",
    "category": "Thương tích"
  },
  {
    "q": "Trò chơi trượt cầu thang trên tay vịn lan can trường học có nguy cơ gì?",
    "options": [
      "Rất an toàn và vui nhộn",
      "Cực kỳ nguy hiểm, dễ mất thăng bằng ngã lộn cổ từ tầng cao xuống đất gây chấn thương sọ não",
      "Rèn luyện thể lực",
      "Giúp đi xuống tầng nhanh hơn"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Rất nhiều tai nạn gãy cổ, chấn thương sọ não bắt nguồn từ trò trượt tay vịn cầu thang.",
    "category": "Thương tích"
  },
  {
    "q": "Khi ăn quả có hạt (nhãn, vải, chôm chôm, mận), cách ăn an toàn cho trẻ em là gì?",
    "options": [
      "Nuốt chửng cả quả to",
      "Tách bỏ hạt trước khi ăn hoặc cẩn thận cắn thịt quả nhả hạt ra, không vừa ăn vừa cười đùa nhảy nhót",
      "Ngậm hạt trong miệng thi bắn hạt",
      "Vừa chạy vừa nhai kẹo dẻo"
    ],
    "correct": 1,
    "explain": "Rất tốt! Cười đùa khi ngậm hạt tròn trơn rất dễ khiến hạt trượt thẳng vào thanh quản gây nghẹt thở.",
    "category": "Thương tích"
  },
  {
    "q": "Khi bị đứt tay chảy máu nhẹ, các bước xử lý đúng thứ tự là gì?",
    "options": [
      "Rửa sạch dưới vòi nước sạch -> sát trùng bằng cồn đỏ povidine -> băng vết thương bằng urgo sạch",
      "Bôi bùn đất -> băng lại",
      "Bịt chặt bằng giấy bẩn",
      "Rắc tro bếp lên"
    ],
    "correct": 0,
    "explain": "Chính xác! Vệ sinh sạch sẽ và dán băng cá nhân vô trùng giúp vết thương nhanh lành và không nhiễm trùng.",
    "category": "Thương tích"
  },
  {
    "q": "Khi bị côn trùng (kiến ba khoang, sâu róm) bám vào da, em nên làm gì?",
    "options": [
      "Lấy tay miết nát con kiến lên da",
      "Thổi nhẹ hoặc dùng tờ giấy gạt nhẹ côn trùng ra, rửa sạch vùng da bằng nước xà phòng",
      "Dùng răng cắn con sâu",
      "Lấy cồn xịt vào mắt"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Đập nát kiến ba khoang giải phóng độc tố pederin cực mạnh gây bỏng rộp da loét sâu.",
    "category": "Thương tích"
  },
  {
    "q": "Khi nhìn thấy mảnh thủy tinh vỡ trên sàn nhà, em nên làm gì?",
    "options": [
      "Dùng tay không bốc từng mảnh vụn",
      "Báo người lớn dùng chổi quét dọn sạch sẽ và cảnh báo các bạn không đi chân đất lại gần",
      "Lấy chân đá mảnh vỡ vào góc",
      "Nhặt mảnh thủy tinh ném nhau"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Thủy tinh vỡ rất sắc nhọn có thể cứa đứt mạch máu chân tay nếu giẫm phải.",
    "category": "Thương tích"
  },
  {
    "q": "Dấu hiệu nào sau đây cho thấy một người đang bị sốc phản vệ nguy hiểm sau khi ăn đồ ăn lạ hoặc bị ong đốt?",
    "options": [
      "Chỉ hơi ngứa nhẹ đầu ngón tay",
      "Nổi mề đay toàn thân, khó thở, thở rít, sưng phù môi mắt và huyết áp tụt",
      "Ăn thấy ngon miệng hơn",
      "Buồn ngủ bình thường"
    ],
    "correct": 1,
    "explain": "Chính xác! Sốc phản vệ là cấp cứu y tế tối khẩn cấp, cần tiêm thuốc adrenaline tại bệnh viện ngay lập tức.",
    "category": "Thương tích"
  },
  {
    "q": "Khi chơi thể thao bị trật khớp hoặc bong gân cổ chân, nguyên tắc sơ cứu R.I.C.E bao gồm những gì?",
    "options": [
      "Bắt chạy tiếp thật nhiều",
      "Nghỉ ngơi (Rest) - Chườm lạnh (Ice) - Băng ép (Compression) - Kê cao chi (Elevation)",
      "Xoa dầu nóng bóp thật mạnh",
      "Ngâm chân vào nước sôi"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Chườm lạnh và kê cao chân giúp giảm đau, chống sưng phù nề hiệu quả.",
    "category": "Thương tích"
  },
  {
    "q": "Tại sao TUYỆT ĐỐI KHÔNG ĐƯỢC xoa dầu nóng hoặc cao dán vào vết bong gân mới bị?",
    "options": [
      "Vì dầu nóng thơm quá",
      "Vì dầu nóng làm giãn mạch máu, gây xuất huyết và sưng nề bầm tím nặng nề hơn",
      "Vì dầu nóng rẻ tiền",
      "Xoa dầu nóng rất tốt"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Trong 48 giờ đầu chỉ được chườm lạnh, không được dùng dầu nóng hay rượu thuốc bóp.",
    "category": "Thương tích"
  },
  {
    "q": "Khi thấy bạn bị sốt co giật ở lớp học, việc làm ĐÚNG là gì?",
    "options": [
      "Nhét ngón tay hoặc chìa khóa vào mồm bạn",
      "Đặt bạn nằm nghiêng nơi thông thoáng, nới lỏng cổ áo, không nhét bất cứ thứ gì vào miệng bạn và gọi y tế",
      "Tụ tập đông người vỗ mặt bạn",
      "Đè chặt tay chân bạn"
    ],
    "correct": 1,
    "explain": "Chính xác! Nhét dị vật vào mồm người đang co giật có thể làm gãy răng rơi vào đường thở gây tử vong.",
    "category": "Thương tích"
  },
  {
    "q": "Đồ ăn ôi thiu, nấm mốc hoặc quá hạn sử dụng nếu ăn phải sẽ gây ra tai nạn gì?",
    "options": [
      "Giúp tăng sức đề kháng",
      "Ngộ độc thực phẩm cấp tính gây đau bụng dữ dội, nôn mửa, tiêu chảy và mất nước",
      "Làm người khỏe hơn",
      "Không có ảnh hưởng gì"
    ],
    "correct": 1,
    "explain": "Rất đúng! Luôn kiểm tra hạn sử dụng và không ăn thức ăn có mùi lạ, chua thiu, ôi mốc.",
    "category": "Thương tích"
  },
  {
    "q": "Khi bị đinh hoặc dằm gỗ đâm sâu vào thịt, nếu không lấy ra được em nên làm gì?",
    "options": [
      "Tự dùng kim khâu không sát trùng khoét thịt",
      "Nhờ bố mẹ hoặc nhân viên y tế dùng dụng cụ vô trùng gắp ra và sát khuẩn",
      "Để mặc kệ nó tự tiêu",
      "Dán băng dính che lại"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Tự khoét bằng kim bẩn dễ gây nhiễm trùng uốn ván hoặc áp-xe có mủ.",
    "category": "Thương tích"
  },
  {
    "q": "Học sinh có được tự ý leo trèo lên lan can ban công tầng cao để với đồ vật rơi không?",
    "options": [
      "Được, chỉ cần cẩn thận",
      "CỰC KỲ NGUY HIỂM, dễ ngã lộn nhào từ tầng cao xuống đất tử vong; phải nhờ người lớn lấy hộ",
      "Tự làm cho nhanh",
      "Rủ bạn giữ chân rồi thò người ra"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuyệt đối không trèo leo ra ngoài lan can ban công dưới bất kỳ lý do gì.",
    "category": "Thương tích"
  },
  {
    "q": "Túi chườm lạnh sơ cứu nên chườm trực tiếp lên da hay bọc qua một lớp vải mỏng?",
    "options": [
      "Chườm thẳng đá lạnh lên da cả tiếng đồng hồ",
      "Bọc qua một lớp khăn vải sạch mỏng để tránh làm bỏng lạnh da",
      "Chườm đá nóng",
      "Không cần chườm"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Đá lạnh tiếp xúc trực tiếp quá lâu có thể gây bỏng lạnh và hoại tử mô dưới da.",
    "category": "Thương tích"
  },
  {
    "q": "Khi em bị đau bụng quằn quại ở vùng hố chậu phải kèm sốt, em có nên tự uống thuốc giảm đau không?",
    "options": [
      "Uống ngay thật nhiều thuốc giảm đau để ngủ",
      "Không tự uống thuốc giảm đau mà phải đi bệnh viện khám ngay (nghi viêm ruột thừa cấp)",
      "Ăn thật nhiều đồ cay nóng",
      "Xoa dầu nóng khắp bụng"
    ],
    "correct": 1,
    "explain": "Chính xác! Uống thuốc giảm đau làm lu mờ triệu chứng khiến bác sĩ khó chẩn đoán viêm ruột thừa vỡ mủ.",
    "category": "Thương tích"
  },
  {
    "q": "Số điện thoại CẤP CỨU Y TẾ trên toàn quốc là số mấy?",
    "options": [
      "111",
      "113",
      "115",
      "114"
    ],
    "correct": 2,
    "explain": "Rất tốt! 115 là tổng đài cấp cứu y tế và điều xe cứu thương khẩn cấp trên cả nước.",
    "category": "Thương tích"
  },
  {
    "q": "Khi tay đang ướt hoặc chân trần ướt, em có được chạm vào ổ cắm điện, công tắc điện không?",
    "options": [
      "Được, chỉ cần chạm nhẹ",
      "TUYỆT ĐỐI KHÔNG, vì nước dẫn điện cực tốt, nguy cơ bị điện giật tử vong ngay lập tức",
      "Chạm vào bằng mu bàn tay",
      "Chỉ chạm vào lúc ban ngày"
    ],
    "correct": 1,
    "explain": "Chính xác! Nước làm giảm điện trở của da người xuống cực thấp, luồng điện mạnh sẽ chạy thẳng qua tim gây ngừng thở.",
    "category": "Điện"
  },
  {
    "q": "Khi muốn rút phích cắm của quạt hoặc nồi cơm điện ra khỏi ổ cắm, thao tác ĐÚNG là gì?",
    "options": [
      "Cầm vào dây điện kéo giật thật mạnh từ xa",
      "Cầm chắc vào phần đầu phích cắm bằng nhựa cách điện và kéo thẳng ra",
      "Dùng kìm sắt kẹp kéo ra",
      "Lấy chân đạp vào ổ cắm"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Kéo giật dây điện làm đứt ngầm lõi đồng bên trong, gây hở điện tóe lửa chập cháy.",
    "category": "Điện"
  },
  {
    "q": "Khi nhìn thấy một sợi dây điện bị đứt rơi lơ lửng xuống đường hoặc vũng nước sau bão, em cần làm gì?",
    "options": [
      "Nhặt sợi dây điện lên chơi nhảy dây",
      "Đứng cách xa ít nhất 10 mét, cảnh báo mọi người xung quanh và báo người lớn báo ngay cho Điện lực",
      "Lấy que sắt chọc vào sợi dây",
      "Lội qua vũng nước đó"
    ],
    "correct": 1,
    "explain": "Chính xác! Dây điện rơi xuống đất vẫn có thể còn dòng điện cao thế truyền qua mặt đất (điện áp bước) giật chết người từ xa.",
    "category": "Điện"
  },
  {
    "q": "Khi trời đang mưa to dông bão có sấm sét dữ dội, nơi trú ẩn nào sau đây là CỰC KỲ NGUY HIỂM?",
    "options": [
      "Trong ngôi nhà mái bằng kiên cố đóng kín cửa",
      "Dưới gốc cây cổ thụ to đứng độc lập, cột điện hoặc chòi canh giữa đồng trống",
      "Trong xe ô tô đóng kín cửa kính",
      "Trong lớp học"
    ],
    "correct": 1,
    "explain": "Rất đúng! Cây to đứng lẻ loi và cột điện là mục tiêu dẫn sét đánh thẳng hàng đầu.",
    "category": "Điện"
  },
  {
    "q": "Trẻ em có được dùng que sắt, đinh, chìa khóa hoặc kẹp tăm chọc vào lỗ ổ cắm điện không?",
    "options": [
      "Được chơi thử xem có giật không",
      "TUYỆT ĐỐI KHÔNG, đó là hành vi nguy hiểm chết người vì kim loại dẫn điện",
      "Chỉ chọc vào một lỗ",
      "Dùng que tre chọc vào"
    ],
    "correct": 1,
    "explain": "Chính xác! Dòng điện 220V trong gia đình sẽ truyền thẳng vào cơ thể gây bỏng sâu và tử vong.",
    "category": "Điện"
  },
  {
    "q": "Vừa cắm sạc điện thoại vừa chơi game hoặc xem video có nguy hiểm không?",
    "options": [
      "Rất an toàn không sao cả",
      "CỰC KỲ NGUY HIỂM vì pin điện thoại bị nóng quá mức có thể phát nổ gây nát bàn tay hoặc hở điện giật",
      "Giúp pin sạc nhanh hơn",
      "Chơi game mượt hơn"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Đã có rất nhiều vụ tai nạn nổ điện thoại thương tâm khi vừa sạc vừa dùng.",
    "category": "Điện"
  },
  {
    "q": "Đồ vật bằng kim loại (thìa nhôm, bát sắt, giấy bạc) có được cho vào lò vi sóng quay nóng không?",
    "options": [
      "Được cho vào thoải mái",
      "TUYỆT ĐỐI KHÔNG, vì kim loại phản xạ vi sóng tạo ra tia lửa điện gây nổ vỡ lò vi sóng",
      "Cho vào sẽ làm thức ăn chín nhanh",
      "Chỉ bát sắt mới được"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Chỉ dùng các loại hộp, bát đĩa bằng thủy tinh hoặc gốm sứ chuyên dụng cho lò vi sóng.",
    "category": "Điện"
  },
  {
    "q": "Khi tắm bằng bình nóng lạnh trong nhà tắm, biện pháp an toàn điện tốt nhất là gì?",
    "options": [
      "Vừa bật bình nóng lạnh vừa xả nước tắm liên tục",
      "Bật bình nóng lạnh trước 15-20 phút, sau đó TẮT HẲN bình nóng lạnh rồi mới bước vào tắm",
      "Bật chế độ nước sôi nhất",
      "Không cần quan tâm"
    ],
    "correct": 1,
    "explain": "Chính xác! Tắt hoàn toàn rơ-le bình nóng lạnh trước khi tắm giúp loại trừ 100% rủi ro rò rỉ điện ra vòi sen.",
    "category": "Điện"
  },
  {
    "q": "Thả diều gần đường dây điện cao thế có được phép không?",
    "options": [
      "Thả diều ở đâu cũng được",
      "NGHIÊM CẤM HOÀN TOÀN vì diều vướng vào dây điện gây phóng điện cao thế tử vong và mất điện toàn vùng",
      "Thả diều bằng dây cước thì được",
      "Chỉ thả diều nhỏ"
    ],
    "correct": 1,
    "explain": "Rất tốt! Luôn thả diều ở bãi đất trống, bờ đê cách xa đường dây điện cao thế ít nhất hàng trăm mét.",
    "category": "Điện"
  },
  {
    "q": "Khi phát hiện có người đang bị điện giật dính chặt vào dây điện, hành động sơ cứu ĐẦU TIÊN là gì?",
    "options": [
      "Lấy tay không lao vào ôm kéo nạn nhân ra ngay",
      "Nhanh chóng ngắt cầu dao/aptomat điện tổng, hoặc dùng gậy gỗ khô gạt dây điện ra khỏi người nạn nhân",
      "Dội ngay một xô nước vào người nạn nhân",
      "Đứng khóc không làm gì"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuyệt đối không chạm tay trực tiếp vào người đang bị điện giật vì dòng điện sẽ truyền qua người em ngay lập tức.",
    "category": "Điện"
  },
  {
    "q": "Dây sạc điện thoại bị nứt, tróc vỏ lộ dây đồng bên trong thì phải làm gì?",
    "options": [
      "Tiếp tục cắm sạc bình thường",
      "Dừng sử dụng ngay lập tức, báo bố mẹ vứt bỏ và thay thế bằng dây sạc mới an toàn",
      "Lấy băng dính trong dán sơ sài",
      "Lấy kéo cắt phần hở đi"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Dây sạc hở vỏ có thể rò điện hoặc chập mạch gây cháy bàn học, nệm chiếu.",
    "category": "Điện"
  },
  {
    "q": "Bàn chải đánh răng điện hoặc máy sấy tóc có nên để rơi vào bồn tắm đầy nước không?",
    "options": [
      "Rất an toàn vì máy chống nước",
      "CỰC KỲ NGUY HIỂM nếu đang cắm điện, dòng điện sẽ truyền khắp bồn nước gây giật tử vong",
      "Để vào cho sạch máy",
      "Làm nước ấm lên"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Không sử dụng máy sấy tóc, điện thoại trong bồn tắm hoặc khi người đang ướt sũng nước.",
    "category": "Điện"
  },
  {
    "q": "Bóng đèn sợi đốt hoặc đèn sưởi halogen khi đang sáng có đặc điểm nhiệt độ như thế nào?",
    "options": [
      "Rất mát lạnh",
      "Tỏa nhiệt CỰC KỲ NÓNG, chạm vào sẽ bị bỏng nặng và nếu để sát vải vóc sẽ gây cháy",
      "Nhiệt độ bình thường",
      "Chỉ ấm nhẹ"
    ],
    "correct": 1,
    "explain": "Chính xác! Tránh xa các loại bóng đèn sợi đốt, đèn sưởi mùa đông, không để chăn màn chạm vào.",
    "category": "Điện"
  },
  {
    "q": "Khi trời có sấm sét, các thiết bị điện tử có giá trị trong nhà (tivi, máy tính) nên xử lý thế nào?",
    "options": [
      "Bật hết công suất",
      "Rút phích cắm điện và dây mạng truyền hình cáp để tránh sét lan truyền phá hỏng máy",
      "Để ngoài ban công",
      "Bật quạt thổi mát tivi"
    ],
    "correct": 1,
    "explain": "Rất đúng! Sét đánh vào đường dây bên ngoài có thể truyền xung điện áp cao vào nhà làm nổ các thiết bị đang cắm điện.",
    "category": "Điện"
  },
  {
    "q": "Nút 'TEST' màu vàng hoặc cam trên cầu dao chống giật (ELCB/RCCB) trong nhà dùng để làm gì?",
    "options": [
      "Để bật tắt đèn",
      "Để kiểm tra định kỳ xem cầu dao chống giật có còn tự động ngắt khi rò điện hay không",
      "Để tăng thêm điện",
      "Chỉ để làm cảnh"
    ],
    "correct": 1,
    "explain": "Chính xác! Gia đình nên kiểm tra nút TEST mỗi tháng một lần để đảm bảo thiết bị chống giật hoạt động hoàn hảo.",
    "category": "Điện"
  },
  {
    "q": "Trẻ em có được tự ý trèo lên cột điện hoặc trạm biến áp ngoài đường để bắt chim không?",
    "options": [
      "Được, leo trèo rất giỏi",
      "TUYỆT ĐỐI CẤM vì dòng điện trung thế, cao thế có thể phóng tia lửa điện từ xa gây cháy bỏng toàn thân",
      "Chỉ leo lên một nửa cột",
      "Mang giày thể thao thì leo được"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Điện cao thế có thể phóng tia điện qua không khí kể cả khi em chưa chạm trực tiếp vào dây.",
    "category": "Điện"
  },
  {
    "q": "Ấm siêu tốc đun nước sôi sau khi nước sôi tự ngắt điện, có nên mở nắp ngó mặt vào ngay không?",
    "options": [
      "Nên mở ra ngửi ngay",
      "Không nên, vì hơi nước sôi bốc lên cực nóng có thể phả thẳng vào mặt gây bỏng nặng",
      "Lấy tay sờ vào đáy ấm",
      "Uống nước ngay khi vừa sôi"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Hơi nước sôi 100 độ C gây bỏng nhiệt sâu rất nguy hiểm cho mắt và da mặt.",
    "category": "Điện"
  },
  {
    "q": "Tại sao các ổ cắm điện trong phòng trẻ em nên có nắp che an toàn hoặc bịt ổ cắm?",
    "options": [
      "Để ổ cắm không bị bám bụi",
      "Để ngăn trẻ nhỏ tò mò nghịch ngợm thọc ngón tay hay que nhọn vào lỗ điện",
      "Để trang trí căn phòng",
      "Để dòng điện không bị rò ra ngoài"
    ],
    "correct": 1,
    "explain": "Chính xác! Nắp bịt an toàn ổ cắm là giải pháp đơn giản nhưng bảo vệ trẻ em khỏi tai nạn điện giật tại nhà.",
    "category": "Điện"
  },
  {
    "q": "Khi dây điện đi âm tường bị khoan trúng hoặc đóng đinh trúng, hiện tượng gì xảy ra?",
    "options": [
      "Tường nhà chắc hơn",
      "Tóe lửa, nổ chập điện, làm nhảy cầu dao aptomat và có thể giật người đang đóng đinh",
      "Đèn sáng hơn",
      "Không có hiện tượng gì"
    ],
    "correct": 1,
    "explain": "Rất tốt! Trước khi khoan hoặc đóng đinh vào tường cần kiểm tra sơ đồ đường điện âm tường cẩn thận.",
    "category": "Điện"
  },
  {
    "q": "Tại sao không nên để dây điện chạy dưới thảm trải sàn hoặc lối đi lại thường xuyên?",
    "options": [
      "Vì làm thảm bị gồ ghề",
      "Vì người dẫm đạp lên lâu ngày sẽ làm mòn rách vỏ cách điện, gây hở điện và chập cháy thảm",
      "Vì dây điện thích sạch sẽ",
      "Để dây điện được thở"
    ],
    "correct": 1,
    "explain": "Chính xác! Lực đè nén liên tục sẽ làm nứt gãy lớp bọc cao su bảo vệ dây điện.",
    "category": "Điện"
  },
  {
    "q": "Cục sạc dự phòng điện thoại bị phồng to như quả bóng thì nên xử lý thế nào?",
    "options": [
      "Tiếp tục cắm sạc dùng bình thường",
      "Dừng sử dụng ngay lập tức, đem đến điểm thu gom rác điện tử tái chế an toàn, không vứt bừa bãi",
      "Lấy kim chọc thủng cho xẹp",
      "Bỏ vào tủ lạnh"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Pin phồng là pin đã bị biến đổi hóa học cực kỳ nguy hiểm, có thể phát nổ bất ngờ.",
    "category": "Điện"
  },
  {
    "q": "Khi rút phích cắm điện của máy bơm nước hoặc máy giặt, chân em cần đi gì?",
    "options": [
      "Đi chân đất dẫm lên sàn ướt",
      "Đi dép khô ráo cách điện",
      "Ngâm chân vào chậu nước",
      "Chân đất dính bùn"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Dép xốp, dép cao su khô ráo là vật liệu cách điện an toàn cho đôi chân của em.",
    "category": "Điện"
  },
  {
    "q": "Học sinh có được tự ý tháo mở các thiết bị điện (quạt điện, tivi, máy tính) khi chưa rút phích cắm không?",
    "options": [
      "Tháo ra xem bên trong có gì",
      "TUYỆT ĐỐI KHÔNG, bên trong có tụ điện tích điện áp cao có thể phóng điện gây giật chết người",
      "Lấy dao cạy ra xem",
      "Tháo ra rửa bằng nước"
    ],
    "correct": 1,
    "explain": "Chính xác! Ngay cả khi đã tắt công tắc, tụ điện trong máy vẫn có thể lưu trữ điện tích nguy hiểm.",
    "category": "Điện"
  },
  {
    "q": "Cột chống sét (thu lôi) trên nóc các tòa nhà cao tầng có tác dụng gì?",
    "options": [
      "Để thu hút sét đánh cho vui",
      "Thu hút tia sét đánh trúng cột thu lôi rồi dẫn an toàn dòng sét xuống lòng đất, bảo vệ tòa nhà",
      "Để đón sóng điện thoại",
      "Dùng làm cọc cờ"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Hệ thống chống sét giúp chuyển hướng năng lượng sét đánh thẳng vào lòng đất an toàn.",
    "category": "Điện"
  },
  {
    "q": "Khi ngửi thấy mùi khét lẹt của nhựa cháy bốc ra từ ổ cắm điện trên tường, hành động đúng là gì?",
    "options": [
      "Lấy nước dội vào ổ cắm",
      "Báo ngay cho người lớn để ngắt cầu dao điện tổng của khu vực đó và kiểm tra",
      "Lấy tay bịt chặt lỗ cắm",
      "Cắm thêm thiết bị khác vào xem"
    ],
    "correct": 1,
    "explain": "Chính xác! Mùi nhựa khét báo hiệu dây điện hoặc ổ cắm đang bị quá nhiệt nóng chảy, sắp bùng cháy.",
    "category": "Điện"
  },
  {
    "q": "Theo 'Quy tắc đồ lót' (PANTS Rule), 'vùng đồ lót' (vùng kín) của em bao gồm những bộ phận nào?",
    "options": [
      "Chỉ có hai bàn tay",
      "Ngực, phần giữa hai đùi (bộ phận sinh dục) và mông",
      "Đầu gối và khuỷu tay",
      "Tóc và tai"
    ],
    "correct": 1,
    "explain": "Chính xác! Vùng mặc đồ lót là vùng kín riêng tư tuyệt đối của cơ thể em, không ai được phép nhìn hay chạm vào.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Những ai ĐƯỢC PHÉP chạm vào vùng kín của em trong trường hợp đặc biệt?",
    "options": [
      "Bất kỳ ai thích chạm vào",
      "Bác sĩ khi khám bệnh (bắt buộc phải có bố mẹ ở bên cạnh), hoặc bố mẹ khi vệ sinh lúc em còn nhỏ",
      "Người lạ trên đường",
      "Bạn bè cùng lớp"
    ],
    "correct": 1,
    "explain": "Rất đúng! Bác sĩ chỉ được khám khi có sự chứng kiến và đồng ý của bố mẹ em.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Theo 'Quy tắc 5 ngón tay', NGÓN CÁI (ngón tay gần em nhất) đại diện cho những ai và hành động nào?",
    "options": [
      "Người lạ mặt - Xua tay",
      "Người thân ruột thịt (Bố, Mẹ, Anh Chị Em ruột) - Được ôm hôn, yêu thương",
      "Hàng xóm - Bắt tay",
      "Thầy cô giáo - Bắt tay"
    ],
    "correct": 1,
    "explain": "Chính xác! Ngón cái tượng trưng cho những người thân yêu ruột thịt nhất trong gia đình em.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Theo 'Quy tắc 5 ngón tay', NGÓN TRỎ đại diện cho những ai?",
    "options": [
      "Người xa lạ",
      "Ông bà, thầy cô giáo, cô dì chú bác, bạn bè thân thiết (Được nắm tay, khoác vai)",
      "Người bán hàng rong",
      "Người qua đường"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Ngón trỏ là những người họ hàng thân thiết và thầy cô bạn bè em quý mến.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Theo 'Quy tắc 5 ngón tay', NGÓN ÚT (ngón tay xa em nhất) đại diện cho ai và em nên làm gì?",
    "options": [
      "Bố mẹ ruột",
      "Người hoàn toàn xa lạ - Em cần xua tay, giữ khoảng cách an toàn, không cho tiếp xúc gần",
      "Bạn thân cùng bàn",
      "Anh chị em ruột"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Với người lạ, em tuyệt đối không đi theo, không cho đụng chạm vào cơ thể.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Nếu một người lạ mặt ngoài cổng trường cho em kẹo ngọt, đồ chơi đẹp và rủ lên xe máy đi cùng, em phải làm gì?",
    "options": [
      "Nhận kẹo ngay và vui vẻ nhảy lên xe",
      "Kiên quyết nói: 'Cháu không quen cô/chú, cháu không đi!' và chạy nhanh vào trường báo bác bảo vệ",
      "Đi theo xem người ta đưa đi đâu",
      "Lấy kẹo ăn rồi mới chạy"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Kẻ xấu thường dùng bánh kẹo, đồ chơi để dụ dỗ bắt cóc trẻ em. Tuyệt đối không nhận đồ của người lạ!",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi một người nào đó chạm vào cơ thể làm em cảm thấy khó chịu, sợ hãi hoặc xấu hổ, em phải làm gì?",
    "options": [
      "Im lặng cam chịu và giấu kín",
      "Hét thật to: 'KHÔNG ĐƯỢC! DỪNG LẠI!', chạy thoát ra nơi đông người và kể ngay cho bố mẹ",
      "Cười vui vẻ với họ",
      "Nghĩ rằng đó là lỗi của mình"
    ],
    "correct": 1,
    "explain": "Chính xác! Cơ thể em thuộc về chính em. Em có toàn quyền từ chối mọi sự đụng chạm không an toàn!",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "'Bí mật xấu' (bí mật làm em cảm thấy bất an, sợ hãi, lo lắng hoặc bị đe dọa không được nói) có nên giữ kín không?",
    "options": [
      "Phải giữ kín suốt đời",
      "TUYỆT ĐỐI KHÔNG GIỮ KÍN, hãy kể ngay cho người lớn em tin cậy nhất (Bố mẹ, Thầy cô)",
      "Giấu vào nhật ký",
      "Chia sẻ cho người lạ"
    ],
    "correct": 1,
    "explain": "Rất đúng! Kẻ xấu thường đe dọa để em giữ bí mật. Bố mẹ và thầy cô sẽ luôn yêu thương, bảo vệ và giúp đỡ em.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Số điện thoại của TỔNG ĐÀI QUỐC GIA BẢO VỆ TRẺ EM tại Việt Nam là số mấy?",
    "options": [
      "111",
      "112",
      "113",
      "114"
    ],
    "correct": 0,
    "explain": "Chính xác! Tổng đài 111 hoạt động 24/7 hoàn toàn miễn phí cước gọi, sẵn sàng can thiệp bảo vệ trẻ em mọi lúc mọi nơi.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi bị người lạ cố tình túm tay, kéo lôi đi trên đường vắng, em cần hành động như thế nào để cầu cứu?",
    "options": [
      "Im lặng đi theo",
      "Giãy giụa, hét thật to, cắn mạnh hoặc ngồi thụp xuống đất, hô lớn: 'CỨU CHÁU VỚI! CHÁU KHÔNG QUEN NGƯỜI NÀY!'",
      "Khóc thút thít nhỏ nhẹ",
      "Hát một bài hát"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Hô to 'CHÁU KHÔNG QUEN NGƯỜI NÀY!' để mọi người xung quanh biết kẻ xấu đang bắt cóc chứ không phải bố mẹ mắng con.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi bị lạc người thân trong siêu thị hoặc công viên đông đúc, việc đầu tiên em nên làm là gì?",
    "options": [
      "Hoảng loạn chạy khắp nơi tìm kiếm",
      "Đứng yên tại chỗ hoặc tìm đến bàn hướng dẫn, chú bảo vệ, cô thu ngân mặc đồng phục để nhờ gọi loa tìm bố mẹ",
      "Đi theo một người lạ mặt bất kỳ",
      "Ngồi khóc ở xó tối"
    ],
    "correct": 1,
    "explain": "Chính xác! Chú bảo vệ và cô nhân viên mặc đồng phục là những người an toàn nhất có thể giúp em phát loa tìm bố mẹ.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Để đề phòng trường hợp bị lạc, em cần học thuộc lòng những thông tin cơ bản nào?",
    "options": [
      "Tên nhân vật hoạt hình yêu thích",
      "Họ tên của em, số điện thoại của bố hoặc mẹ và địa chỉ nhà của mình",
      "Tên ca sĩ nổi tiếng",
      "Mật khẩu game"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Học thuộc số điện thoại của bố mẹ giúp em dễ dàng liên lạc về nhà khi gặp sự cố.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi ở nhà một mình mà có người lạ gõ cửa xưng là 'thợ sửa ống nước' hoặc 'giao hàng', em nên làm gì?",
    "options": [
      "Mở toang cửa mời người lạ vào nhà ngồi chơi",
      "KHÔNG MỞ CỬA, nói to vọng ra: 'Bố mẹ cháu đang bận trong phòng, chú vui lòng quay lại sau' và gọi điện cho bố mẹ",
      "Bỏ nhà chạy ra ngoài",
      "Khóc to cho người ta sợ"
    ],
    "correct": 1,
    "explain": "Chính xác! Tuyệt đối không mở cửa cho bất kỳ người lạ nào khi ở nhà một mình.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Có ai có quyền bắt em chụp ảnh cởi bỏ quần áo hoặc xem hình ảnh người lớn nhạy cảm không?",
    "options": [
      "Ai cũng có quyền",
      "TUYỆT ĐỐI KHÔNG AI CÓ QUYỀN, đó là hành vi phạm tội nghiêm trọng xâm hại trẻ em",
      "Được chụp nếu có tiền",
      "Chỉ người quen mới được chụp"
    ],
    "correct": 1,
    "explain": "Rất đúng! Hãy kiên quyết từ chối và báo ngay cho bố mẹ, cô giáo hoặc tổng đài 111.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi đi vệ sinh công cộng hoặc phòng thay đồ ở bể bơi, em cần chú ý điều gì?",
    "options": [
      "Mở toang cửa cho thoáng",
      "Luôn đóng và chốt khóa cửa cẩn thận, không cho người khác nhìn trộm hoặc quay phim",
      "Rủ người lạ vào cùng",
      "Vừa thay đồ vừa chơi game"
    ],
    "correct": 1,
    "explain": "Chính xác! Bảo vệ sự riêng tư cá nhân của mình ở mọi nơi công cộng.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Nếu có người nói với em: 'Bố mẹ cháu bị tai nạn đang cấp cứu ở viện, cô/chú đến đón cháu đi gặp bố mẹ', em nên làm gì?",
    "options": [
      "Lập tức lên xe đi theo ngay vì quá lo sợ",
      "Bình tĩnh không đi theo, chạy vào gặp thầy cô giáo hoặc bác bảo vệ trường để gọi điện thoại xác minh trực tiếp với bố mẹ",
      "Đưa hết tiền cho người đó",
      "Nhảy lên xe khóc lóc"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Đây là thủ đoạn lừa đảo bắt cóc rất phổ biến. Luôn kiểm tra thông tin với thầy cô giáo trước!",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi em cảm thấy một 'Linh cảm xấu' (lo lắng, rùng mình, tim đập nhanh bất an) về một tình huống nào đó, em nên làm gì?",
    "options": [
      "Bỏ qua linh cảm cứ làm tới",
      "Tin vào linh cảm của mình, nhanh chóng rời khỏi nơi đó và tìm đến nơi an toàn đông người",
      "Ngồi im chịu đựng",
      "Rủ thêm bạn vào chỗ nguy hiểm"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Trực giác tự nhiên của cơ thể đang cảnh báo em trước nguy hiểm, hãy tin vào linh cảm của mình.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Em có nên chia sẻ hình ảnh mặc đồ lót hoặc đồ bơi của mình lên mạng xã hội không?",
    "options": [
      "Đăng lên cho nhiều người thả tim",
      "Tuyệt đối KHÔNG, vì kẻ xấu có thể lưu lại và sử dụng vào mục đích xấu xâm hại em",
      "Đăng lên rồi xóa đi ngay",
      "Gửi cho người lạ xem"
    ],
    "correct": 1,
    "explain": "Chính xác! Không bao giờ đăng tải hoặc gửi ảnh nhạy cảm cá nhân lên không gian mạng.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Ai là những người đáng tin cậy nhất mà em luôn có thể tâm sự mọi chuyện khó khăn trong cuộc sống?",
    "options": [
      "Người lạ mới quen qua mạng xã hội",
      "Bố mẹ, ông bà, thầy cô giáo và chuyên gia tổng đài 111",
      "Kẻ hay bắt nạt em",
      "Người xúi giục em làm việc xấu"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Bố mẹ và thầy cô luôn yêu thương và sẵn sàng lắng nghe, bảo vệ em vô điều kiện.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Quy tắc 'Đèn giao thông' trong giao tiếp bảo vệ thân thể có nghĩa là gì?",
    "options": [
      "Đèn Xanh: Những cái bắt tay, ôm chào hỏi lịch sự; Đèn Vàng: Hành động thân mật cần cẩn trọng; Đèn Đỏ: Vùng kín tuyệt đối CẤM chạm",
      "Dùng để đi bộ qua đường",
      "Là trò chơi điện tử",
      "Không có ý nghĩa gì"
    ],
    "correct": 0,
    "explain": "Chính xác! Luôn bật 'Đèn Đỏ' kiên quyết từ chối bất kỳ ai xâm phạm vùng nhạy cảm của em.",
    "category": "Bảo vệ bản thân"
  },
  {
    "q": "Khi đi thang máy, hành động nào sau đây là NGUY HIỂM cần tuyệt đối tránh?",
    "options": [
      "Đứng nép vào một bên khi vào thang",
      "Chạy nhảy, dẫm mạnh hoặc xô đẩy đùa nghịch bên trong buồng thang máy",
      "Chờ thang dừng hẳn cửa mở ra mới bước vào",
      "Nhấn đúng số tầng mình muốn đến"
    ],
    "correct": 1,
    "explain": "Chính xác! Nhảy nhót mạnh trong thang máy có thể kích hoạt hệ thống phanh hãm an toàn khẩn cấp làm thang dừng kẹt giữa các tầng.",
    "category": "Trường học"
  },
  {
    "q": "Nếu không may thang máy bị mất điện hoặc kẹt dừng đột ngột giữa hai tầng nhà, em nên làm gì?",
    "options": [
      "Hoảng loạn cạy cửa thang máy trèo ra ngoài",
      "Bình tĩnh, nhấn nút hình chiếc chuông báo động (Intercom) hoặc gọi cứu hộ, chờ người tới mở",
      "Cố trèo lên nóc thang máy",
      "Đập vỡ kính thang máy"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Buồng thang máy luôn có lỗ thông khí thở đầy đủ. Tuyệt đối không cạy cửa vì rất dễ rơi xuống hố thang tử vong.",
    "category": "Trường học"
  },
  {
    "q": "Học sinh có được mang các vật sắc nhọn nguy hiểm (dao rọc giấy, kéo sắc, bật lửa) đến trường không?",
    "options": [
      "Được mang để khoe với bạn",
      "TUYỆT ĐỐI KHÔNG, vi phạm nội quy trường học và rất dễ gây thương tích cho bản thân và bạn bè",
      "Mang đi để dọa bạn bè",
      "Được mang nếu giấu trong cặp"
    ],
    "correct": 1,
    "explain": "Đúng rồi! Chỉ sử dụng kéo thủ công đầu tròn dưới sự hướng dẫn trực tiếp của thầy cô giáo.",
    "category": "Trường học"
  },
  {
    "q": "Khi chơi trò chơi xích đu trong sân trường hoặc công viên, quy tắc an toàn là gì?",
    "options": [
      "Đứng thẳng hai chân lên ghế xích đu đung đưa thật cao",
      "Ngồi chắc chắn trên ghế, hai tay nắm chặt vào hai sợi xích và không nhảy xuống khi xích đu đang bay",
      "Chạy cắt ngang trước mặt xích đu đang đung đưa",
      "Xô đẩy bạn đang ngồi"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Nhảy xuống khi xích đu đang bay cao dễ bị gãy chân hoặc bị xích đu đập trúng đầu.",
    "category": "Trường học"
  },
  {
    "q": "Hành vi trêu đùa rút ghế khi bạn chuẩn bị ngồi xuống có hậu quả như thế nào?",
    "options": [
      "Rất vui vẻ và hài hước",
      "CỰC KỲ NGUY HIỂM, làm bạn ngã đập mông xuống sàn gây chấn thương đốt sống lưng, dập tủy và liệt vĩnh viễn",
      "Giúp bạn phản xạ nhanh hơn",
      "Không có tác hại gì"
    ],
    "correct": 1,
    "explain": "Chính xác! Đây là trò đùa vô cùng độc hại đã khiến nhiều học sinh bị tàn phế suốt đời.",
    "category": "Trường học"
  },
  {
    "q": "Khi bị một nhóm bạn học trong trường đe dọa, cô lập hoặc bắt nạt, em nên làm gì?",
    "options": [
      "Giấu kín một mình chịu đựng bị đánh",
      "Báo ngay cho thầy cô giáo chủ nhiệm, ban giám hiệu và bố mẹ để được can thiệp bảo vệ",
      "Rủ giang hồ bên ngoài vào trường đánh lại",
      "Nghỉ học luôn"
    ],
    "correct": 1,
    "explain": "Rất đúng! Bạo lực học đường cần được ngăn chặn từ sớm. Thầy cô và bố mẹ sẽ luôn đứng về phía em.",
    "category": "Trường học"
  },
  {
    "q": "Mật khẩu tài khoản học trực tuyến, email hoặc tài khoản mạng xã hội của em có nên chia sẻ cho bạn cùng lớp không?",
    "options": [
      "Cho các bạn thoải mái cùng dùng",
      "TUYỆT ĐỐI KHÔNG, mật khẩu là thông tin bảo mật cá nhân, chỉ bố mẹ em mới được biết",
      "Đặt mật khẩu dễ đoán như 123456",
      "Viết mật khẩu lên bảng lớp"
    ],
    "correct": 1,
    "explain": "Chính xác! Người khác có thể dùng tài khoản của em để nhắn tin bậy bạ, lừa đảo hoặc xóa tài liệu học tập của em.",
    "category": "Không gian mạng"
  },
  {
    "q": "Khi đang lướt mạng bỗng thấy xuất hiện thông báo: 'Chúc mừng bạn đã trúng thưởng iPhone 16 / nhận kim cương game miễn phí, bấm vào đây để nhận', em nên làm gì?",
    "options": [
      "Bấm vào ngay và điền mật khẩu, số điện thoại",
      "Tuyệt đối KHÔNG BẤM VÀO, đây là đường link lừa đảo chứa mã độc virus đánh cắp thông tin",
      "Chia sẻ link cho cả lớp",
      "Điền thông tin thẻ ngân hàng của bố mẹ"
    ],
    "correct": 1,
    "explain": "Rất giỏi! Không có phần thưởng miễn phí nào từ các trang web lạ, đó là cái bẫy của tội phạm mạng.",
    "category": "Không gian mạng"
  },
  {
    "q": "Một người lạ mặt trên mạng xã hội kết bạn và yêu cầu em gửi địa chỉ nhà, tên trường học và số điện thoại, em nên làm gì?",
    "options": [
      "Gửi đầy đủ thông tin kèm ảnh chụp nhà",
      "TỪ CHỐI và CHẶN (Block) ngay người này, báo cho bố mẹ biết",
      "Mời người đó đến nhà chơi",
      "Hẹn gặp mặt ở nơi vắng vẻ"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Tuyệt đối không bao giờ tiết lộ thông tin cá nhân hay địa chỉ cho người lạ trên mạng Internet.",
    "category": "Không gian mạng"
  },
  {
    "q": "Khi có người nhắn tin trên mạng đe dọa, chửi bới hoặc bắt nạt trực tuyến em, cách xử lý thông minh là gì?",
    "options": [
      "Chụp ảnh màn hình làm bằng chứng -> Chặn người đó -> Kể ngay cho bố mẹ hoặc thầy cô",
      "Chửi bới đôi co lại với họ suốt đêm",
      "Xóa hết ứng dụng và ngồi khóc",
      "Hẹn gặp mặt người đó để giải quyết bằng bạo lực"
    ],
    "correct": 0,
    "explain": "Tuyệt vời! Chụp ảnh màn hình giúp lưu lại bằng chứng để người lớn và công an xử lý kẻ bắt nạt.",
    "category": "Không gian mạng"
  },
  {
    "q": "Học sinh tiểu học có nên dành quá nhiều thời gian trong ngày dán mắt vào màn hình điện thoại, máy tính không?",
    "options": [
      "Càng chơi nhiều càng giỏi công nghệ",
      "KHÔNG NÊN, vì gây cận thị, gù lưng, mất ngủ và giảm khả năng tập trung học tập",
      "Chơi thâu đêm suốt sáng",
      "Bỏ ăn bỏ ngủ để chơi game"
    ],
    "correct": 1,
    "explain": "Chính xác! Nên cân bằng thời gian học tập, vui chơi thể thao ngoài trời và chỉ dùng thiết bị điện tử khi có sự cho phép của bố mẹ.",
    "category": "Không gian mạng"
  },
  {
    "q": "Hành động tự ý chụp ảnh bạn bè rồi đăng lên mạng ghép ảnh chế giễu bôi nhọ có đúng không?",
    "options": [
      "Đùa vui không sao cả",
      "HOÀN TOÀN SAI TRÁI, vi phạm quyền riêng tư và có thể gây tổn thương tâm lý sâu sắc cho bạn",
      "Làm thế cho nổi tiếng",
      "Được phép làm thoải mái"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Hãy luôn tôn trọng bạn bè cả ngoài đời thực lẫn trên không gian mạng.",
    "category": "Không gian mạng"
  },
  {
    "q": "Khi tải một trò chơi hoặc ứng dụng mới về máy tính/điện thoại, em cần làm gì?",
    "options": [
      "Cứ bấm tải bừa bãi ở các trang web lậu",
      "Hỏi ý kiến của bố mẹ và chỉ tải từ các kho ứng dụng chính thống an toàn (Google Play, App Store)",
      "Tải các bản game bẻ khóa hack",
      "Tắt hết phần mềm diệt virus đi"
    ],
    "correct": 1,
    "explain": "Chính xác! Ứng dụng lậu chứa mã độc có thể làm hỏng máy và đánh cắp tài khoản ngân hàng của gia đình.",
    "category": "Không gian mạng"
  },
  {
    "q": "Khi đi dạo trong sân trường vào giờ ra chơi, em nhìn thấy một bạn học đang ngồi vắt vẻo trên lan can tầng 3, em nên làm gì?",
    "options": [
      "Chạy lại vỗ mạnh vào lưng bạn trêu đùa",
      "Nhẹ nhàng nhắc bạn bước xuống an toàn và báo ngay cho thầy cô giáo gần nhất hỗ trợ",
      "Đứng xem bạn có ngã không",
      "Chụp ảnh đăng lên mạng"
    ],
    "correct": 1,
    "explain": "Rất tốt! Hét to hay vỗ bất ngờ có thể làm bạn giật mình rơi xuống. Hãy bình tĩnh khuyên bạn bước xuống.",
    "category": "Trường học"
  },
  {
    "q": "Tại các bậc cầu thang của trường học, học sinh nên di chuyển như thế nào?",
    "options": [
      "Chạy thật nhanh, nhảy cóc 3-4 bậc một lúc",
      "Đi bộ nhẹ nhàng, đi về phía bên tay phải của mình và vịn tay vào lan can",
      "Xô đẩy bạn phía trước để vượt lên",
      "Đứng túm tụm chắn lối đi"
    ],
    "correct": 1,
    "explain": "Chính xác! Đi bên phải và không chạy nhảy giúp tránh các tai nạn vấp ngã liên hoàn trên cầu thang.",
    "category": "Trường học"
  },
  {
    "q": "Trò chơi ném đá, ném cành cây hoặc bắn súng cao su trong trường học có nguy hiểm không?",
    "options": [
      "Không nguy hiểm",
      "CỰC KỲ NGUY HIỂM, mảnh đá có thể bay trúng mắt gây mù mắt vĩnh viễn hoặc chấn thương đầu",
      "Giúp ngắm bắn chuẩn hơn",
      "Nên chơi mỗi ngày"
    ],
    "correct": 1,
    "explain": "Đúng vậy! Rất nhiều bạn nhỏ đã bị mù một bên mắt chỉ vì một viên sỏi ném đùa vô ý của bạn bè.",
    "category": "Trường học"
  },
  {
    "q": "Nếu một người lạ trên mạng hẹn gặp em ở một quán trà sữa ngoài đời thực, em có được tự ý đi gặp không?",
    "options": [
      "Đi gặp ngay để nhận quà",
      "TUYỆT ĐỐI KHÔNG đi gặp một mình, hãy thông báo ngay cho bố mẹ biết",
      "Rủ thêm một em bé đi cùng",
      "Lén đi vào ban đêm"
    ],
    "correct": 1,
    "explain": "Chính xác! Người lạ trên mạng có thể dùng ảnh đại diện giả để lừa gạt, bắt cóc hoặc xâm hại em.",
    "category": "Không gian mạng"
  },
  {
    "q": "Khi em chứng kiến một bạn học trong trường bị ngã bất tỉnh hoặc chảy máu nhiều, em cần làm gì?",
    "options": [
      "Đứng vây quanh xem cho vui",
      "Chạy ngay đi tìm thầy cô giáo hoặc nhân viên y tế trường học tới sơ cứu khẩn cấp",
      "Bỏ mặc bạn đi chơi",
      "Lấy cây chọc vào người bạn"
    ],
    "correct": 1,
    "explain": "Rất chuẩn! Báo ngay cho thầy cô là cách nhanh nhất và an toàn nhất để giúp đỡ bạn.",
    "category": "Trường học"
  },
  {
    "q": "Quy tắc vàng khi sử dụng mạng xã hội và Internet dành cho học sinh là gì?",
    "options": [
      "Tin tất cả những gì người ta nói trên mạng",
      "Bảo vệ thông tin cá nhân - Lịch sự văn minh - Không chia sẻ tin giả - Báo cho người lớn khi thấy bất an",
      "Dành 24/24 giờ để lướt mạng",
      "Kết bạn với bất kỳ ai gửi lời mời"
    ],
    "correct": 1,
    "explain": "Tuyệt vời! Trở thành một công dân số thông minh, an toàn và có trách nhiệm.",
    "category": "Không gian mạng"
  },
  {
    "q": "Người bạn đồng hành thông minh 'Thỏ Ngọc - Chuyên gia an toàn cho trẻ em' sẽ luôn giúp em điều gì?",
    "options": [
      "Giúp em làm bài tập về nhà môn vẽ",
      "Cung cấp kiến thức, kỹ năng an toàn và bảo vệ bản thân để em tự tin lớn khôn mỗi ngày",
      "Chỉ để nghe nhạc",
      "Chơi game cùng em"
    ],
    "correct": 1,
    "explain": "Chính xác! Thỏ Ngọc luôn ở đây để đồng hành, chia sẻ và bảo vệ các bạn học sinh thân yêu! ❤️",
    "category": "Trường học"
  }
];

if (typeof window !== 'undefined') window.QUIZ_BANK = QUIZ_BANK;
if (typeof module !== 'undefined' && module.exports) module.exports = QUIZ_BANK;
