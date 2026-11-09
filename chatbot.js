(function() {
    // Ngăn chặn khởi tạo trùng lặp
    if (window.__thoNgocChatbotLoaded) return;
    window.__thoNgocChatbotLoaded = true;

    const ASSISTANT_NAME = "Thỏ Ngọc - Chuyên gia an toàn cho trẻ em 🐰🛡️";

    // Âm thanh thông báo "Ting Teng" nhẹ nhàng bằng Web Audio API
    function playTingSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sine';
            osc2.type = 'sine';

            // Nốt E6 & B6 tạo tiếng Teng nhẹ nhàng, hiện đại
            osc1.frequency.setValueAtTime(1318.51, ctx.currentTime); 
            osc2.frequency.setValueAtTime(1975.53, ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 0.25);
            osc2.start(ctx.currentTime + 0.08);
            osc2.stop(ctx.currentTime + 0.45);
        } catch (e) {}
    }

    // CƠ SỞ DỮ LIỆU TRI THỨC (KB) - LUẬT 2025, TÀI LIỆU TUYÊN TRUYỀN & TÌNH HUỐNG
    const KB = [
        {
        id: "greeting",
        keywords: [
            'chào',
            'xin chào',
            'hi',
            'hello',
            'alo',
            'bắt đầu',
            'bat dau',
            'chào bạn',
            'chào bot',
            'có ai không',
            'trợ lý'
        ],
        response: "**Chào em! 👋 Mình là Thỏ Ngọc - Chuyên gia an toàn cho trẻ em 🐰🛡️**\n\n" +
                  "Mình sẽ đồng hành cùng em tìm hiểu về **phòng, chống tai nạn thương tích và đuối nước**.\n\n" +
                  "Em có thể hỏi mình về an toàn khi bơi, phòng tránh đuối nước, té ngã, bỏng, điện giật, tai nạn giao thông, vật sắc nhọn, động vật cắn và nhiều tình huống nguy hiểm khác trong cuộc sống.\n\n" +
                  "Em muốn Chuyên gia Thỏ Ngọc giúp gì nào? 😊"
    },

    {
        id: "bot_identity",
        keywords: [
            'bạn là ai',
            'ban la ai',
            'ai vậy',
            'ai đấy',
            'trợ lý là ai',
            'bot là ai',
            'bạn làm gì'
        ],
        response: "**Mình là Thỏ Ngọc 🐰 - Chuyên gia an toàn của các bạn nhỏ.**\n\n" +
                  "Mình là chuyên gia giúp các em học sinh tìm hiểu kiến thức và kỹ năng **phòng, chống tai nạn thương tích và đuối nước**.\n\n" +
                  "Thỏ Ngọc sẽ giúp em biết cách **nhận diện nguy hiểm - phòng tránh - xử lý đúng khi có tình huống xảy ra**."
    },

    {
        id: "bot_name",
        keywords: [
            'bạn tên gì',
            'ban ten gi',
            'tên bạn là gì',
            'tên chatbot',
            'chatbot tên gì',
            'tên của bạn',
            'Thỏ ngọc là ai',
            'thỏ ngọc là ai'
        ],
        response: "**Mình tên là Thỏ Ngọc 🐰**\n\n" +
                  "Tên đầy đủ của mình là **Thỏ Ngọc - Chuyên gia an toàn cho trẻ em**.\n\n" +
                  "Mình sẽ cùng em học cách nhận biết nguy hiểm, phòng tránh tai nạn và bảo vệ bản thân an toàn hơn mỗi ngày. 😊"
    },

    {
        id: "bot_can_help",
        keywords: [
            'bạn biết gì',
            'ban biet gi',
            'bạn làm được gì',
            'giúp gì',
            'giup gi',
            'hỏi gì được',
            'có thể hỏi gì',
            'Thỏ ngọc giúp gì',
            'Thỏ ngọc biết gì'
        ],
        response: "**Thỏ ngọc có thể giúp em tìm hiểu rất nhiều kiến thức về an toàn. 🛡️**\n\n" +
                  "Ví dụ như:\n" +
                  "• Phòng tránh đuối nước và bơi an toàn.\n" +
                  "• Phòng tránh té ngã, bỏng và điện giật.\n" +
                  "• An toàn khi tham gia giao thông.\n" +
                  "• Phòng tránh tai nạn khi vui chơi, học tập và sinh hoạt.\n" +
                  "• Cách xử lý khi gặp vật sắc nhọn, động vật cắn hoặc tình huống nguy hiểm.\n" +
                  "• Cách gọi người lớn và tìm sự trợ giúp khi xảy ra tai nạn.\n\n" +
                  "Em cứ hỏi Thỏ ngọc bằng cách nói bình thường nhé! 😊"
    },

    {
        id: "ask_to_start",
        keywords: [
            'bắt đầu thôi',
            'bat dau thoi',
            'bắt đầu học',
            'học thôi',
            'hoc thoi',
            'mình bắt đầu nhé',
            'sẵn sàng',
            'san sang'
        ],
        response: "**Được rồi, chúng mình bắt đầu nhé! 🛡️**\n\n" +
                  "Em có thể hỏi Thỏ ngọc bất cứ điều gì về **phòng chống đuối nước, tai nạn thương tích và kỹ năng an toàn**.\n\n" +
                  "Ví dụ: **“Đuối nước là gì?”**, **“Bị bỏng phải làm sao?”**, **“Bạn bị ngã thì em nên làm gì?”** hoặc **“Em bị rơi xuống nước phải xử lý thế nào?”**"
    },

    {
        id: "thanks",
        keywords: [
            'cảm ơn',
            'cam on',
            'cám ơn',
            'thanks',
            'thank you',
            'cảm ơn bạn',
            'cảm ơn Thỏ ngọc'
        ],
        response: "**Không có gì đâu! 😊**\n\n" +
                  "Thỏ ngọc rất vui khi được giúp em.\n\n" +
                  "Hãy luôn nhớ: **Nhận biết nguy hiểm - Phòng tránh từ sớm - Gọi người lớn khi cần giúp đỡ. 🛡️**\n\n" +
                  "Em còn muốn hỏi Thỏ ngọc điều gì nữa không?"
    },

    {
        id: "goodbye",
        keywords: [
            'tạm biệt',
            'tam biet',
            'bye',
            'goodbye',
            'hẹn gặp lại',
            'hen gap lai',
            'mình đi đây',
            'thoát'
        ],
        response: "**Tạm biệt em! 👋**\n\n" +
                  "Thỏ ngọc chúc em luôn vui khỏe và an toàn. 🛡️\n\n" +
                  "Nhớ nhé: **Cẩn thận khi vui chơi - Không chủ quan trước nguy hiểm - Gặp sự cố hãy gọi người lớn.**\n\n" +
                  "Hẹn gặp lại em!"
    },
        
        {
        id: "drowning_definition",
        keywords: [
            'đuối nước là gì',
            'thế nào là đuối nước',
            'duoi nuoc la gi',
            'bị đuối nước là sao',
            'đuối nước nghĩa là gì'
        ],
        response: "**Đuối nước là gì?**\n\n" +
                  "Đuối nước xảy ra khi một người bị chìm hoặc ngập trong nước làm cho đường thở bị ảnh hưởng và cơ thể không nhận đủ ôxy.\n\n" +
                  "Đuối nước có thể xảy ra ở ao, hồ, sông, suối, biển, bể bơi và cả những vật chứa nước trong gia đình. Đuối nước rất nguy hiểm vì có thể gây tổn thương nghiêm trọng cho cơ thể, thậm chí dẫn đến tử vong.\n\n" +
                  "Vì vậy, khi ở gần nước, em cần luôn cẩn thận, nghe lời người lớn và tuân thủ các quy tắc an toàn."
    },

    {
        id: "drowning_can_happen_anywhere",
        keywords: [
            'đuối nước xảy ra ở đâu',
            'ở đâu có thể bị đuối nước',
            'duoi nuoc xay ra o dau',
            'những nơi nào có thể gây đuối nước'
        ],
        response: "**Đuối nước có thể xảy ra ở rất nhiều nơi.**\n\n" +
                  "Không chỉ sông, hồ hoặc biển mới nguy hiểm. Đuối nước còn có thể xảy ra ở ao, suối, kênh, mương, bể bơi, giếng, hố nước, bể chứa nước, chum, vại hoặc những vật dụng có chứa nước.\n\n" +
                  "Điều quan trọng là em không được nghĩ rằng một nơi có ít nước thì chắc chắn an toàn. Với trẻ nhỏ, chỉ một lượng nước không nhiều cũng có thể gây nguy hiểm.\n\n" +
                  "Hãy tránh xa những nơi có nước nếu không có người lớn đi cùng."
    },

    {
        id: "dangerous_water_places",
        keywords: [
            'những nơi nào nguy hiểm gần nước',
            'nơi nào dễ bị đuối nước',
            'noi nao de bi duoi nuoc',
            'khu vực nước nào nguy hiểm',
            'chỗ nào dễ xảy ra đuối nước'
        ],
        response: "**Một số nơi có nguy cơ gây đuối nước cao gồm:**\n\n" +
                  "1. Ao, hồ, sông, suối, kênh, mương.\n" +
                  "2. Giếng, bể chứa nước, hố sâu có nước.\n" +
                  "3. Bể bơi không có người giám sát.\n" +
                  "4. Biển, đặc biệt ở nơi có sóng lớn hoặc dòng nước mạnh.\n" +
                  "5. Các hố công trình, hố lấy đất, hố lấy cát hoặc cống thoát nước bị ngập.\n\n" +
                  "Nhiều nơi nhìn bên ngoài có vẻ bình thường nhưng có thể rất sâu hoặc có dòng nước nguy hiểm. Vì vậy em không nên tự ý đến gần hoặc xuống nước."
    },

    {
        id: "pond_river_risk",
        keywords: [
            'ao hồ có nguy hiểm không',
            'sông suối có nguy hiểm không',
            'ao ho co nguy hiem khong',
            'tắm sông có nguy hiểm không',
            'tắm hồ có nguy hiểm không'
        ],
        response: "**Ao, hồ, sông và suối có thể rất nguy hiểm đối với trẻ em.**\n\n" +
                  "Những nơi này thường có độ sâu không đều, đáy trơn, bùn lầy, dòng chảy mạnh hoặc những vật mà chúng ta không nhìn thấy ở dưới nước.\n\n" +
                  "Đặc biệt, ở nhiều nơi không có biển cảnh báo hoặc hàng rào chắn nên trẻ em rất dễ trượt chân hoặc rơi xuống nước khi chơi gần đó.\n\n" +
                  "Em không được tự ý xuống ao, hồ, sông, suối để tắm hoặc chơi, kể cả khi em đã biết bơi."
    },

    {
        id: "well_risk",
        keywords: [
            'giếng có nguy hiểm không',
            'giếng nước có gây đuối nước không',
            'gieng co nguy hiem khong',
            'chơi gần giếng có sao không'
        ],
        response: "**Giếng nước là nơi rất nguy hiểm nếu không được che chắn cẩn thận.**\n\n" +
                  "Nếu giếng không có nắp đậy chắc chắn hoặc thành giếng thấp, trẻ em có thể bị trượt chân và rơi xuống.\n\n" +
                  "Vì vậy, giếng cần có nắp đậy an toàn và người lớn phải kiểm tra thường xuyên. Em không nên chơi đùa, chạy nhảy hoặc đứng sát miệng giếng."
    },

    {
        id: "water_container_risk",
        keywords: [
            'xô nước có nguy hiểm không',
            'chậu nước có nguy hiểm không',
            'chum nước có gây đuối nước không',
            'xo nuoc co nguy hiem khong',
            'ít nước có bị đuối nước không'
        ],
        response: "**Có. Những vật chứa ít nước vẫn có thể gây nguy hiểm.**\n\n" +
                  "Xô, chậu, chum, vại, bể nước hoặc các dụng cụ chứa nước trong gia đình đều có thể gây đuối nước, đặc biệt với trẻ nhỏ.\n\n" +
                  "Khi không sử dụng, người lớn nên đổ hết nước, đậy nắp hoặc đặt các vật chứa nước ở nơi trẻ em không thể tự tiếp cận.\n\n" +
                  "Em cũng không nên nghịch nước hoặc cúi đầu vào các vật chứa nước."
    },

    {
        id: "swimming_pool_risk",
        keywords: [
            'bể bơi có nguy hiểm không',
            'hồ bơi có an toàn không',
            'be boi co nguy hiem khong',
            'bể bơi có bị đuối nước không'
        ],
        response: "**Bể bơi thường an toàn hơn ao, hồ hoặc sông, nhưng vẫn có thể xảy ra đuối nước.**\n\n" +
                  "Nguy hiểm có thể xảy ra khi bể đông người, trẻ em tự ý xuống nước, chạy nhảy quanh thành bể, bơi quá sức hoặc không có người lớn và nhân viên cứu hộ giám sát.\n\n" +
                  "Khi đi bơi, em cần tuân theo hướng dẫn của giáo viên, người lớn hoặc nhân viên cứu hộ và tuyệt đối không tự ý xuống bể."
    },

    {
        id: "sea_risk",
        keywords: [
            'biển có nguy hiểm không',
            'tắm biển có nguy hiểm không',
            'bien co nguy hiem khong',
            'tắm biển có bị đuối nước không'
        ],
        response: "**Biển có nhiều nguy cơ mà trẻ em cần đặc biệt chú ý.**\n\n" +
                  "Biển có sóng, thủy triều và các dòng nước mạnh. Có những khu vực nhìn rất yên nhưng lại có dòng nước kéo người ra xa bờ.\n\n" +
                  "Khi đi biển, em chỉ nên tắm ở khu vực được phép, có người lớn đi cùng và có nhân viên cứu hộ. Không tự ý bơi ra xa bờ và không xuống nước khi sóng lớn hoặc thời tiết xấu."
    },

    {
        id: "flood_water_risk",
        keywords: [
            'nước lũ có nguy hiểm không',
            'nước ngập có nguy hiểm không',
            'nuoc lu co nguy hiem khong',
            'đi qua nước lũ có sao không'
        ],
        response: "**Nước lũ và nước ngập rất nguy hiểm.**\n\n" +
                  "Nước lũ có thể chảy rất mạnh, che khuất hố sâu, cống, vật sắc nhọn hoặc dây điện. Dòng nước mạnh còn có thể cuốn người đi rất nhanh.\n\n" +
                  "Vì vậy, em không được tự ý đi qua vùng nước lũ hoặc nước ngập. Nếu gặp nước lũ trên đường, hãy tìm nơi an toàn và nhờ người lớn giúp đỡ."
    },

    {
        id: "construction_water_hole",
        keywords: [
            'hố nước có nguy hiểm không',
            'hố công trình có nguy hiểm không',
            'ho nuoc co nguy hiem khong',
            'hố đào có nước có được chơi không'
        ],
        response: "**Hố công trình hoặc hố chứa nước có thể rất nguy hiểm.**\n\n" +
                  "Những hố này có thể rất sâu, bờ đất dễ trơn hoặc sạt xuống. Nhiều nơi còn không có hàng rào hoặc biển cảnh báo.\n\n" +
                  "Em không nên đứng gần mép hố, chơi đùa hoặc xuống lấy đồ vật bị rơi vào đó. Nếu thấy một khu vực nguy hiểm chưa được che chắn, hãy báo cho người lớn."
    },

    {
        id: "quiet_water_not_safe",
        keywords: [
            'nước yên có an toàn không',
            'chỗ nước lặng có an toàn không',
            'nuoc yen co an toan khong',
            'nước không có sóng có nguy hiểm không'
        ],
        response: "**Nước nhìn yên không có nghĩa là an toàn.**\n\n" +
                  "Dưới mặt nước có thể có chỗ rất sâu, dòng chảy mạnh, bùn lầy, vật sắc nhọn hoặc những nguy hiểm mà mắt thường không nhìn thấy được.\n\n" +
                  "Đặc biệt ở biển, một số vùng nước lặng còn có thể là nơi xuất hiện dòng chảy kéo người ra xa bờ.\n\n" +
                  "Vì vậy, em không nên tự đánh giá một nơi là an toàn chỉ vì thấy mặt nước yên."
    },

    {
        id: "drowning_is_silent",
        keywords: [
            'đuối nước có kêu cứu được không',
            'người đuối nước có la hét không',
            'duoi nuoc co keu cuu duoc khong',
            'đuối nước có xảy ra nhanh không'
        ],
        response: "**Đuối nước có thể xảy ra rất nhanh và đôi khi rất âm thầm.**\n\n" +
                  "Người gặp nạn dưới nước có thể không đủ sức để kêu cứu lớn hoặc vẫy tay như chúng ta thường nghĩ.\n\n" +
                  "Vì vậy, trẻ em cần luôn có người lớn giám sát khi ở gần nước. Nếu em thấy một bạn có biểu hiện bất thường dưới nước, hãy gọi người lớn hoặc nhân viên cứu hộ ngay."
    },
       
        {
        id: "drowning_causes_general",
        keywords: [
            'nguyên nhân gây đuối nước',
            'tại sao trẻ em bị đuối nước',
            'tai sao bi duoi nuoc',
            'vì sao xảy ra đuối nước',
            'những nguyên nhân nào gây đuối nước'
        ],
        response: "**Vì sao trẻ em có thể bị đuối nước?**\n\n" +
                  "Đuối nước có thể xảy ra do nhiều nguyên nhân khác nhau, chẳng hạn như:\n\n" +
                  "1. **Chưa nhận biết được nguy hiểm:** Trẻ em thường hiếu động, tò mò, thích khám phá nhưng chưa có nhiều kinh nghiệm để nhận biết nơi nào an toàn hoặc nguy hiểm.\n" +
                  "2. **Thiếu kỹ năng an toàn:** Chưa biết bơi, chưa biết cách tự cứu hoặc không biết phải làm gì khi gặp sự cố dưới nước.\n" +
                  "3. **Không có người lớn giám sát:** Tự chơi gần ao, hồ, sông, suối hoặc tự đi bơi khi không có người lớn đi cùng.\n" +
                  "4. **Môi trường không an toàn:** Ao, hồ, giếng, hố nước không có rào chắn hoặc biển cảnh báo.\n" +
                  "5. **Thời tiết, thiên tai:** Mưa lớn, lũ lụt, dòng nước chảy xiết hoặc nước dâng bất ngờ cũng có thể gây nguy hiểm.\n\n" +
                  "Vì vậy, em cần học cách nhận biết nguy hiểm và luôn tuân thủ các quy tắc an toàn khi ở gần nước."
    },

    {
        id: "children_curious_water_risk",
        keywords: [
            'vì sao trẻ em dễ bị đuối nước',
            'tại sao học sinh dễ gặp nguy hiểm dưới nước',
            'tre em de bi duoi nuoc vi sao',
            'trẻ hiếu động có dễ bị đuối nước không'
        ],
        response: "**Trẻ em dễ gặp nguy hiểm dưới nước vì còn hiếu động và chưa có nhiều kinh nghiệm.**\n\n" +
                  "Ở lứa tuổi tiểu học, các em thường thích chạy nhảy, khám phá, chơi cùng bạn bè và đôi khi muốn thử những điều mới lạ.\n\n" +
                  "Nhưng vì chưa nhận biết hết các nguy hiểm như nước sâu, đáy trơn, dòng chảy mạnh hoặc hố nước bất ngờ nên trẻ em có thể gặp tai nạn nếu chủ quan.\n\n" +
                  "Vì vậy, em không nên thử những trò mạo hiểm gần nước và cần hỏi người lớn trước khi tham gia các hoạt động dưới nước."
    },

    {
        id: "lack_water_safety_knowledge",
        keywords: [
            'thiếu kỹ năng có dễ bị đuối nước không',
            'không biết kỹ năng an toàn dưới nước',
            'thieu ky nang duoi nuoc',
            'vì sao cần học kỹ năng phòng chống đuối nước'
        ],
        response: "**Thiếu kiến thức và kỹ năng an toàn làm nguy cơ đuối nước tăng lên.**\n\n" +
                  "Nếu một người không biết nhận ra vùng nước sâu, dòng chảy mạnh hoặc nơi nguy hiểm thì rất dễ đưa ra quyết định sai, chẳng hạn như tự ý xuống nước hoặc bơi ở nơi không an toàn.\n\n" +
                  "Ngoài việc biết bơi, chúng ta còn cần biết cách giữ bình tĩnh, tự nổi, gọi trợ giúp và cách xử lý khi gặp tình huống bất ngờ.\n\n" +
                  "Vì vậy, học bơi thôi chưa đủ, em còn cần học các kỹ năng an toàn trong môi trường nước."
    },

    {
        id: "no_adult_supervision_risk",
        keywords: [
            'không có người lớn có nguy hiểm không',
            'vì sao cần người lớn trông khi bơi',
            'khong co nguoi lon giam sat',
            'đi bơi không có người lớn được không'
        ],
        response: "**Không có người lớn giám sát sẽ làm nguy cơ tai nạn tăng lên.**\n\n" +
                  "Khi xảy ra sự cố như trượt chân, chuột rút, sặc nước hoặc bị dòng nước cuốn, trẻ em có thể không đủ khả năng tự xử lý.\n\n" +
                  "Người lớn có thể phát hiện nguy hiểm sớm, nhắc nhở em tránh xa nơi không an toàn và kịp thời gọi cứu hộ khi cần.\n\n" +
                  "Vì vậy, em không nên tự ý đi bơi, tắm sông, tắm hồ hoặc chơi gần vùng nước khi không có người lớn đáng tin cậy đi cùng."
    },

    {
        id: "environment_safety_risk",
        keywords: [
            'môi trường nước không an toàn là gì',
            'noi co nuoc khong an toan',
            'vì sao ao hồ không có rào nguy hiểm',
            'không có biển cảnh báo có nguy hiểm không'
        ],
        response: "**Môi trường nước không an toàn là nơi có nguy cơ gây tai nạn nhưng chưa được che chắn hoặc cảnh báo đầy đủ.**\n\n" +
                  "Ví dụ như giếng không có nắp, ao không có hàng rào, hố nước không có biển cảnh báo, bể bơi không có người giám sát hoặc phương tiện đường thủy không có đủ áo phao.\n\n" +
                  "Ở những nơi này, chỉ một chút bất cẩn cũng có thể dẫn đến tai nạn.\n\n" +
                  "Nếu em phát hiện một nơi nguy hiểm, hãy tránh xa và báo ngay cho cha mẹ, thầy cô hoặc người lớn."
    },

    {
        id: "natural_disaster_drowning_risk",
        keywords: [
            'mưa lũ gây đuối nước như thế nào',
            'thiên tai có gây đuối nước không',
            'mua lu gay duoi nuoc',
            'vì sao lũ lụt nguy hiểm với trẻ em'
        ],
        response: "**Mưa lớn và lũ lụt có thể làm nguy cơ đuối nước tăng rất cao.**\n\n" +
                  "Khi mưa lớn, nước có thể dâng nhanh, dòng chảy mạnh hơn và xuất hiện những vùng nước xoáy hoặc chảy xiết.\n\n" +
                  "Nước lũ còn có thể che khuất hố sâu, cống thoát nước hoặc những vật nguy hiểm ở dưới chân.\n\n" +
                  "Vì vậy, khi có mưa lớn hoặc lũ, em không được tự ý đi qua vùng nước ngập và phải làm theo hướng dẫn của người lớn."
    },

    {
        id: "go_swimming_without_permission",
        keywords: [
            'tự ý đi bơi có được không',
            'không xin phép bố mẹ đi bơi',
            'tu y di boi',
            'đi tắm sông mà không báo bố mẹ',
            'đi bơi không nói với gia đình'
        ],
        response: "**Em không nên tự ý đi bơi mà không báo cho gia đình.**\n\n" +
                  "Nếu người lớn không biết em đang ở đâu thì khi xảy ra sự cố sẽ rất khó hỗ trợ kịp thời.\n\n" +
                  "Trước khi đi bơi, em cần báo cho bố mẹ hoặc người chăm sóc biết mình đi đâu, đi với ai và chỉ tham gia khi có người lớn phù hợp giám sát.\n\n" +
                  "Đặc biệt, không được tự rủ nhau đi tắm sông, ao hoặc hồ khi không có người lớn đi cùng."
    },

    {
        id: "friends_invite_river_swimming",
        keywords: [
            'bạn rủ đi tắm sông có nên đi không',
            'bạn rủ đi tắm hồ',
            'ban ru di tam song',
            'rủ nhau đi bơi có nguy hiểm không',
            'bạn bè rủ đi tắm ao'
        ],
        response: "**Nếu bạn rủ em tự đi tắm sông, hồ hoặc ao thì em nên từ chối.**\n\n" +
                  "Sông, hồ và ao có thể có chỗ sâu bất ngờ, đáy trơn, bùn lầy, dòng nước mạnh hoặc vùng nước xoáy mà các em không nhận ra.\n\n" +
                  "Ngay cả khi trong nhóm có bạn biết bơi thì điều đó cũng không bảo đảm an toàn cho tất cả mọi người.\n\n" +
                  "Em hãy rủ các bạn chọn trò chơi ở nơi an toàn và chỉ đi bơi khi có người lớn giám sát."
    },

    {
        id: "swimming_alone_danger",
        keywords: [
            'bơi một mình có nguy hiểm không',
            'có nên bơi một mình',
            'boi mot minh co sao khong',
            'đi bơi một mình được không'
        ],
        response: "**Không nên bơi một mình.**\n\n" +
                  "Nếu em bất ngờ bị mệt, chuột rút, sặc nước hoặc gặp dòng nước mạnh thì sẽ không có ai ở gần để phát hiện và gọi trợ giúp.\n\n" +
                  "Em chỉ nên bơi tại nơi an toàn, có người lớn giám sát và có người phụ trách cứu hộ khi cần.\n\n" +
                  "Hãy nhớ: biết bơi không có nghĩa là có thể bơi một mình."
    },

    {
        id: "diving_headfirst_risk",
        keywords: [
            'nhảy cắm đầu có nguy hiểm không',
            'có được nhảy cắm đầu xuống nước không',
            'nhay cam dau xuong nuoc',
            'lao đầu xuống nước có sao không'
        ],
        response: "**Nhảy cắm đầu xuống nước ở nơi chưa biết rõ độ sâu rất nguy hiểm.**\n\n" +
                  "Nếu nước quá nông hoặc bên dưới có đá, cành cây, vật cứng hay vật sắc nhọn, đầu và cổ của em có thể bị va đập và bị thương nặng.\n\n" +
                  "Vì vậy, em không được tự ý nhảy cắm đầu xuống ao, hồ, sông hoặc những nơi không có hướng dẫn an toàn.\n\n" +
                  "Ở bể bơi, chỉ thực hiện động tác xuống nước theo đúng hướng dẫn của giáo viên hoặc người phụ trách."
    },

    {
        id: "swimming_race_risk",
        keywords: [
            'bơi thi có nguy hiểm không',
            'thi bơi với bạn có sao không',
            'boi thi voi ban',
            'thách nhau bơi xa có nguy hiểm không'
        ],
        response: "**Không nên tự tổ chức bơi thi hoặc thách nhau bơi xa.**\n\n" +
                  "Khi cố thắng bạn, em có thể bơi quá sức, mệt nhanh hoặc đi vào khu vực nước sâu, nước mạnh mà không để ý.\n\n" +
                  "Nếu muốn thi bơi, hãy tham gia hoạt động có giáo viên, huấn luyện viên hoặc người phụ trách tổ chức tại nơi an toàn.\n\n" +
                  "An toàn quan trọng hơn việc thắng hay thua."
    },

    {
        id: "swimming_at_night_risk",
        keywords: [
            'bơi ban đêm có nguy hiểm không',
            'trời tối có được đi bơi không',
            'boi ban dem',
            'tắm sông buổi tối được không'
        ],
        response: "**Không nên bơi khi trời tối.**\n\n" +
                  "Buổi tối, chúng ta khó quan sát độ sâu, vật cản, dòng nước hoặc những thay đổi bất thường ở khu vực xung quanh.\n\n" +
                  "Nếu xảy ra sự cố, người trên bờ cũng khó nhìn thấy để hỗ trợ em.\n\n" +
                  "Vì vậy, em chỉ nên bơi trong thời gian và khu vực được cho phép, có đủ ánh sáng và có người lớn giám sát."
    },

    {
        id: "swimming_during_storm",
        keywords: [
            'mưa có được đi bơi không',
            'sấm chớp có được bơi không',
            'boi khi troi mua',
            'giông sét có được xuống nước không',
            'trời sắp mưa có nên đi bơi'
        ],
        response: "**Không được bơi khi trời đang mưa, có giông, sấm chớp hoặc thời tiết sắp chuyển xấu.**\n\n" +
                  "Mưa có thể làm nước dâng nhanh và dòng chảy thay đổi. Giông, gió lớn và sấm sét cũng làm môi trường nước trở nên rất nguy hiểm.\n\n" +
                  "Nếu em đang ở dưới nước mà thời tiết xấu đi, hãy nghe hướng dẫn của người lớn và rời khỏi khu vực nước càng sớm càng tốt."
    },

    {
        id: "no_warmup_before_swimming",
        keywords: [
            'không khởi động trước khi bơi có sao không',
            'cần khởi động trước khi bơi không',
            'khong khoi dong truoc khi boi',
            'vì sao phải khởi động trước khi xuống nước'
        ],
        response: "**Em nên khởi động kỹ trước khi xuống nước.**\n\n" +
                  "Khởi động giúp cơ thể làm quen với vận động và chuẩn bị cơ bắp, khớp trước khi bơi.\n\n" +
                  "Nếu xuống nước khi chưa khởi động hoặc vừa vận động quá sức, em có thể dễ bị mệt, chuột rút hoặc chấn thương.\n\n" +
                  "Hãy thực hiện các động tác khởi động theo hướng dẫn của giáo viên hoặc người phụ trách trước khi xuống bơi."
    },

    {
        id: "swimming_when_tired",
        keywords: [
            'mệt có được đi bơi không',
            'đang mệt có nên xuống nước không',
            'met co nen boi khong',
            'vừa vận động mệt có được bơi không'
        ],
        response: "**Khi cơ thể đang mệt, em không nên xuống nước.**\n\n" +
                  "Lúc mệt, sức lực của em giảm và cơ thể sẽ khó xử lý nếu xảy ra tình huống bất ngờ.\n\n" +
                  "Bơi khi quá mệt còn có thể làm em nhanh đuối sức hoặc bị chuột rút.\n\n" +
                  "Em hãy nghỉ ngơi cho khỏe và chỉ xuống nước khi cơ thể ở trạng thái tốt, đồng thời phải có người lớn giám sát."
    },

    {
        id: "swimming_when_cold",
        keywords: [
            'lạnh có nên tiếp tục bơi không',
            'đang bơi thấy lạnh phải làm gì',
            'boi thay lanh',
            'rét khi đang bơi có nguy hiểm không'
        ],
        response: "**Nếu đang bơi mà cảm thấy lạnh, run hoặc mệt, em nên ra khỏi nước.**\n\n" +
                  "Đó có thể là dấu hiệu cơ thể đang mất sức. Nếu cố tiếp tục bơi, em sẽ ngày càng mệt và khó giữ an toàn.\n\n" +
                  "Hãy bình tĩnh, báo cho người lớn hoặc nhân viên cứu hộ và từ từ di chuyển đến nơi an toàn."
    },

    {
        id: "eating_while_swimming",
        keywords: [
            'đang bơi có được ăn không',
            'ăn uống khi đang bơi',
            'an khi dang boi',
            'vừa bơi vừa ăn có sao không'
        ],
        response: "**Không nên ăn uống trong lúc đang bơi.**\n\n" +
                  "Việc vừa ăn vừa hoạt động dưới nước có thể làm em mất tập trung và dễ bị sặc.\n\n" +
                  "Khi cần ăn hoặc uống, em nên ra khỏi nước, nghỉ ngơi ở nơi an toàn rồi mới ăn uống."
    },

    {
        id: "swimming_after_full_meal",
        keywords: [
            'ăn no có được đi bơi không',
            'vừa ăn xong có nên bơi không',
            'an no roi di boi',
            'ăn cơm xong xuống nước được không'
        ],
        response: "**Không nên xuống nước ngay sau khi vừa ăn quá no.**\n\n" +
                  "Sau khi ăn no, cơ thể đang cần thời gian để tiêu hóa thức ăn. Nếu vận động mạnh ngay, em có thể thấy khó chịu, buồn nôn, mệt hoặc chuột rút.\n\n" +
                  "Em nên nghỉ ngơi và chỉ đi bơi khi cơ thể cảm thấy thoải mái, đồng thời làm theo hướng dẫn của người lớn."
    },

    {
        id: "playing_near_water_edge",
        keywords: [
            'chơi sát mép ao có nguy hiểm không',
            'chạy nhảy gần hồ có sao không',
            'choi gan mep ao',
            'đùa nghịch cạnh sông có nguy hiểm không'
        ],
        response: "**Chạy nhảy hoặc đùa nghịch sát mép nước rất nguy hiểm.**\n\n" +
                  "Bờ ao, hồ hoặc sông có thể trơn, mềm hoặc bị sạt. Em có thể trượt chân và rơi xuống nước chỉ trong vài giây.\n\n" +
                  "Vì vậy, hãy giữ khoảng cách an toàn với mép nước và chọn nơi khác để chạy nhảy, chơi đùa."
    },

    {
        id: "retrieve_ball_from_water",
        keywords: [
            'bóng rơi xuống sông có nên xuống lấy không',
            'đồ chơi rơi xuống ao phải làm gì',
            'bong roi xuong nuoc',
            'có nên xuống hồ lấy đồ không'
        ],
        response: "**Nếu bóng hoặc đồ chơi rơi xuống ao, hồ, sông thì em không được tự xuống lấy.**\n\n" +
                  "Một món đồ không quan trọng bằng sự an toàn của em. Khu vực đó có thể sâu, trơn hoặc có dòng nước nguy hiểm mà em không nhìn thấy.\n\n" +
                  "Hãy gọi người lớn và đứng ở nơi an toàn. Không cúi sát mép nước hoặc cố với tay để lấy đồ."
    },

    {
        id: "showing_off_swimming",
        keywords: [
            'bơi giỏi có được thể hiện không',
            'thách bạn bơi xa',
            'khoe bơi giỏi có nguy hiểm không',
            'thich the hien khi boi'
        ],
        response: "**Không nên thể hiện bằng những hành động mạo hiểm dưới nước.**\n\n" +
                  "Biết bơi giỏi không có nghĩa là em không thể gặp nguy hiểm. Dòng nước mạnh, chuột rút, mệt hoặc vật cản dưới nước vẫn có thể xảy ra bất ngờ.\n\n" +
                  "Em hãy bơi đúng khu vực, đúng khả năng của mình và luôn tuân thủ hướng dẫn an toàn."
    },

    {
        id: "known_swimmer_overconfidence",
        keywords: [
            'biết bơi rồi có cần cẩn thận không',
            'bơi giỏi có cần người lớn không',
            'biet boi roi co can giam sat',
            'bơi giỏi có bị tai nạn không'
        ],
        response: "**Biết bơi vẫn phải luôn cẩn thận.**\n\n" +
                  "Có những trường hợp trẻ biết bơi nhưng vẫn gặp đuối nước vì chủ quan, bơi ở nơi lạ, gặp nước xoáy, dòng chảy mạnh hoặc không biết kỹ năng tự cứu.\n\n" +
                  "Biết bơi là một kỹ năng rất tốt, nhưng muốn an toàn em còn cần biết nhận diện nguy hiểm, giữ bình tĩnh và tuân thủ các quy tắc phòng tránh đuối nước.\n\n" +
                  "Đừng bao giờ nghĩ rằng mình bơi giỏi nên có thể xuống nước ở bất cứ đâu."
    },
 {
        id: "safe_place_to_swim",
        keywords: [
            'nên bơi ở đâu',
            'chỗ nào an toàn để bơi',
            'boi o dau an toan',
            'nơi nào được phép bơi',
            'đi bơi ở đâu thì an toàn'
        ],
        response: "**Em nên bơi ở nơi được phép và có người quản lý an toàn.**\n\n" +
                  "Ví dụ như bể bơi có giáo viên hoặc nhân viên cứu hộ, khu vực tắm được phép hoạt động và có biển chỉ dẫn rõ ràng.\n\n" +
                  "Không nên tự ý bơi ở ao, hồ, sông, suối hoặc những vùng nước lạ vì độ sâu, dòng chảy và các vật dưới nước có thể rất khó nhận biết.\n\n" +
                  "Trước khi xuống nước, hãy nghe hướng dẫn của người lớn."
    },

    {
        id: "unsafe_place_to_swim",
        keywords: [
            'không được bơi ở đâu',
            'nơi nào không được xuống nước',
            'khong nen boi o dau',
            'chỗ nào cấm bơi',
            'những nơi không nên tắm'
        ],
        response: "**Em không nên bơi ở những nơi có nguy cơ cao.**\n\n" +
                  "Đó là nơi nước sâu, chảy xiết, có xoáy nước, khu vực có biển cấm, hố nước, công trình đang thi công hoặc nơi không có người quản lý.\n\n" +
                  "Em cũng không nên tự ý xuống ao, hồ, sông, suối, đập hoặc những vùng nước mà mình không biết rõ.\n\n" +
                  "Nếu không chắc nơi đó có an toàn hay không, hãy coi đó là nơi nguy hiểm và hỏi người lớn."
    },

    {
        id: "obey_water_warning_signs",
        keywords: [
            'biển cấm bơi có được xuống không',
            'biển cảnh báo nguy hiểm là gì',
            'gap bien cam boi phai lam gi',
            'có biển cấm tắm thì sao',
            'phải làm gì khi thấy biển cảnh báo nước sâu'
        ],
        response: "**Khi thấy biển cấm hoặc biển cảnh báo nguy hiểm, em phải tuân thủ và không xuống nước.**\n\n" +
                  "Biển cảnh báo thường được đặt ở những nơi có nước sâu, dòng chảy mạnh, nước xoáy hoặc có nguy cơ xảy ra tai nạn.\n\n" +
                  "Không được vượt qua hàng rào, dây chắn hoặc thử xuống nước chỉ vì thấy người khác đang ở đó.\n\n" +
                  "Nếu chưa hiểu biển báo có ý nghĩa gì, hãy hỏi người lớn."
    },

    {
        id: "stay_away_from_open_water",
        keywords: [
            'có nên chơi gần ao hồ không',
            'có được chơi gần sông suối không',
            'choi gan ao ho duoc khong',
            'ở gần vùng nước phải làm gì'
        ],
        response: "**Khi ở gần ao, hồ, sông, suối, em cần luôn giữ khoảng cách an toàn.**\n\n" +
                  "Không chạy nhảy sát mép nước, không xô đẩy nhau và không cúi người ra quá xa để lấy đồ vật.\n\n" +
                  "Bờ đất có thể trơn hoặc bị sạt bất ngờ khiến em rơi xuống nước.\n\n" +
                  "Tốt nhất hãy chọn nơi vui chơi cách xa vùng nước và có người lớn ở gần."
    },

    {
        id: "do_not_invite_friends_swimming",
        keywords: [
            'có được rủ bạn đi tắm không',
            'rủ bạn đi bơi không có người lớn',
            'ru ban di tam song',
            'nghỉ hè rủ nhau đi bơi được không'
        ],
        response: "**Không nên tự rủ nhau đi tắm hoặc đi bơi khi không có người lớn đi cùng.**\n\n" +
                  "Một nhóm bạn có thể nghĩ rằng đông người sẽ an toàn hơn, nhưng khi xảy ra sự cố các em thường chưa có đủ kỹ năng để cứu nhau đúng cách.\n\n" +
                  "Đặc biệt trong dịp nghỉ hè hoặc sau khi tan học, không được tự ý ra ao, hồ, sông, suối để tắm hoặc vui chơi.\n\n" +
                  "Hãy báo cho gia đình và chỉ đi bơi khi có người lớn giám sát."
    },

    {
        id: "tell_family_before_swimming",
        keywords: [
            'đi bơi có cần báo bố mẹ không',
            'đi chơi gần nước có cần nói gia đình',
            'di boi co can bao gia dinh',
            'phải báo ai trước khi đi bơi'
        ],
        response: "**Có. Trước khi đi bơi hoặc đến nơi có nước, em cần báo cho bố mẹ hoặc người chăm sóc biết.**\n\n" +
                  "Hãy nói rõ em đi đâu, đi với ai và khi nào về.\n\n" +
                  "Việc này giúp gia đình biết em đang ở đâu và có thể hỗ trợ nhanh nếu xảy ra tình huống bất ngờ.\n\n" +
                  "Không được tự ý bỏ đi bơi mà người lớn không biết."
    },

    {
        id: "stop_swimming_when_tired",
        keywords: [
            'đang bơi mệt thì phải làm gì',
            'bơi thấy đuối sức phải làm sao',
            'dang boi bi met phai lam gi',
            'mệt khi đang ở dưới nước'
        ],
        response: "**Nếu đang bơi mà thấy mệt, lạnh hoặc đuối sức, em cần dừng lại và tìm cách ra khỏi nước.**\n\n" +
                  "Hãy cố gắng giữ bình tĩnh, bám vào thành bể, dây phao hoặc vật chắc chắn nếu ở gần.\n\n" +
                  "Nếu đã được học kỹ năng nổi ngửa, em có thể dùng kỹ năng này để nghỉ và giữ sức trong lúc chờ hỗ trợ.\n\n" +
                  "Hãy gọi người lớn hoặc nhân viên cứu hộ và tuyệt đối không cố tiếp tục bơi khi cơ thể đã mệt."
    },

    {
        id: "do_not_swim_in_deep_fast_water",
        keywords: [
            'nước sâu có được bơi không',
            'nước chảy xiết có được tắm không',
            'nuoc chay xiet co duoc boi',
            'nước xoáy có được xuống không',
            'có người lớn thì được bơi chỗ nước sâu không'
        ],
        response: "**Không. Trẻ em không được bơi ở nơi nước sâu, chảy xiết hoặc có xoáy nước.**\n\n" +
                  "Những vùng nước này có thể làm em mất sức rất nhanh hoặc cuốn em khỏi vị trí an toàn.\n\n" +
                  "Ngay cả khi có người lớn ở gần hoặc em biết bơi, các khu vực nước sâu, chảy xiết và nước xoáy vẫn rất nguy hiểm.\n\n" +
                  "Hãy tránh xa và lựa chọn nơi bơi được phép."
    },

    {
        id: "wear_proper_swim_clothes",
        keywords: [
            'đi bơi nên mặc gì',
            'quần áo khi bơi thế nào',
            'mac gi khi di boi',
            'trang phục đi bơi'
        ],
        response: "**Khi đi bơi, em nên mặc trang phục gọn gàng và phù hợp.**\n\n" +
                  "Quần áo quá rộng, quá dài hoặc có nhiều dây có thể gây vướng khi vận động dưới nước.\n\n" +
                  "Nếu người lớn hoặc nơi tổ chức yêu cầu sử dụng áo phao hoặc dụng cụ hỗ trợ nổi, em cần mặc đúng cách và đúng kích cỡ.\n\n" +
                  "Trước khi xuống nước, hãy kiểm tra lại trang phục và làm theo hướng dẫn của người phụ trách."
    },

    {
        id: "follow_swimming_teacher",
        keywords: [
            'học bơi phải nghe ai',
            'đi học bơi cần làm gì',
            'hoc boi can tuan thu gi',
            'có được tự tập bơi không'
        ],
        response: "**Khi học bơi, em cần làm đúng hướng dẫn của giáo viên hoặc người phụ trách.**\n\n" +
                  "Không tự ý xuống nước trước khi được cho phép, không chuyển sang khu vực khác và không thực hiện động tác mà mình chưa được hướng dẫn.\n\n" +
                  "Lớp học bơi an toàn cần có người quản lý, người hướng dẫn và phương tiện cứu hộ cần thiết.\n\n" +
                  "Học đúng cách giúp em vừa tiến bộ vừa bảo vệ được bản thân."
    },

    {
        id: "do_not_push_friends_into_water",
        keywords: [
            'có được đẩy bạn xuống nước không',
            'xô bạn xuống hồ có sao không',
            'day ban xuong nuoc',
            'đùa đẩy nhau ở bể bơi'
        ],
        response: "**Tuyệt đối không xô, đẩy hoặc kéo bạn xuống nước để đùa.**\n\n" +
                  "Bạn có thể chưa biết bơi, bị bất ngờ, sặc nước hoặc va vào thành bể và bị thương.\n\n" +
                  "Ở khu vực bể bơi và gần nước, em cần giữ trật tự, không chạy nhảy, xô đẩy hay chơi những trò khiến người khác mất thăng bằng.\n\n" +
                  "Một trò đùa dưới nước có thể trở thành tai nạn rất nhanh."
    },

    {
        id: "do_not_cross_water_barriers",
        keywords: [
            'có được trèo qua rào ao hồ không',
            'vượt rào xuống nước được không',
            'treo qua hang rao ho boi',
            'qua dây chắn xuống tắm'
        ],
        response: "**Không được trèo qua hàng rào, dây chắn hoặc khu vực đã được ngăn lại quanh nơi có nước.**\n\n" +
                  "Những rào chắn này được đặt để ngăn mọi người đến gần khu vực nguy hiểm như ao sâu, hố nước hoặc nơi chưa bảo đảm an toàn.\n\n" +
                  "Nếu đồ vật của em rơi vào phía bên kia, hãy nhờ người lớn giúp thay vì tự trèo qua."
    },

    {
        id: "report_water_hazard_to_adult",
        keywords: [
            'thấy hố nước nguy hiểm phải làm gì',
            'thấy giếng không có nắp phải làm sao',
            'bao nguoi lon khi thay noi nguy hiem',
            'thấy ao không có rào chắn'
        ],
        response: "**Nếu phát hiện nơi có nguy cơ đuối nước, em nên báo cho người lớn.**\n\n" +
                  "Ví dụ như giếng không có nắp, ao không có rào chắn, hố nước sâu, cống bị mất nắp hoặc biển cảnh báo bị hỏng.\n\n" +
                  "Em không nên tự sửa, tự lại gần kiểm tra hoặc đứng cạnh nơi nguy hiểm.\n\n" +
                  "Hãy báo cho bố mẹ, thầy cô hoặc người lớn có trách nhiệm để họ xử lý an toàn."
    },

    {
        id: "water_safety_what_should_do",
        keywords: [
            'ở gần nước nên làm gì',
            'những việc nên làm để an toàn dưới nước',
            'nen lam gi de an toan khi boi',
            'đi bơi nên làm gì'
        ],
        response: "**Những việc em NÊN làm để an toàn khi ở gần nước:**\n\n" +
                  "✅ Đi cùng và nghe hướng dẫn của người lớn.\n" +
                  "✅ Bơi ở nơi được phép và có người giám sát.\n" +
                  "✅ Khởi động trước khi xuống nước.\n" +
                  "✅ Tuân thủ biển báo, hàng rào và quy định an toàn.\n" +
                  "✅ Ra khỏi nước khi thấy lạnh, mệt hoặc đuối sức.\n" +
                  "✅ Báo cho người lớn khi phát hiện nơi có nguy cơ nguy hiểm.\n\n" +
                  "Biết phòng tránh nguy hiểm là một kỹ năng rất quan trọng để bảo vệ bản thân."
    },

    {
        id: "water_safety_what_not_to_do",
        keywords: [
            'ở gần nước không nên làm gì',
            'những việc không được làm khi đi bơi',
            'khong nen lam gi khi boi',
            'điều cấm khi ở gần ao hồ'
        ],
        response: "**Những việc em KHÔNG NÊN làm khi ở gần nước:**\n\n" +
                  "❌ Không tự ý xuống nước.\n" +
                  "❌ Không bơi một mình.\n" +
                  "❌ Không rủ nhau đi tắm ao, hồ, sông, suối.\n" +
                  "❌ Không chạy nhảy hoặc xô đẩy sát mép nước.\n" +
                  "❌ Không xuống nơi nước sâu, chảy xiết hoặc có xoáy.\n" +
                  "❌ Không bơi khi trời mưa, giông, sét hoặc khi cơ thể đang mệt.\n" +
                  "❌ Không bỏ qua biển cấm và biển cảnh báo.\n\n" +
                  "Hãy nhớ: **thấy nguy hiểm thì tránh xa và gọi người lớn giúp đỡ.**"
    },
{
        id: "home_drowning_risks_general",
        keywords: [
            'trong nhà có những nguy cơ đuối nước nào',
            'nguy cơ đuối nước trong gia đình',
            'o nha co the bi duoi nuoc o dau',
            'những chỗ nguy hiểm có nước trong nhà',
            'ở nhà cần chú ý gì để tránh đuối nước'
        ],
        response: "**Trong gia đình cũng có nhiều nơi có thể gây nguy cơ đuối nước.**\n\n" +
                  "Một số nơi cần đặc biệt chú ý là giếng, bể nước, lu, chum, thùng chứa nước, ao cá, hồ bơi, mương hoặc hố nước quanh nhà.\n\n" +
                  "Với học sinh tiểu học, nguy cơ thường gặp hơn là chơi đùa, bắt cá hoặc đến gần ao, hồ, sông, suối quanh nhà mà không có người lớn giám sát.\n\n" +
                  "Vì vậy, em cần biết những khu vực nguy hiểm quanh nhà và không tự ý đến gần hoặc xuống nước."
    },

    {
        id: "cover_water_containers",
        keywords: [
            'bể nước có cần đậy nắp không',
            'chum nước có cần đậy không',
            'lu nước phải làm sao cho an toàn',
            'be nuoc co can day nap',
            'vật chứa nước có cần che chắn không'
        ],
        response: "**Có. Các dụng cụ chứa nước trong gia đình cần được đậy hoặc che chắn an toàn.**\n\n" +
                  "Giếng, bể nước, lu, chum và các vật chứa nước cần có nắp đậy chắc chắn để trẻ em không thể vô tình ngã vào.\n\n" +
                  "Nắp đậy không nên chỉ đặt hờ mà cần được gài hoặc khóa chắc chắn khi cần thiết.\n\n" +
                  "Nếu em thấy nắp bể hoặc nắp giếng bị mở, không chắc chắn hoặc bị hỏng, hãy tránh xa và báo ngay cho người lớn."
    },

    {
        id: "well_cover_locked",
        keywords: [
            'giếng phải đậy thế nào',
            'nắp giếng cần khóa không',
            'gieng nuoc phai che the nao',
            'giếng không có nắp phải làm gì'
        ],
        response: "**Giếng nước cần được che chắn thật cẩn thận.**\n\n" +
                  "Nắp giếng phải chắc chắn và được gài hoặc khóa để trẻ em không thể tự mở.\n\n" +
                  "Em không nên đứng sát miệng giếng, trèo lên thành giếng hoặc tự mở nắp giếng để nhìn xuống.\n\n" +
                  "Nếu thấy giếng không có nắp hoặc nắp không an toàn, hãy báo cho người lớn ngay."
    },

    {
        id: "bucket_basin_water_at_home",
        keywords: [
            'xô chậu có nước có nguy hiểm không',
            'thau nước có thể gây đuối nước không',
            'xo chau co nuoc co nguy hiem',
            'nước trong xô ít có sao không',
            'ít nước trong chậu có nguy hiểm không'
        ],
        response: "**Xô, chậu hoặc thau có nước vẫn có thể gây nguy hiểm, đặc biệt đối với trẻ nhỏ.**\n\n" +
                  "Khi không sử dụng, người lớn nên đổ hết nước hoặc đặt các vật chứa nước ở nơi trẻ nhỏ không thể tiếp cận.\n\n" +
                  "Em cũng không nên rủ em nhỏ nghịch nước trong xô, chậu hoặc thùng nước khi không có người lớn trông coi.\n\n" +
                  "Hãy nhớ: lượng nước ít không có nghĩa là hoàn toàn an toàn."
    },

    {
        id: "small_water_amount_risk",
        keywords: [
            'nước ít có gây đuối nước không',
            'ít nước có nguy hiểm không',
            'nuoc it co bi duoi nuoc khong',
            'chỉ có một ít nước có sao không'
        ],
        response: "**Có. Một lượng nước nhỏ vẫn có thể gây nguy hiểm, nhất là với trẻ nhỏ.**\n\n" +
                  "Đuối nước có thể xảy ra rất nhanh và đôi khi rất âm thầm.\n\n" +
                  "Vì vậy, các vật chứa nước khi không sử dụng nên được làm rỗng, đặt ngoài tầm với của trẻ nhỏ hoặc che chắn để trẻ không thể tự tiếp cận.\n\n" +
                  "Nếu trong nhà có em nhỏ, em cũng nên nhắc người lớn khi thấy xô, chậu hoặc thùng nước đang để ở nơi không an toàn."
    },

    {
        id: "home_pond_fence",
        keywords: [
            'ao nhà có cần rào không',
            'ao cá cần làm gì để an toàn',
            'ao quanh nha co can rao',
            'nhà có ao phải phòng đuối nước thế nào'
        ],
        response: "**Ao trong hoặc cạnh nhà cần có rào chắn chắc chắn.**\n\n" +
                  "Bờ ao có thể trơn, mềm hoặc bị sạt khiến trẻ em dễ trượt chân rơi xuống nước.\n\n" +
                  "Rào chắn giúp hạn chế trẻ em tự ý đến sát mép ao hoặc xuống nước khi không có người lớn.\n\n" +
                  "Em không nên trèo qua hàng rào để chơi, bắt cá hoặc lấy đồ vật rơi xuống ao."
    },

    {
        id: "home_swimming_pool_fence",
        keywords: [
            'hồ bơi ở nhà có cần rào không',
            'bể bơi gia đình có cần che chắn không',
            'ho boi tai nha can lam gi',
            'nhà có hồ bơi làm sao cho an toàn'
        ],
        response: "**Hồ bơi trong gia đình cũng cần được quản lý và che chắn cẩn thận.**\n\n" +
                  "Nếu có thể, khu vực hồ bơi nên có rào chắn để trẻ em không tự ý tiếp cận khi không có người lớn.\n\n" +
                  "Em không được tự ý xuống hồ bơi chỉ vì hồ ở ngay trong nhà hoặc vì em đã biết bơi.\n\n" +
                  "Mỗi lần xuống nước vẫn cần có người lớn giám sát."
    },

    {
        id: "play_near_home_pond",
        keywords: [
            'chơi gần ao nhà có được không',
            'choi gan ao nha',
            'bắt cá ở ao gần nhà có nguy hiểm không',
            'ra ao sau nhà chơi được không'
        ],
        response: "**Không nên chơi một mình gần ao ở nhà hoặc quanh khu dân cư.**\n\n" +
                  "Học sinh tiểu học có thể gặp nguy hiểm khi chơi đùa, bắt cá, nhặt đồ hoặc chạy sát mép ao.\n\n" +
                  "Chỉ cần trượt chân hoặc bước nhầm vào chỗ sâu là có thể xảy ra tai nạn.\n\n" +
                  "Nếu muốn đến gần ao để tham gia một hoạt động nào đó, em cần có người lớn đi cùng và giám sát."
    },

    {
        id: "catch_fish_near_water",
        keywords: [
            'bắt cá có nguy hiểm không',
            'xuống ao bắt cá được không',
            'bat ca o ao co nguy hiem',
            'bắt cua bắt cá gần sông có sao không'
        ],
        response: "**Bắt cá, bắt cua hoặc nghịch nước ở ao, hồ, sông, suối có thể rất nguy hiểm.**\n\n" +
                  "Bờ nước thường trơn, đáy có thể sâu bất ngờ và em có thể mất thăng bằng khi mải nhìn hoặc cố bắt con vật dưới nước.\n\n" +
                  "Vì vậy, em không nên tự ý xuống ao, hồ hoặc lội ra nước để bắt cá khi không có người lớn hướng dẫn và bảo đảm an toàn."
    },

    {
        id: "home_child_supervision",
        keywords: [
            'trẻ nhỏ gần nước có cần người lớn trông không',
            'vì sao phải trông trẻ khi gần nước',
            'tre nho gan nuoc can giam sat',
            'có được để em nhỏ chơi với nước một mình không'
        ],
        response: "**Trẻ nhỏ cần được người lớn giám sát khi ở gần nước.**\n\n" +
                  "Trẻ nhỏ chưa thể tự nhận biết và xử lý tốt các tình huống nguy hiểm. Vì vậy, không nên để trẻ chơi một mình gần giếng, ao, hồ, bể nước hoặc các nơi có nước.\n\n" +
                  "Người trông trẻ cần thực sự quan sát, không nên mải dùng điện thoại, xem tivi hoặc làm việc khác mà không để ý đến trẻ.\n\n" +
                  "Nếu em thấy một em nhỏ đang chơi một mình gần nước, hãy gọi người lớn đến ngay."
    },

    {
        id: "do_not_leave_small_child_alone_water",
        keywords: [
            'có được để em nhỏ một mình gần nước không',
            'de tre mot minh gan nuoc',
            'em bé nghịch nước một mình có sao không',
            'để trẻ nhỏ tự chơi gần ao được không'
        ],
        response: "**Không. Không nên để trẻ nhỏ một mình ở nơi có nước.**\n\n" +
                  "Trẻ nhỏ có thể trượt chân, ngã vào nước hoặc cúi người quá xa mà không biết cách tự thoát ra.\n\n" +
                  "Đuối nước có thể xảy ra rất nhanh nên sự giám sát của người lớn phải liên tục.\n\n" +
                  "Nếu em đang chơi cùng em nhỏ và thấy nơi đó có nước, hãy gọi người lớn hỗ trợ thay vì tự mình trông coi ở nơi nguy hiểm."
    },

    {
        id: "tell_family_when_leaving_home",
        keywords: [
            'ra khỏi nhà có cần báo bố mẹ không',
            'đi chơi phải nói gì với gia đình',
            'ra ngoai co can bao gia dinh',
            'đi đâu có cần nói cho bố mẹ biết không'
        ],
        response: "**Khi ra khỏi nhà, em nên báo cho gia đình biết rõ mình đi đâu.**\n\n" +
                  "Em cần nói cho bố mẹ hoặc người chăm sóc biết: **đi đâu, làm gì, đi cùng ai và dự kiến trong bao lâu.**\n\n" +
                  "Điều này đặc biệt quan trọng nếu nơi em đến có ao, hồ, sông, suối, hồ bơi hoặc vùng nước mở.\n\n" +
                  "Không nên tự ý đi chơi rồi để gia đình không biết em đang ở đâu."
    },

    {
        id: "tell_family_who_with_how_long",
        keywords: [
            'khi đi chơi cần báo những gì',
            'phải nói gì trước khi ra khỏi nhà',
            'di choi can bao gi',
            'bố mẹ cần biết những gì khi em ra ngoài'
        ],
        response: "**Trước khi ra ngoài, em nên nói cho gia đình 4 điều:**\n\n" +
                  "1. **Em đi đâu.**\n" +
                  "2. **Em đi làm gì.**\n" +
                  "3. **Em đi cùng ai.**\n" +
                  "4. **Em dự kiến đi trong bao lâu hoặc khi nào về.**\n\n" +
                  "Nhờ vậy, gia đình có thể biết nơi em đang ở và hỗ trợ nhanh hơn nếu có vấn đề xảy ra."
    },

    {
        id: "friend_invites_water_place_from_home",
        keywords: [
            'bạn đến rủ ra ao chơi thì sao',
            'bạn rủ ra sông chơi phải làm gì',
            'ban ru ra ao choi',
            'bạn rủ đi tắm khi bố mẹ không biết'
        ],
        response: "**Nếu bạn rủ em đến ao, hồ, sông, suối hoặc đi tắm mà chưa có sự đồng ý của gia đình, em nên từ chối.**\n\n" +
                  "Hãy báo cho bố mẹ hoặc người chăm sóc trước. Không nên nghĩ rằng đi cùng nhiều bạn thì sẽ an toàn.\n\n" +
                  "Nếu muốn đi bơi, hãy chọn nơi được phép và phải có người lớn phù hợp giám sát."
    },

    {
        id: "open_water_near_home",
        keywords: [
            'vùng nước mở gần nhà là gì',
            'những vùng nước mở quanh nhà',
            'vung nuoc mo gan nha',
            'ao hồ kênh mương quanh nhà có nguy hiểm không'
        ],
        response: "**Vùng nước mở là những nơi có nước mà con người có thể tiếp cận như ao, hồ, sông, suối, kênh, mương hoặc hố nước.**\n\n" +
                  "Những nơi này có thể ở rất gần nhà nhưng vẫn tiềm ẩn nguy hiểm, đặc biệt khi không có rào chắn hoặc biển cảnh báo.\n\n" +
                  "Em không nên tự ý đến gần, chơi đùa hoặc xuống nước khi không có người lớn giám sát."
    },

    {
        id: "uncovered_water_tank_action",
        keywords: [
            'thấy bể nước mở nắp phải làm gì',
            'be nuoc mo nap phai lam gi',
            'thấy chum nước không đậy',
            'thấy vật chứa nước không an toàn phải làm sao'
        ],
        response: "**Nếu thấy bể nước, giếng, chum hoặc vật chứa nước đang mở và không an toàn, em không nên tự xử lý nếu có nguy cơ bị ngã.**\n\n" +
                  "Hãy tránh xa khu vực đó và báo ngay cho bố mẹ hoặc người lớn.\n\n" +
                  "Người lớn sẽ kiểm tra, đậy nắp hoặc che chắn đúng cách.\n\n" +
                  "Em cũng nên nhắc các em nhỏ khác không đến gần trong lúc chờ người lớn xử lý."
    },

    {
        id: "broken_pond_fence_action",
        keywords: [
            'thấy hàng rào ao bị hỏng phải làm gì',
            'rao ao bi hong phai lam sao',
            'rào hồ bị đổ thì sao',
            'thấy chỗ chắn ao không an toàn'
        ],
        response: "**Nếu thấy hàng rào quanh ao, hồ hoặc bể bơi bị hỏng, em hãy báo cho người lớn.**\n\n" +
                  "Không nên tự trèo vào khu vực đó để kiểm tra hoặc sửa chữa.\n\n" +
                  "Trong khi chờ xử lý, hãy tránh xa và nhắc các bạn, em nhỏ không đến gần nơi nguy hiểm."
    },

    {
        id: "bathroom_water_safety",
        keywords: [
            'nhà tắm có nguy cơ đuối nước không',
            'phòng tắm có nguy hiểm với trẻ nhỏ không',
            'nha tam co nguy hiem khong',
            'trẻ nhỏ trong nhà tắm cần chú ý gì'
        ],
        response: "**Nhà tắm cũng có thể có nguy cơ đối với trẻ nhỏ nếu có bồn, xô, chậu hoặc vật chứa nước.**\n\n" +
                  "Trẻ nhỏ không nên ở một mình trong khu vực có nước mà không có người lớn quan sát.\n\n" +
                  "Sau khi sử dụng, các vật chứa nước cần được xử lý an toàn và không để trẻ nhỏ tự nghịch nước."
    },

    {
        id: "home_safety_checklist",
        keywords: [
            'làm sao để nhà an toàn phòng đuối nước',
            'cách phòng đuối nước tại gia đình',
            'phong duoi nuoc tai nha',
            'gia đình cần làm gì để phòng đuối nước'
        ],
        response: "**Để phòng tránh đuối nước tại gia đình, cần chú ý:**\n\n" +
                  "✅ Giếng, bể, lu và các vật chứa nước phải được đậy chắc chắn.\n" +
                  "✅ Ao, hồ bơi trong hoặc cạnh nhà cần có rào chắn an toàn.\n" +
                  "✅ Không để trẻ nhỏ tự chơi với nước khi không có người lớn giám sát.\n" +
                  "✅ Nhắc trẻ nhận biết và tránh xa các khu vực có nguy cơ.\n" +
                  "✅ Khi trẻ ra khỏi nhà, gia đình cần biết trẻ đi đâu, làm gì, đi cùng ai và trong bao lâu.\n\n" +
                  "Một môi trường sống an toàn sẽ giúp giảm rất nhiều nguy cơ xảy ra tai nạn đuối nước."
    },

    {
        id: "child_report_home_water_hazard",
        keywords: [
            'em thấy chỗ nguy hiểm ở nhà thì làm gì',
            'thay noi nguy hiem trong nha phai lam sao',
            'phát hiện nguy cơ đuối nước trong nhà',
            'thấy ao giếng nguy hiểm báo ai'
        ],
        response: "**Nếu em phát hiện một nơi có nguy cơ đuối nước trong hoặc quanh nhà, hãy báo cho người lớn.**\n\n" +
                  "Ví dụ: giếng không có nắp, bể nước mở, hàng rào ao bị hỏng, hố nước chưa được che chắn hoặc em nhỏ đang chơi gần nước.\n\n" +
                  "Em không nên tự đến gần để kiểm tra nếu việc đó có thể làm mình gặp nguy hiểm.\n\n" +
                  "Việc tốt nhất là **tránh xa – cảnh báo người khác – báo người lớn.**"
    },
 {
        id: "community_water_risk_general",
        keywords: [
            'nguy hiểm ngoài đường',
            'nơi có nước nguy hiểm',
            'vùng nước nguy hiểm',
            'choi gan nuoc',
            'gần ao hồ',
            'gần sông suối',
            'ngoài đường có nước',
            'nơi dễ đuối nước'
        ],
        response: "**Ngoài cộng đồng có nhiều nơi có thể gây nguy cơ đuối nước.**\n\n" +
                  "Em cần chú ý các khu vực như ao, hồ, sông, suối, kênh, mương, hố công trình, hố lấy đất, hố lấy cát, ao nuôi cá hoặc cống thoát nước.\n\n" +
                  "Nhiều nơi không có hàng rào hoặc biển cảnh báo nên nhìn bên ngoài có thể không thấy nguy hiểm.\n\n" +
                  "Khi gặp những khu vực như vậy, em nên **tránh xa, không chơi đùa và báo cho người lớn nếu thấy mất an toàn**."
    },

    {
        id: "community_pond_risk",
        keywords: [
            'ao công cộng',
            'ao làng',
            'ao sâu',
            'ao không rào',
            'ao khong rao',
            'chơi gần ao',
            'ao có nguy hiểm',
            'bờ ao trơn'
        ],
        response: "**Ao ở khu dân cư có thể rất nguy hiểm nếu không được rào chắn.**\n\n" +
                  "Bờ ao có thể trơn, mềm hoặc sạt xuống. Độ sâu của ao cũng không đều và có thể có bùn lầy ở dưới đáy.\n\n" +
                  "Em không nên chạy nhảy sát mép ao, xuống bắt cá hoặc cố lấy đồ vật rơi xuống nước.\n\n" +
                  "Nếu thấy ao không có rào chắn, hãy giữ khoảng cách và báo cho người lớn."
    },

    {
        id: "river_bank_risk",
        keywords: [
            'gần sông',
            'bờ sông',
            'chơi bờ sông',
            'choi gan song',
            'sông nguy hiểm',
            'đứng sát sông',
            'ra sông chơi'
        ],
        response: "**Bờ sông là nơi cần đặc biệt cẩn thận.**\n\n" +
                  "Dòng nước ở sông có thể mạnh, độ sâu thay đổi và bờ đất có thể trơn hoặc sạt bất ngờ.\n\n" +
                  "Em không nên chạy nhảy, đùa nghịch hoặc đứng sát mép sông.\n\n" +
                  "Nếu muốn tham gia hoạt động gần sông, cần có người lớn quản lý và bảo đảm an toàn."
    },

    {
        id: "canal_ditch_risk",
        keywords: [
            'kênh mương',
            'mương nước',
            'kenh muong',
            'chơi gần mương',
            'mương sâu',
            'kênh nước nguy hiểm',
            'lội mương'
        ],
        response: "**Kênh và mương nước cũng có thể gây đuối nước.**\n\n" +
                  "Một số mương có thành dốc, trơn và nước chảy nhanh nên khi rơi xuống có thể khó trèo lên.\n\n" +
                  "Em không được tự ý lội, nhảy qua hoặc chơi đùa sát mép kênh, mương.\n\n" +
                  "Khi đi qua khu vực này, hãy đi đúng đường và giữ khoảng cách an toàn."
    },

    {
        id: "construction_water_hole_risk",
        keywords: [
            'hố công trình',
            'ho cong trinh',
            'hố nước công trình',
            'hố đào',
            'hố sâu',
            'hố có nước',
            'chơi gần hố'
        ],
        response: "**Hố công trình có nước là khu vực rất nguy hiểm.**\n\n" +
                  "Hố có thể sâu hơn em tưởng, thành hố dễ sạt và nước thường đục nên không nhìn thấy đáy.\n\n" +
                  "Không được xuống chơi, đứng sát mép hoặc nhảy qua hố.\n\n" +
                  "Nếu thấy hố sâu không có rào chắn hay biển cảnh báo, em hãy tránh xa và báo cho người lớn."
    },

    {
        id: "sand_pit_water_risk",
        keywords: [
            'hố lấy cát',
            'ho lay cat',
            'hố cát có nước',
            'khai thác cát',
            'hố cát sâu',
            'bơi hố cát'
        ],
        response: "**Hố lấy cát có thể rất sâu và nguy hiểm.**\n\n" +
                  "Việc đào, khai thác cát có thể tạo ra chỗ nước sâu bất ngờ hoặc vùng nước xoáy.\n\n" +
                  "Em tuyệt đối không được xuống tắm, bơi hoặc chơi quanh các hố lấy cát.\n\n" +
                  "Dù mặt nước nhìn yên, bên dưới vẫn có thể có địa hình rất nguy hiểm."
    },

    {
        id: "soil_pit_water_risk",
        keywords: [
            'hố lấy đất',
            'ho lay dat',
            'hố đất có nước',
            'hố đào đất',
            'hố đất sâu',
            'chơi hố đất'
        ],
        response: "**Hố lấy đất sau khi mưa hoặc để lâu có thể biến thành một vùng nước sâu.**\n\n" +
                  "Bờ hố thường dốc, trơn và có thể sạt khiến người đứng gần bị rơi xuống.\n\n" +
                  "Em không nên chơi, leo trèo hoặc đứng sát mép hố.\n\n" +
                  "Nếu khu vực không có rào chắn, hãy tránh xa và báo người lớn."
    },

    {
        id: "irrigation_water_hole_risk",
        keywords: [
            'hố tưới',
            'hố chứa nước tưới',
            'ho tuoi',
            'nước tưới ruộng',
            'hố nước ruộng',
            'hố tưới cây'
        ],
        response: "**Hố chứa nước để tưới cây hoặc tưới ruộng cũng có thể gây đuối nước.**\n\n" +
                  "Những hố này thường nằm ngoài đồng hoặc vườn, có thể khá sâu và không có rào chắn.\n\n" +
                  "Em không nên đến gần, nghịch nước hoặc xuống lấy đồ khi không có người lớn.\n\n" +
                  "Hãy coi mọi hố nước sâu là khu vực nguy hiểm."
    },

    {
        id: "fish_pond_public_risk",
        keywords: [
            'ao nuôi cá',
            'ao ca',
            'ao cá nguy hiểm',
            'xuống ao cá',
            'bắt cá ao',
            'chơi ao cá'
        ],
        response: "**Ao nuôi cá không phải là nơi vui chơi hoặc bơi lội.**\n\n" +
                  "Ao có thể sâu, bờ trơn và đáy nhiều bùn khiến em rất khó đứng vững nếu rơi xuống.\n\n" +
                  "Không được tự ý xuống ao bắt cá, lội nước hay lấy đồ vật.\n\n" +
                  "Nếu cần làm việc ở ao cá, phải có người lớn hướng dẫn và bảo đảm an toàn."
    },

    {
        id: "open_drain_risk",
        keywords: [
            'cống không nắp',
            'cong khong nap',
            'cống hở',
            'hố ga hở',
            'cống thoát nước',
            'miệng cống',
            'cống nguy hiểm'
        ],
        response: "**Cống hoặc hố ga không có nắp rất nguy hiểm.**\n\n" +
                  "Khi trời mưa hoặc nước ngập, em có thể không nhìn thấy miệng cống và dễ bị rơi xuống.\n\n" +
                  "Em không nên đứng gần, bước qua hoặc chơi cạnh cống bị mất nắp.\n\n" +
                  "Nếu phát hiện cống hở, hãy tránh xa và báo ngay cho người lớn."
    },

    {
        id: "electric_pole_hole_risk",
        keywords: [
            'hố cột điện',
            'ho cot dien',
            'hố chôn cột',
            'hố cột có nước',
            'hố điện',
            'hố chưa lấp'
        ],
        response: "**Hố đào để chôn cột điện nếu chưa được lấp hoặc che chắn có thể gây tai nạn.**\n\n" +
                  "Sau mưa, hố có thể đầy nước khiến chúng ta không biết được độ sâu thật sự.\n\n" +
                  "Em không được đến gần, nhảy qua hoặc thò chân xuống thử.\n\n" +
                  "Hãy báo người lớn nếu thấy hố không có rào chắn."
    },

    {
        id: "no_warning_sign_water_area",
        keywords: [
            'không biển cảnh báo',
            'khong bien canh bao',
            'không có biển cấm',
            'chỗ nước không có biển',
            'không biển thì an toàn không'
        ],
        response: "**Không có biển cảnh báo không có nghĩa là nơi đó an toàn.**\n\n" +
                  "Nhiều ao, hồ, hố nước hoặc kênh mương ngoài cộng đồng chưa được đặt biển cảnh báo dù vẫn có nguy cơ rất cao.\n\n" +
                  "Vì vậy, em không nên tự xuống nước chỉ vì không nhìn thấy biển cấm.\n\n" +
                  "Nếu không biết rõ độ sâu và mức độ an toàn, hãy tránh xa và hỏi người lớn."
    },

    {
        id: "no_fence_water_area",
        keywords: [
            'không rào chắn',
            'khong rao chan',
            'ao không có rào',
            'hố không rào',
            'không có hàng rào',
            'nơi nước không chắn'
        ],
        response: "**Khu vực có nước mà không có hàng rào chắn cần được coi là nơi nguy hiểm.**\n\n" +
                  "Trẻ em có thể vô tình chạy đến quá gần, trượt chân hoặc rơi xuống nước.\n\n" +
                  "Em nên giữ khoảng cách, không đến sát mép và không rủ bạn chơi ở đó.\n\n" +
                  "Nếu thấy nguy cơ rõ ràng, hãy báo cho người lớn để có biện pháp che chắn."
    },

    {
        id: "muddy_marsh_area_risk",
        keywords: [
            'vùng sình lầy',
            'sinh lay',
            'bùn lầy',
            'chỗ bùn nước',
            'lội bùn',
            'nước bùn nguy hiểm'
        ],
        response: "**Vùng sình lầy và bùn nước rất dễ làm em bị mắc chân hoặc mất thăng bằng.**\n\n" +
                  "Có những chỗ nhìn tưởng nông nhưng thực tế lại sâu hoặc lún mạnh.\n\n" +
                  "Em không nên bước xuống để thử, bắt cá hoặc chơi đùa.\n\n" +
                  "Nếu lỡ sa vào vùng bùn hoặc nước nguy hiểm, hãy bình tĩnh gọi người lớn giúp đỡ."
    },

    {
        id: "play_ball_near_water",
        keywords: [
            'đá bóng gần sông',
            'da bong gan song',
            'đá bóng gần ao',
            'chơi bóng gần hồ',
            'bóng gần nước',
            'sân gần sông'
        ],
        response: "**Không nên đá bóng hoặc chơi các trò chạy nhảy sát ao, hồ, sông, suối.**\n\n" +
                  "Khi mải chạy theo bóng, em có thể không để ý mép nước và bị trượt chân.\n\n" +
                  "Nếu bóng rơi xuống nước, tuyệt đối không tự xuống lấy.\n\n" +
                  "Hãy gọi người lớn hoặc bỏ lại quả bóng nếu việc lấy bóng không an toàn."
    },

    {
        id: "toy_falls_into_public_water",
        keywords: [
            'đồ rơi xuống ao',
            'do roi xuong nuoc',
            'bóng rơi xuống sông',
            'dép rơi xuống hồ',
            'đồ chơi rơi xuống nước',
            'xuống lấy đồ'
        ],
        response: "**Nếu đồ vật rơi xuống ao, hồ, sông hoặc hố nước, em không được tự xuống lấy.**\n\n" +
                  "Khi cố với hoặc xuống nước lấy đồ, em có thể bị trượt chân hoặc rơi vào chỗ sâu.\n\n" +
                  "Hãy đứng ở nơi an toàn và gọi người lớn giúp đỡ.\n\n" +
                  "Một món đồ có thể thay thế được, còn sự an toàn của em thì không."
    },

    {
        id: "after_school_water_play",
        keywords: [
            'tan học ra ao',
            'tan hoc di tam',
            'nghỉ học đi bơi',
            'sau giờ học đi tắm',
            'trốn đi bơi',
            'tan trường ra sông'
        ],
        response: "**Sau giờ học, em không nên tự rủ bạn ra ao, hồ, sông, suối để tắm hoặc chơi.**\n\n" +
                  "Đây là lúc người lớn có thể không biết các em đang ở đâu nên nếu xảy ra sự cố sẽ rất khó hỗ trợ kịp thời.\n\n" +
                  "Sau khi tan học, hãy về nhà đúng giờ hoặc tham gia hoạt động đã được gia đình cho phép.\n\n" +
                  "Nếu muốn đi bơi, cần báo gia đình và có người lớn giám sát."
    },

    {
        id: "holiday_water_play",
        keywords: [
            'nghỉ hè đi tắm',
            'nghi he di boi',
            'ngày nghỉ ra sông',
            'nghỉ học ra hồ',
            'hè đi tắm sông',
            'ngày nghỉ đi bơi'
        ],
        response: "**Nghỉ hè là lúc em có nhiều thời gian vui chơi nhưng cũng cần đặc biệt chú ý an toàn dưới nước.**\n\n" +
                  "Không tự rủ bạn đi tắm sông, hồ hoặc ao khi không có người lớn đi cùng.\n\n" +
                  "Nếu muốn đi bơi, hãy chọn nơi được phép, báo cho gia đình và có người lớn hoặc nhân viên cứu hộ giám sát.\n\n" +
                  "Vui hè an toàn mới là một mùa hè thật vui."
    },

    {
        id: "dangerous_area_what_to_do",
        keywords: [
            'gặp chỗ nguy hiểm',
            'gap cho nguy hiem',
            'thấy hố nước',
            'thấy ao nguy hiểm',
            'phải làm gì khi thấy nguy hiểm',
            'nơi nguy hiểm báo ai'
        ],
        response: "**Khi phát hiện khu vực có nguy cơ đuối nước, em hãy nhớ 3 việc:**\n\n" +
                  "1. **Tránh xa** khu vực đó.\n" +
                  "2. **Cảnh báo bạn bè và em nhỏ** không đến gần.\n" +
                  "3. **Báo cho người lớn** như bố mẹ, thầy cô hoặc người có trách nhiệm.\n\n" +
                  "Em không nên tự xuống kiểm tra hoặc tự sửa hàng rào, nắp cống hay biển cảnh báo."
    },

    {
        id: "community_water_safety_summary",
        keywords: [
            'an toàn ngoài cộng đồng',
            'phòng đuối nước ngoài đường',
            'phong duoi nuoc cong dong',
            'đi chơi cần tránh gì',
            'chơi ngoài trời gần nước'
        ],
        response: "**Khi vui chơi ngoài cộng đồng, em hãy nhớ:**\n\n" +
                  "✅ Tránh xa ao, hồ, sông, suối, kênh, mương và hố nước sâu.\n" +
                  "✅ Không đến sát khu vực không có rào chắn.\n" +
                  "✅ Không tự xuống nước lấy bóng hoặc đồ chơi.\n" +
                  "✅ Không rủ nhau đi tắm sau giờ học hoặc ngày nghỉ.\n" +
                  "✅ Báo người lớn khi thấy cống hở, hố nước hoặc khu vực nguy hiểm.\n\n" +
                  "Quy tắc dễ nhớ là: **Không lại gần – Không tự xuống – Báo người lớn.**"
    },
{
        id: "water_transport_safety_general",
        keywords: [
            'đi thuyền an toàn',
            'đi đò cần chú ý gì',
            'di tau an toan',
            'đi ghe cần làm gì',
            'an toàn đường thủy',
            'đi tàu phải làm gì'
        ],
        response: "**Khi đi tàu, thuyền, ghe hoặc đò, em cần tuân thủ các quy tắc an toàn.**\n\n" +
                  "Em phải mặc áo phao, lên xuống phương tiện theo hướng dẫn, ngồi đúng chỗ và không chạy nhảy, đùa nghịch.\n\n" +
                  "Trước khi đi, cần quan sát xem phương tiện có áo phao hoặc dụng cụ cứu sinh hay không và không nên lên phương tiện chở quá đông người.\n\n" +
                  "Nếu xảy ra sự cố, hãy giữ bình tĩnh và làm đúng hướng dẫn của người điều khiển phương tiện."
    },

    {
        id: "life_jacket_on_boat",
        keywords: [
            'đi thuyền có cần áo phao',
            'đi đò mặc áo phao',
            'ao phao khi di tau',
            'đi ghe cần áo phao không',
            'có phải mặc áo phao không',
            'trên tàu mặc áo phao'
        ],
        response: "**Có. Khi tham gia giao thông đường thủy, em cần mặc áo phao.**\n\n" +
                  "Áo phao giúp cơ thể nổi tốt hơn nếu không may bị rơi xuống nước hoặc phương tiện gặp sự cố.\n\n" +
                  "Em cần mặc áo phao đúng cách, cài dây chắc chắn và sử dụng loại phù hợp với cơ thể.\n\n" +
                  "Không nên tháo áo phao ra chỉ vì cảm thấy nóng hoặc bất tiện."
    },

    {
        id: "life_jacket_correct_size",
        keywords: [
            'áo phao phải vừa không',
            'ao phao dung co',
            'áo phao quá rộng',
            'áo phao quá chật',
            'chọn áo phao',
            'mặc áo phao thế nào'
        ],
        response: "**Áo phao cần vừa với cơ thể và được mặc đúng cách.**\n\n" +
                  "Nếu áo quá rộng, áo có thể tuột khỏi người khi xuống nước. Nếu quá chật, em sẽ khó vận động.\n\n" +
                  "Hãy cài đầy đủ dây và khóa theo hướng dẫn của người lớn hoặc nhân viên phụ trách.\n\n" +
                  "Trước khi phương tiện rời bến, em nên kiểm tra áo phao đã được mặc chắc chắn chưa."
    },

    {
        id: "boat_no_life_jacket",
        keywords: [
            'thuyền không có áo phao',
            'đò không có phao',
            'khong co ao phao',
            'tàu thiếu phao',
            'không có dụng cụ cứu sinh'
        ],
        response: "**Nếu phương tiện không có áo phao hoặc dụng cụ cứu sinh, em không nên lên.**\n\n" +
                  "Áo phao và các dụng cụ nổi là những thiết bị rất quan trọng để bảo vệ hành khách khi xảy ra sự cố.\n\n" +
                  "Em hãy báo cho người lớn đi cùng hoặc người phụ trách và chỉ tham gia khi điều kiện an toàn được bảo đảm."
    },

    {
        id: "overloaded_boat_risk",
        keywords: [
            'thuyền quá đông',
            'đò chở quá người',
            'tau qua tai',
            'đò đông người',
            'ghe quá tải',
            'thuyền chở quá tải'
        ],
        response: "**Không nên đi phương tiện đường thủy đang chở quá số người quy định.**\n\n" +
                  "Khi quá đông người, tàu, thuyền, ghe hoặc đò dễ mất cân bằng, tròng trành, chìm hoặc lật hơn.\n\n" +
                  "Đặc biệt với thuyền hoặc đò nhỏ, nguy cơ này càng cao.\n\n" +
                  "Nếu thấy phương tiện quá đông, em hãy báo cho người lớn và chờ phương tiện an toàn hơn."
    },

    {
        id: "bad_weather_boat",
        keywords: [
            'mưa có nên đi thuyền',
            'giông bão đi tàu',
            'troi xau di do',
            'gió lớn đi thuyền',
            'mưa to đi đò',
            'thời tiết xấu đi tàu'
        ],
        response: "**Không nên đi tàu, thuyền, ghe hoặc đò khi thời tiết xấu.**\n\n" +
                  "Mưa to, gió lớn, giông hoặc bão có thể làm sóng mạnh, phương tiện khó điều khiển và dễ xảy ra tai nạn.\n\n" +
                  "Nếu thời tiết đang xấu hoặc sắp chuyển xấu, em hãy chờ ở nơi an toàn và làm theo hướng dẫn của người lớn."
    },

    {
        id: "boarding_boat_safely",
        keywords: [
            'lên thuyền thế nào',
            'lên đò an toàn',
            'len tau nhu the nao',
            'lên ghe cần làm gì',
            'cách lên thuyền'
        ],
        response: "**Khi lên tàu, thuyền, ghe hoặc đò, em cần xếp hàng và đi theo hướng dẫn.**\n\n" +
                  "Không chen lấn, xô đẩy hoặc nhảy lên phương tiện.\n\n" +
                  "Đi chậm, giữ thăng bằng và bước theo vị trí được người phụ trách hướng dẫn.\n\n" +
                  "Sau khi lên phương tiện, hãy nhanh chóng ngồi đúng chỗ."
    },

    {
        id: "getting_off_boat_safely",
        keywords: [
            'xuống thuyền thế nào',
            'xuống đò an toàn',
            'xuong tau nhu the nao',
            'rời thuyền',
            'cách xuống ghe'
        ],
        response: "**Khi xuống phương tiện, em cũng cần xếp hàng và chờ đến lượt.**\n\n" +
                  "Không chen lấn, nhảy từ trên tàu xuống bờ hoặc tự ý xuống khi phương tiện chưa ổn định.\n\n" +
                  "Hãy làm theo hướng dẫn của người điều khiển hoặc nhân viên trên phương tiện để tránh bị trượt ngã."
    },

    {
        id: "do_not_board_from_side",
        keywords: [
            'lên từ mạn thuyền',
            'xuống từ mạn thuyền',
            'man thuyen',
            'leo bên hông thuyền',
            'nhảy từ mạn đò'
        ],
        response: "**Không nên tự ý lên hoặc xuống từ mạn thuyền.**\n\n" +
                  "Việc leo lên hoặc xuống ở bên hông có thể làm thuyền tròng trành và khiến em mất thăng bằng, rơi xuống nước.\n\n" +
                  "Hãy sử dụng đúng lối lên xuống và làm theo chỉ dẫn của người phụ trách."
    },

    {
        id: "queue_when_boarding_boat",
        keywords: [
            'chen lấn khi lên đò',
            'xô đẩy lên thuyền',
            'chen lan len tau',
            'có được chen nhau lên tàu không',
            'xếp hàng lên đò'
        ],
        response: "**Không được chen lấn hoặc xô đẩy khi lên xuống phương tiện đường thủy.**\n\n" +
                  "Nhiều người dồn về một phía có thể làm thuyền hoặc đò mất cân bằng.\n\n" +
                  "Em hãy xếp hàng, chờ đến lượt và di chuyển từ từ theo hướng dẫn."
    },

    {
        id: "secure_belongings_before_boat",
        keywords: [
            'dây giày khi đi thuyền',
            'cặp sách khi đi đò',
            'do dac khi len tau',
            'mũ nón đi thuyền',
            'đồ dùng khi lên đò'
        ],
        response: "**Trước khi lên xuống phương tiện, em nên giữ đồ dùng thật gọn gàng.**\n\n" +
                  "Hãy buộc dây giày, chỉnh quai mũ, cặp sách và các vật dụng để không bị vướng khi di chuyển.\n\n" +
                  "Đồ cồng kềnh hoặc dây bị lỏng có thể khiến em vấp ngã hoặc mất thăng bằng."
    },

    {
        id: "sit_in_assigned_seat_boat",
        keywords: [
            'ngồi đâu trên thuyền',
            'ngồi đúng chỗ',
            'ngoi tren tau',
            'đi đò ngồi thế nào',
            'chỗ ngồi trên ghe'
        ],
        response: "**Khi ở trên tàu, thuyền, ghe hoặc đò, em cần ngồi đúng vị trí được hướng dẫn.**\n\n" +
                  "Không tự ý đổi chỗ, tụ tập về một phía hoặc đứng lên khi phương tiện đang chạy.\n\n" +
                  "Ngồi đúng chỗ giúp phương tiện giữ cân bằng và an toàn hơn cho tất cả mọi người."
    },

    {
        id: "do_not_walk_on_moving_boat",
        keywords: [
            'đi lại trên thuyền',
            'đứng lên trên đò',
            'di lai tren tau',
            'đi lại khi tàu chạy',
            'chạy trên thuyền'
        ],
        response: "**Không nên đi lại hoặc chạy nhảy khi phương tiện đang di chuyển.**\n\n" +
                  "Việc di chuyển nhiều có thể làm tàu, thuyền hoặc đò bị tròng trành và khiến em dễ ngã.\n\n" +
                  "Trừ khi thật sự cần thiết và có hướng dẫn, em nên ngồi yên tại chỗ."
    },

    {
        id: "do_not_play_on_boat",
        keywords: [
            'đùa trên thuyền',
            'choi tren tau',
            'chạy nhảy trên đò',
            'xô đẩy trên thuyền',
            'nghịch trên tàu'
        ],
        response: "**Không được đùa nghịch, chạy nhảy hoặc xô đẩy trên phương tiện đường thủy.**\n\n" +
                  "Một cú xô nhẹ cũng có thể khiến bạn mất thăng bằng và rơi xuống nước.\n\n" +
                  "Khi ở trên tàu hoặc thuyền, em cần giữ trật tự và ngồi đúng chỗ để bảo đảm an toàn."
    },

    {
        id: "do_not_put_hands_feet_in_water",
        keywords: [
            'thò tay xuống nước',
            'thò chân xuống nước',
            'tho tay xuong nuoc',
            'ngâm chân khi đi thuyền',
            'chạm nước khi tàu chạy'
        ],
        response: "**Không được thò tay hoặc chân xuống nước khi tàu, thuyền đang di chuyển.**\n\n" +
                  "Em có thể bị va vào vật bên ngoài, bị nước kéo mất thăng bằng hoặc rơi khỏi phương tiện.\n\n" +
                  "Hãy ngồi gọn trong phương tiện và giữ tay chân ở vị trí an toàn."
    },

    {
        id: "do_not_lean_out_boat",
        keywords: [
            'thò đầu ra ngoài tàu',
            'tho dau ra ngoai',
            'thò người ra ngoài',
            'ngó ra ngoài tàu',
            'lean ra ngoài thuyền'
        ],
        response: "**Không nên thò đầu, tay, chân hoặc người ra ngoài phương tiện.**\n\n" +
                  "Các vật bên ngoài có thể va vào em hoặc em có thể mất thăng bằng.\n\n" +
                  "Trên tàu lớn, em cũng không nên thò đầu hoặc tay ra ngoài cửa sổ."
    },

    {
        id: "do_not_take_photos_dangerously_boat",
        keywords: [
            'chụp ảnh trên thuyền',
            'tạo dáng trên tàu',
            'chup anh tren do',
            'selfie trên thuyền',
            'đứng chụp ảnh trên tàu'
        ],
        response: "**Không nên đứng lên, tạo dáng hoặc di chuyển nguy hiểm để chụp ảnh trên tàu, thuyền.**\n\n" +
                  "Việc mải chụp ảnh có thể làm em mất tập trung, trượt chân hoặc rơi xuống nước.\n\n" +
                  "Nếu muốn chụp ảnh, hãy ngồi hoặc đứng ở vị trí an toàn và làm theo hướng dẫn của người lớn."
    },

    {
        id: "do_not_touch_boat_equipment",
        keywords: [
            'nghịch thiết bị trên tàu',
            'chạm máy trên tàu',
            'nghich thiet bi tau',
            'bấm nút trên tàu',
            'có được nghịch đồ trên thuyền'
        ],
        response: "**Không được tự ý nghịch các thiết bị trên tàu hoặc thuyền.**\n\n" +
                  "Một số thiết bị có liên quan đến việc điều khiển và bảo đảm an toàn của phương tiện.\n\n" +
                  "Tự ý chạm, kéo hoặc bấm có thể gây nguy hiểm cho em và những người xung quanh."
    },

    {
        id: "remember_lifesaving_equipment_location",
        keywords: [
            'phao cứu sinh ở đâu',
            'nhớ vị trí phao',
            'vi tri phao cuu sinh',
            'dụng cụ cứu sinh trên tàu',
            'trên tàu cần quan sát gì'
        ],
        response: "**Khi lên phương tiện, em nên chú ý vị trí đặt áo phao, phao cứu sinh và các dụng cụ nổi.**\n\n" +
                  "Biết chúng ở đâu sẽ giúp em và người lớn xử lý nhanh hơn nếu có sự cố.\n\n" +
                  "Tuy nhiên, em không nên tự ý lấy ra nghịch khi chưa cần thiết."
    },

    {
        id: "boat_accident_what_to_do",
        keywords: [
            'tàu gặp sự cố',
            'thuyền gặp nạn',
            'tau bi su co',
            'đò gặp sự cố',
            'thuyền sắp lật',
            'gặp nạn trên tàu'
        ],
        response: "**Nếu phương tiện gặp sự cố, điều đầu tiên là phải bình tĩnh.**\n\n" +
                  "Em không nên la hét, chạy nhảy hoặc tự ý làm theo ý mình.\n\n" +
                  "Hãy mặc hoặc giữ chắc áo phao và làm đúng hướng dẫn của người điều khiển hoặc nhân viên trên phương tiện.\n\n" +
                  "Chỉ rời phương tiện khi được hướng dẫn."
    },

    {
        id: "stay_calm_boat_emergency",
        keywords: [
            'tàu gặp nạn có nên hoảng',
            'binh tinh tren tau',
            'sự cố trên thuyền phải làm gì',
            'hoảng loạn trên tàu',
            'gặp sự cố phải bình tĩnh'
        ],
        response: "**Khi xảy ra sự cố trên tàu hoặc thuyền, em cần cố gắng giữ bình tĩnh.**\n\n" +
                  "Hoảng loạn, chạy nhảy hoặc chen lấn có thể làm tình hình nguy hiểm hơn.\n\n" +
                  "Hãy lắng nghe người điều khiển phương tiện, giữ áo phao chắc chắn và thực hiện từng hướng dẫn một."
    },

    {
        id: "do_not_jump_off_boat_emergency",
        keywords: [
            'tàu gặp nạn có nên nhảy xuống',
            'nhay khoi tau',
            'có được tự nhảy khỏi thuyền',
            'thuyền sự cố nhảy xuống nước',
            'rời tàu khi nào'
        ],
        response: "**Không được tự ý nhảy khỏi tàu hoặc thuyền khi xảy ra sự cố.**\n\n" +
                  "Tự nhảy xuống nước có thể khiến em rơi vào dòng nước mạnh hoặc làm việc cứu hộ khó khăn hơn.\n\n" +
                  "Theo tài liệu, em chỉ nên rời phương tiện khi có thông báo và hướng dẫn của người phụ trách."
    },

    {
        id: "boat_fire_emergency",
        keywords: [
            'cháy trên tàu',
            'tau bi chay',
            'hỏa hoạn trên thuyền',
            'cháy tàu phải làm gì'
        ],
        response: "**Nếu có cháy trên tàu, em phải giữ bình tĩnh và làm đúng hướng dẫn của nhân viên trên tàu.**\n\n" +
                  "Không tự chạy lung tung hoặc chen lấn. Hãy di chuyển theo lối thoát và hướng dẫn được đưa ra.\n\n" +
                  "Tài liệu cũng lưu ý rằng trong tình huống khẩn cấp, hành khách chỉ nên rời tàu theo thông báo và hướng dẫn của người phụ trách."
    },

    {
        id: "water_transport_safety_summary",
        keywords: [
            'nhớ gì khi đi thuyền',
            'quy tắc đi đò',
            'quy tac di tau',
            'an toàn đi ghe',
            'tóm tắt đi thuyền an toàn'
        ],
        response: "**Khi đi tàu, thuyền, ghe hoặc đò, em hãy nhớ:**\n\n" +
                  "✅ Mặc áo phao.\n" +
                  "✅ Không đi phương tiện quá tải hoặc thiếu dụng cụ cứu sinh.\n" +
                  "✅ Lên xuống theo hướng dẫn, không chen lấn.\n" +
                  "✅ Ngồi đúng chỗ, không chạy nhảy hoặc đùa nghịch.\n" +
                  "✅ Không thò tay, chân hoặc người ra ngoài.\n" +
                  "✅ Khi có sự cố, bình tĩnh và làm theo hướng dẫn.\n\n" +
                  "Một câu dễ nhớ là: **Mặc phao – Ngồi yên – Nghe hướng dẫn.**"
    },
{
        id: "swimming_safety_general",
        keywords: [
            'đi bơi an toàn',
            'boi an toan',
            'đi bơi cần gì',
            'bơi cần chú ý',
            'an toàn khi bơi',
            'học bơi an toàn'
        ],
        response: "**Để đi bơi an toàn, em cần nhớ một số điều quan trọng:**\n\n" +
                  "1. Chỉ bơi ở nơi được phép và có người lớn giám sát.\n" +
                  "2. Khởi động trước khi xuống nước.\n" +
                  "3. Không bơi khi đang mệt, lạnh hoặc sức khỏe không tốt.\n" +
                  "4. Không tự ý bơi xa, bơi vào vùng nước sâu hoặc nơi lạ.\n" +
                  "5. Nếu thấy mệt hoặc đuối sức, hãy dừng bơi và tìm cách ra nơi an toàn.\n\n" +
                  "Biết bơi là tốt, nhưng biết giữ an toàn còn quan trọng hơn."
    },

    {
        id: "learn_swimming_importance",
        keywords: [
            'có nên học bơi',
            'hoc boi co tot khong',
            'vì sao phải học bơi',
            'học bơi để làm gì',
            'học bơi có cần không'
        ],
        response: "**Học bơi là một kỹ năng rất cần thiết.**\n\n" +
                  "Học bơi giúp em làm quen với môi trường nước, biết cách giữ cơ thể nổi và xử lý tốt hơn khi gặp tình huống bất ngờ.\n\n" +
                  "Tuy nhiên, học bơi không chỉ là học bơi nhanh hay bơi xa. Em còn cần học cách đứng nước, nổi ngửa, tự cứu và nhận biết nơi nguy hiểm.\n\n" +
                  "Hãy học bơi với giáo viên hoặc người hướng dẫn có chuyên môn."
    },

    {
        id: "learn_swimming_with_teacher",
        keywords: [
            'học bơi với ai',
            'ai dạy bơi',
            'hoc boi voi ai',
            'tự học bơi được không',
            'ai hướng dẫn bơi'
        ],
        response: "**Em nên học bơi với giáo viên hoặc người hướng dẫn có khả năng quản lý và bảo đảm an toàn.**\n\n" +
                  "Người hướng dẫn sẽ giúp em học đúng kỹ thuật, biết cách xuống nước an toàn và xử lý khi gặp sự cố.\n\n" +
                  "Không nên tự học bơi một mình ở ao, hồ, sông hoặc nơi không có người giám sát."
    },

    {
        id: "warm_up_before_swimming",
        keywords: [
            'khởi động trước khi bơi',
            'khoi dong truoc khi boi',
            'trước khi bơi làm gì',
            'có cần khởi động',
            'xuống nước ngay được không'
        ],
        response: "**Trước khi bơi, em cần khởi động.**\n\n" +
                  "Khởi động giúp các khớp và cơ bắp linh hoạt hơn, giảm nguy cơ chấn thương và chuột rút.\n\n" +
                  "Em nên thực hiện các động tác theo hướng dẫn của giáo viên hoặc người phụ trách trước khi xuống nước.\n\n" +
                  "Không nên đang ngồi nghỉ rồi bất ngờ nhảy ngay xuống nước."
    },

    {
        id: "safe_pool_entry",
        keywords: [
            'xuống bể thế nào',
            'xuong be an toan',
            'cách xuống hồ bơi',
            'xuống nước an toàn',
            'vào bể bơi'
        ],
        response: "**Khi xuống bể bơi, em cần làm theo hướng dẫn của giáo viên hoặc người phụ trách.**\n\n" +
                  "Không chạy lấy đà rồi nhảy xuống nước khi chưa được phép.\n\n" +
                  "Hãy xuống từ vị trí an toàn, giữ chắc tay vịn hoặc thành bể nếu có và quan sát độ sâu trước khi xuống."
    },

    {
        id: "safe_pool_exit",
        keywords: [
            'lên khỏi bể',
            'ra khỏi hồ bơi',
            'len khoi be',
            'lên bờ thế nào',
            'ra khỏi nước'
        ],
        response: "**Khi ra khỏi bể, em nên lên ở vị trí có thang hoặc nơi được hướng dẫn.**\n\n" +
                  "Không chen lấn, trèo lên ở chỗ trơn hoặc kéo bạn khác xuống nước.\n\n" +
                  "Nếu đang mệt, hãy báo người lớn và lên khỏi nước từ từ, an toàn."
    },

    {
        id: "swim_only_with_supervision",
        keywords: [
            'bơi cần người lớn',
            'boi co can nguoi lon',
            'ai phải trông khi bơi',
            'bơi một mình được không',
            'đi bơi không người lớn'
        ],
        response: "**Trẻ em không nên bơi khi không có người lớn giám sát.**\n\n" +
                  "Ngay cả khi em đã biết bơi, vẫn có thể gặp tình huống bất ngờ như mệt, chuột rút, sặc nước hoặc đi vào vùng nước sâu.\n\n" +
                  "Người lớn hoặc nhân viên cứu hộ có thể phát hiện và hỗ trợ nhanh hơn khi có sự cố."
    },

    {
        id: "known_swimmer_still_at_risk",
        keywords: [
            'biết bơi vẫn đuối nước',
            'biet boi van nguy hiem',
            'bơi giỏi vẫn đuối',
            'biết bơi có an toàn không',
            'bơi giỏi có sao không'
        ],
        response: "**Biết bơi vẫn có thể gặp đuối nước.**\n\n" +
                  "Một người biết bơi có thể vẫn gặp nguy hiểm nếu bị chuột rút, mệt quá sức, gặp sóng lớn, nước xoáy hoặc bơi ở nơi lạ.\n\n" +
                  "Nếu chưa được học kỹ năng tự cứu và thoát hiểm, khi gặp sự cố em có thể hoảng sợ và xử lý sai.\n\n" +
                  "Vì vậy, biết bơi không có nghĩa là được chủ quan."
    },

    {
        id: "pool_vs_natural_water",
        keywords: [
            'bể bơi với sông khác gì',
            'boi be va song',
            'bơi hồ khác bể bơi',
            'bơi ngoài tự nhiên',
            'bơi sông khác hồ bơi'
        ],
        response: "**Bơi ở bể bơi và bơi ở sông, hồ, biển rất khác nhau.**\n\n" +
                  "Bể bơi thường có độ sâu rõ ràng, thành bể để bám và có người quản lý.\n\n" +
                  "Trong khi đó, sông, hồ hoặc biển có thể có chỗ sâu bất ngờ, nước lạnh hơn, dòng chảy mạnh, nước xoáy hoặc vật cản dưới nước.\n\n" +
                  "Vì vậy, bơi tốt ở bể không có nghĩa là em an toàn khi bơi ở mọi nơi."
    },

    {
        id: "unfamiliar_water_risk",
        keywords: [
            'bơi chỗ lạ',
            'boi noi la',
            'hồ lạ có nên bơi',
            'xuống nước chỗ lạ',
            'nơi chưa từng bơi'
        ],
        response: "**Không nên tự ý bơi ở nơi lạ.**\n\n" +
                  "Em có thể không biết độ sâu, dòng chảy, nhiệt độ nước hoặc vật cản bên dưới.\n\n" +
                  "Một nơi trông có vẻ bình thường vẫn có thể có vùng nước sâu hoặc nước xoáy.\n\n" +
                  "Chỉ xuống nước khi nơi đó được phép và có người lớn hướng dẫn."
    },

    {
        id: "deep_water_swimming_risk",
        keywords: [
            'bơi chỗ sâu',
            'nuoc sau',
            'bơi vùng nước sâu',
            'chỗ sâu có bơi được không',
            'bơi ra chỗ sâu'
        ],
        response: "**Trẻ em không nên tự ý bơi vào vùng nước sâu.**\n\n" +
                  "Khi xuống chỗ sâu, em không còn chạm chân xuống đáy và dễ hoảng sợ nếu bị mệt hoặc sặc nước.\n\n" +
                  "Đặc biệt ở sông, hồ và biển, độ sâu có thể thay đổi rất nhanh.\n\n" +
                  "Hãy ở đúng khu vực được người lớn hoặc giáo viên cho phép."
    },

    {
        id: "swimming_tired_action",
        keywords: [
            'bơi mệt',
            'boi bi met',
            'đuối sức khi bơi',
            'mệt dưới nước',
            'đang bơi hết sức'
        ],
        response: "**Nếu đang bơi mà thấy mệt hoặc đuối sức, em không được cố bơi tiếp.**\n\n" +
                  "Hãy giữ bình tĩnh, gọi người lớn hoặc nhân viên cứu hộ và tìm cách đến nơi có thể bám chắc.\n\n" +
                  "Nếu đã được học kỹ năng nổi ngửa, em có thể dùng kỹ năng này để nghỉ và giữ sức.\n\n" +
                  "Sau đó từ từ ra khỏi nước."
    },

    {
        id: "swimming_cold_action",
        keywords: [
            'bơi thấy lạnh',
            'lanh khi boi',
            'run khi bơi',
            'nước lạnh',
            'đang bơi bị rét'
        ],
        response: "**Nếu đang bơi mà thấy lạnh hoặc run, em nên ra khỏi nước.**\n\n" +
                  "Cảm giác lạnh có thể là dấu hiệu cơ thể đang mệt và mất sức.\n\n" +
                  "Không nên cố bơi tiếp chỉ vì muốn chơi thêm.\n\n" +
                  "Hãy báo người lớn và lên bờ để nghỉ ngơi, giữ ấm."
    },

    {
        id: "floating_on_back_skill",
        keywords: [
            'nổi ngửa là gì',
            'noi ngua',
            'nổi ngửa để làm gì',
            'cách nghỉ khi bơi',
            'nổi trên lưng'
        ],
        response: "**Nổi ngửa là một kỹ năng an toàn rất quan trọng khi ở dưới nước.**\n\n" +
                  "Kỹ năng này giúp em giữ mặt, mũi và miệng trên mặt nước, nghỉ ngơi và tiết kiệm sức.\n\n" +
                  "Nổi ngửa cũng có thể giúp em bình tĩnh hơn khi bị mệt.\n\n" +
                  "Em nên học và thực hành kỹ năng này dưới sự hướng dẫn của giáo viên."
    },

    {
        id: "treading_water_skill",
        keywords: [
            'đứng nước là gì',
            'dung nuoc',
            'đứng nước để làm gì',
            'giữ đầu trên mặt nước',
            'kỹ năng đứng nước'
        ],
        response: "**Đứng nước là kỹ năng giúp em giữ cơ thể ở tư thế gần thẳng đứng và giữ đầu trên mặt nước.**\n\n" +
                  "Kỹ năng này giúp em thở, quan sát xung quanh và chờ sự hỗ trợ khi cần.\n\n" +
                  "Đây là một trong những kỹ năng sinh tồn rất quan trọng khi học bơi.\n\n" +
                  "Em nên tập đứng nước trong lớp học bơi có người hướng dẫn."
    },

    {
        id: "water_survival_skills",
        keywords: [
            'kỹ năng sinh tồn dưới nước',
            'ky nang sinh ton',
            'kỹ năng tự cứu',
            'tu cuu duoi nuoc',
            'cần học gì ngoài bơi'
        ],
        response: "**Ngoài các kiểu bơi, em còn cần học kỹ năng sinh tồn trong nước.**\n\n" +
                  "Một số kỹ năng quan trọng gồm: đứng nước, nổi ngửa, xoay chuyển tư thế cơ thể và xử lý khi bất ngờ rơi xuống nước.\n\n" +
                  "Những kỹ năng này giúp em bình tĩnh hơn và có thêm thời gian chờ người khác hỗ trợ.\n\n" +
                  "Hãy học từng bước dưới sự hướng dẫn của giáo viên."
    },

    {
        id: "self_rescue_skill_importance",
        keywords: [
            'tự cứu là gì',
            'tu cuu la gi',
            'kỹ năng tự cứu để làm gì',
            'tự cứu khi rơi xuống nước',
            'học tự cứu'
        ],
        response: "**Kỹ năng tự cứu giúp em bảo vệ mình khi gặp tình huống bất ngờ dưới nước.**\n\n" +
                  "Ví dụ, khi bất ngờ rơi xuống nước, nếu đã được học nổi ngửa, đứng nước và đổi tư thế cơ thể, em sẽ ít hoảng loạn hơn.\n\n" +
                  "Mục tiêu là giữ được đường thở trên mặt nước, tiết kiệm sức và chờ hỗ trợ."
    },

    {
        id: "body_position_change_skill",
        keywords: [
            'đổi tư thế dưới nước',
            'xoay người dưới nước',
            'doi tu the khi boi',
            'từ sấp sang ngửa',
            'xoay sang nổi ngửa'
        ],
        response: "**Biết đổi tư thế dưới nước là một kỹ năng rất hữu ích.**\n\n" +
                  "Em có thể học cách chuyển từ nằm sấp sang nằm ngửa, từ nổi sang đứng nước và ngược lại.\n\n" +
                  "Kỹ năng này giúp em xử lý tốt hơn khi gặp vật cản, sóng lớn hoặc bất ngờ rơi xuống nước.\n\n" +
                  "Hãy luyện tập trong lớp học bơi an toàn."
    },

    {
        id: "do_not_dive_headfirst_unknown_water",
        keywords: [
            'cắm đầu xuống nước',
            'nhay cam dau',
            'lao đầu xuống hồ',
            'nhảy đầu xuống bể',
            'nhảy cắm đầu nguy hiểm'
        ],
        response: "**Không được nhảy cắm đầu xuống nơi chưa biết rõ độ sâu.**\n\n" +
                  "Nếu nước nông hoặc có vật cứng bên dưới, em có thể bị chấn thương nặng ở đầu, cổ hoặc lưng.\n\n" +
                  "Chỉ thực hiện động tác nhảy xuống nước khi có người hướng dẫn và ở nơi được phép."
    },

    {
        id: "do_not_swim_race_unsupervised",
        keywords: [
            'bơi thi',
            'thi boi',
            'thách bơi',
            'bơi đua với bạn',
            'bơi xa với bạn'
        ],
        response: "**Không nên tự tổ chức bơi thi hoặc thách nhau bơi xa.**\n\n" +
                  "Khi cố thắng bạn, em có thể bơi quá sức và không nhận ra mình đang đi vào nơi nguy hiểm.\n\n" +
                  "Nếu muốn thi bơi, hãy tham gia hoạt động có giáo viên hoặc người phụ trách tổ chức."
    },

    {
        id: "no_eating_while_swimming",
        keywords: [
            'ăn khi bơi',
            'an trong luc boi',
            'vừa bơi vừa ăn',
            'ăn dưới nước',
            'đang bơi ăn được không'
        ],
        response: "**Không nên ăn uống trong lúc đang bơi.**\n\n" +
                  "Việc này có thể làm em mất tập trung và dễ bị sặc.\n\n" +
                  "Nếu muốn ăn hoặc uống, hãy ra khỏi nước và nghỉ ở nơi an toàn."
    },

    {
        id: "no_swimming_after_full_meal",
        keywords: [
            'ăn no rồi bơi',
            'an no di boi',
            'vừa ăn xong đi bơi',
            'ăn cơm xong bơi',
            'no bụng có bơi được không'
        ],
        response: "**Không nên đi bơi ngay sau khi vừa ăn quá no.**\n\n" +
                  "Cơ thể cần thời gian để tiêu hóa thức ăn. Vận động mạnh ngay sau khi ăn có thể làm em khó chịu, buồn nôn hoặc mệt.\n\n" +
                  "Hãy nghỉ ngơi và chỉ xuống nước khi cơ thể cảm thấy thoải mái."
    },

    {
        id: "swimming_class_content",
        keywords: [
            'học bơi học gì',
            'hoc boi gom gi',
            'lớp bơi dạy gì',
            'học bơi có những gì',
            'nội dung học bơi'
        ],
        response: "**Một lớp học bơi an toàn không chỉ dạy các kiểu bơi.**\n\n" +
                  "Theo tài liệu, học sinh còn được học kiến thức phòng tránh đuối nước, khởi động, lên xuống bể an toàn, làm quen với nước, đứng nước, nổi sấp, nổi ngửa và kỹ năng tự cứu.\n\n" +
                  "Ở các mức phù hợp, các em còn được học thêm kỹ năng cứu đuối an toàn."
    },

    {
        id: "swimming_safety_summary",
        keywords: [
            'nhớ gì khi đi bơi',
            'quy tắc đi bơi',
            'quy tac boi',
            'tóm tắt an toàn bơi',
            'đi bơi nhớ gì'
        ],
        response: "**Khi đi bơi, em hãy nhớ:**\n\n" +
                  "✅ Khởi động trước khi xuống nước.\n" +
                  "✅ Chỉ bơi khi có người lớn giám sát.\n" +
                  "✅ Không bơi ở nơi lạ, nước sâu hoặc nguy hiểm.\n" +
                  "✅ Không bơi thi, nhảy cắm đầu hoặc cố bơi khi đã mệt.\n" +
                  "✅ Học thêm kỹ năng nổi ngửa, đứng nước và tự cứu.\n\n" +
                  "Một câu dễ nhớ là: **Khởi động – Đúng nơi – Có người trông – Mệt thì dừng.**"
    },
 {
        id: "swimming_cramp_definition",
        keywords: [
            'chuột rút là gì',
            'chuot rut la gi',
            'co rút khi bơi',
            'đang bơi bị co cơ',
            'bị chuột rút'
        ],
        response: "**Chuột rút là hiện tượng cơ bị co thắt đột ngột, gây đau và làm cho việc cử động trở nên khó khăn.**\n\n" +
                  "Chuột rút thường xảy ra ở cẳng chân, đùi, bàn chân, bàn tay hoặc cơ bụng.\n\n" +
                  "Khi đang ở trên bờ, chuột rút thường không quá nguy hiểm. Nhưng nếu xảy ra lúc đang bơi thì em có thể khó cử động, nhanh mất sức và có nguy cơ đuối nước.\n\n" +
                  "Vì vậy, khi bị chuột rút dưới nước, điều quan trọng nhất là **bình tĩnh và tìm cách giữ cơ thể nổi**."
    },

    {
        id: "swimming_cramp_causes",
        keywords: [
            'vì sao bị chuột rút',
            'nguyên nhân chuột rút',
            'tai sao chuot rut',
            'bơi bị chuột rút vì sao',
            'co cơ do đâu'
        ],
        response: "**Chuột rút khi bơi có thể xảy ra vì nhiều nguyên nhân.**\n\n" +
                  "Một số nguyên nhân thường gặp là cơ thể mệt, vận động quá sức, khởi động chưa kỹ, bơi quá lâu hoặc cơ thể bị mất nước.\n\n" +
                  "Nước lạnh và việc cố gắng bơi quá sức cũng có thể làm nguy cơ chuột rút tăng lên.\n\n" +
                  "Vì vậy, em nên khởi động kỹ, bơi vừa sức và không xuống nước khi đang mệt."
    },

    {
        id: "cramp_while_swimming_first_action",
        keywords: [
            'đang bơi bị chuột rút',
            'chuot rut khi boi',
            'bị co chân dưới nước',
            'bơi bị chuột rút làm gì',
            'đang bơi đau chân'
        ],
        response: "**Nếu đang bơi mà bị chuột rút, việc đầu tiên là phải bình tĩnh.**\n\n" +
                  "Em không nên hoảng sợ hoặc cố vùng vẫy mạnh vì sẽ làm cơ thể nhanh mất sức hơn.\n\n" +
                  "Hãy gọi người xung quanh giúp đỡ, cố giữ cơ thể nổi và tìm vị trí có thể bám vào như thành bể, dây phao hoặc vật chắc chắn.\n\n" +
                  "Nếu đã học kỹ năng nổi ngửa hoặc đứng nước, hãy sử dụng để nghỉ và giữ sức."
    },

    {
        id: "do_not_struggle_cramp",
        keywords: [
            'chuột rút có được vùng vẫy không',
            'khong vung vay',
            'vùng vẫy khi chuột rút',
            'co chân có nên đạp mạnh',
            'bị chuột rút có nên cố bơi'
        ],
        response: "**Không nên vùng vẫy mạnh khi bị chuột rút.**\n\n" +
                  "Càng vùng vẫy, em càng tiêu tốn nhiều sức và dễ bị sặc nước.\n\n" +
                  "Đau do chuột rút cũng có thể khiến em hoảng loạn nếu cố cử động quá mạnh.\n\n" +
                  "Hãy bình tĩnh, thả lỏng cơ thể, cố giữ nổi và gọi người giúp đỡ."
    },

    {
        id: "call_for_help_cramp",
        keywords: [
            'chuột rút có kêu cứu không',
            'keu cuu khi chuot rut',
            'bị chuột rút gọi ai',
            'đau chân dưới nước gọi cứu',
            'bơi bị co chân phải gọi ai'
        ],
        response: "**Có. Khi bị chuột rút dưới nước, em nên tìm cách báo cho người xung quanh biết ngay.**\n\n" +
                  "Hãy hô cứu hoặc giơ tay ra hiệu nếu vẫn có thể giữ thăng bằng và nổi an toàn.\n\n" +
                  "Nếu ở gần thành bể, phao hoặc vị trí có thể bám, hãy di chuyển đến đó để chờ người lớn hoặc nhân viên cứu hộ hỗ trợ."
    },

    {
        id: "float_back_when_cramp",
        keywords: [
            'nổi ngửa khi chuột rút',
            'noi ngua chuot rut',
            'chuột rút có nổi ngửa không',
            'bị co chân thì nổi thế nào',
            'nổi ngửa để nghỉ'
        ],
        response: "**Nổi ngửa có thể giúp em tiết kiệm sức khi bị chuột rút.**\n\n" +
                  "Khi nổi ngửa đúng cách, mặt, mũi và miệng được giữ trên mặt nước nên em có thể thở và bình tĩnh hơn.\n\n" +
                  "Hãy thả lỏng cơ thể, cử động nhẹ nhàng và gọi người giúp đỡ.\n\n" +
                  "Kỹ năng này cần được học và tập trước với giáo viên, không nên tự tập ở nơi nguy hiểm."
    },

    {
        id: "treading_water_when_cramp",
        keywords: [
            'đứng nước khi chuột rút',
            'dung nuoc chuot rut',
            'co chân đứng nước được không',
            'đứng nước để nghỉ',
            'chuột rút đứng nước'
        ],
        response: "**Đứng nước cũng có thể giúp em giữ đầu trên mặt nước và tiết kiệm sức.**\n\n" +
                  "Khi đứng nước, tay và chân cử động nhẹ để giữ mũi, miệng ở trên mặt nước.\n\n" +
                  "Điều quan trọng là thở chậm, giữ bình tĩnh và không cố dùng phần cơ đang bị đau quá nhiều.\n\n" +
                  "Nếu thấy không an toàn, hãy gọi cứu hộ ngay."
    },

    {
        id: "finger_cramp_swimming",
        keywords: [
            'chuột rút ngón tay',
            'co ngón tay khi bơi',
            'chuot rut ngon tay',
            'đang bơi co bàn tay'
        ],
        response: "**Nếu bị chuột rút ở ngón tay, em cần giữ bình tĩnh và ưu tiên giữ cơ thể nổi.**\n\n" +
                  "Theo tài liệu, có thể nắm chặt bàn tay rồi xòe mạnh các ngón ra vài lần để giúp cơ thư giãn.\n\n" +
                  "Tuy nhiên, khi đang ở dưới nước, an toàn vẫn quan trọng nhất: nếu thấy khó giữ nổi, hãy gọi người lớn hoặc nhân viên cứu hộ ngay."
    },

    {
        id: "arm_cramp_swimming",
        keywords: [
            'chuột rút cánh tay',
            'co tay khi bơi',
            'chuot rut canh tay',
            'đau tay khi đang bơi'
        ],
        response: "**Nếu bị chuột rút ở cánh tay, hãy bình tĩnh và cố giữ cơ thể nổi.**\n\n" +
                  "Theo tài liệu, có thể gập và duỗi cánh tay để giúp cơ đang co được thả lỏng.\n\n" +
                  "Không nên cố bơi thật nhanh bằng cánh tay đang đau.\n\n" +
                  "Hãy gọi hỗ trợ và tìm cách đến thành bể, phao hoặc vị trí an toàn."
    },

    {
        id: "leg_cramp_swimming",
        keywords: [
            'chuột rút chân',
            'co chân khi bơi',
            'chuot rut chan',
            'đau bắp chân dưới nước',
            'bơi bị cứng chân'
        ],
        response: "**Chuột rút ở chân là tình huống rất dễ làm người đang bơi hoảng sợ.**\n\n" +
                  "Em cần dừng việc đạp chân mạnh, bình tĩnh giữ nổi và gọi người giúp đỡ.\n\n" +
                  "Nếu đã được hướng dẫn kỹ năng xử lý chuột rút, em có thể nhẹ nhàng kéo giãn phần chân bị co.\n\n" +
                  "Sau khi lên bờ, hãy nghỉ ngơi và không tiếp tục bơi ngay."
    },

    {
        id: "thigh_cramp_swimming",
        keywords: [
            'chuột rút đùi',
            'co đùi khi bơi',
            'chuot rut dui',
            'đau đùi dưới nước'
        ],
        response: "**Khi bị chuột rút ở đùi, em cần ưu tiên giữ an toàn trước.**\n\n" +
                  "Hãy bình tĩnh, giữ nổi và gọi trợ giúp.\n\n" +
                  "Nếu em đã được giáo viên hướng dẫn cách kéo giãn cơ, có thể thực hiện nhẹ nhàng khi vẫn giữ được cơ thể an toàn trên mặt nước.\n\n" +
                  "Không cố bơi nhanh bằng chân đang đau."
    },

    {
        id: "abdominal_cramp_swimming",
        keywords: [
            'chuột rút bụng',
            'co bụng khi bơi',
            'chuot rut bung',
            'đau bụng khi đang bơi'
        ],
        response: "**Chuột rút ở bụng tuy ít gặp hơn nhưng vẫn có thể rất nguy hiểm khi đang bơi.**\n\n" +
                  "Hãy giữ bình tĩnh, cố nổi hoặc đứng nước và gọi người hỗ trợ.\n\n" +
                  "Theo tài liệu, người bị chuột rút bụng có thể thả lỏng, hít thở nhẹ nhàng và tìm cách làm giãn cơ.\n\n" +
                  "Sau khi lên được bờ, nên nghỉ ngơi và không tiếp tục bơi."
    },

    {
        id: "cramp_move_to_safe_place",
        keywords: [
            'chuột rút bám vào đâu',
            'bị co chân tìm chỗ bám',
            'tim cho bam khi chuot rut',
            'chuột rút vào bờ thế nào'
        ],
        response: "**Khi bị chuột rút, hãy quan sát xem gần đó có nơi nào có thể bám chắc hay không.**\n\n" +
                  "Ví dụ: thành bể, dây phao hoặc vật nổi chắc chắn.\n\n" +
                  "Nếu có thể di chuyển an toàn, hãy từ từ tiến đến đó thay vì cố bơi thật nhanh.\n\n" +
                  "Nếu không thể tự di chuyển, hãy giữ nổi và tiếp tục gọi người giúp đỡ."
    },

    {
        id: "after_cramp_reaches_shore",
        keywords: [
            'lên bờ sau chuột rút',
            'sau chuột rút làm gì',
            'sau khi co chân',
            'len bo chuot rut',
            'chuột rút hết rồi bơi tiếp'
        ],
        response: "**Sau khi lên bờ vì bị chuột rút, em nên nghỉ ngơi và không tiếp tục bơi ngay.**\n\n" +
                  "Có thể nhẹ nhàng xoa bóp phần cơ bị đau và giữ ấm cơ thể.\n\n" +
                  "Nếu vẫn còn đau nhiều, chóng mặt hoặc mệt, hãy báo ngay cho người lớn.\n\n" +
                  "Tài liệu cũng khuyến cáo sau khi bị chuột rút nên tìm cách lên bờ và không tiếp tục bơi."
    },

    {
        id: "cramp_prevention_general",
        keywords: [
            'phòng chuột rút',
            'phong chuot rut',
            'làm sao không bị chuột rút',
            'tránh chuột rút khi bơi',
            'cách ngừa chuột rút'
        ],
        response: "**Để giảm nguy cơ chuột rút khi bơi, em nên:**\n\n" +
                  "✅ Khởi động kỹ trước khi xuống nước.\n" +
                  "✅ Không xuống nước khi đang mệt.\n" +
                  "✅ Bơi vừa sức, không cố bơi quá lâu hoặc quá xa.\n" +
                  "✅ Không ngâm mình quá lâu trong nước lạnh.\n" +
                  "✅ Dừng lại khi thấy cơ thể bắt đầu lạnh hoặc đuối sức.\n\n" +
                  "Chuột rút có thể xảy ra bất ngờ, vì vậy luôn cần có người lớn giám sát khi bơi."
    },

    {
        id: "warmup_prevent_cramp",
        keywords: [
            'khởi động tránh chuột rút',
            'khoi dong chuot rut',
            'không khởi động dễ co chân',
            'khởi động có giảm chuột rút không'
        ],
        response: "**Khởi động trước khi bơi giúp giảm nguy cơ chuột rút và chấn thương.**\n\n" +
                  "Các động tác khởi động làm nóng cơ thể và giúp cơ, khớp chuẩn bị cho việc vận động dưới nước.\n\n" +
                  "Em không nên bỏ qua bước này, đặc biệt khi nước lạnh.\n\n" +
                  "Hãy khởi động theo hướng dẫn của giáo viên hoặc người phụ trách."
    },

    {
        id: "do_not_swim_tired_cramp",
        keywords: [
            'mệt dễ chuột rút',
            'met co chuot rut khong',
            'mệt có nên bơi',
            'vận động mệt rồi bơi'
        ],
        response: "**Khi cơ thể đang mệt, nguy cơ chuột rút và đuối sức sẽ tăng lên.**\n\n" +
                  "Nếu em vừa chạy nhảy, vận động nhiều hoặc cảm thấy mệt, hãy nghỉ trước khi xuống nước.\n\n" +
                  "Không nên cố bơi chỉ vì bạn bè đang chơi hoặc vì muốn bơi thêm."
    },

    {
        id: "cold_water_cramp_risk",
        keywords: [
            'nước lạnh dễ chuột rút',
            'nuoc lanh chuot rut',
            'bơi nước lạnh',
            'lạnh có co chân không'
        ],
        response: "**Nước lạnh có thể làm cơ thể nhanh mệt và tăng nguy cơ chuột rút.**\n\n" +
                  "Nếu nước quá lạnh hoặc em bắt đầu run, lạnh và mất sức, hãy rời khỏi nước.\n\n" +
                  "Không nên ngâm mình quá lâu trong nước lạnh hoặc tiếp tục bơi khi cơ thể đã khó chịu."
    },

    {
        id: "swim_within_ability_cramp",
        keywords: [
            'bơi vừa sức',
            'boi vua suc',
            'bơi quá sức',
            'bơi lâu có sao không',
            'bơi xa dễ chuột rút'
        ],
        response: "**Em nên bơi vừa sức với khả năng của mình.**\n\n" +
                  "Bơi quá nhanh, quá lâu hoặc quá xa có thể làm cơ bắp mệt và tăng nguy cơ chuột rút.\n\n" +
                  "Nếu thấy tốc độ bơi chậm lại, người lạnh hoặc bắt đầu đuối sức, hãy nghỉ và ra khỏi nước."
    },

    {
        id: "cramp_safety_summary",
        keywords: [
            'nhớ gì khi chuột rút',
            'chuột rút xử lý sao',
            'quy tac chuot rut',
            'tóm tắt chuột rút khi bơi',
            'bị co chân phải nhớ gì'
        ],
        response: "**Nếu bị chuột rút khi đang bơi, hãy nhớ:**\n\n" +
                  "1. **Bình tĩnh.**\n" +
                  "2. **Không vùng vẫy mạnh.**\n" +
                  "3. **Giữ cơ thể nổi** bằng nổi ngửa hoặc đứng nước nếu đã được học.\n" +
                  "4. **Kêu cứu và tìm chỗ bám an toàn.**\n" +
                  "5. **Lên bờ và nghỉ ngơi**, không tiếp tục bơi ngay.\n\n" +
                  "Câu dễ nhớ: **Bình tĩnh – Giữ nổi – Gọi cứu – Lên bờ.**"
    },
 {
        id: "rip_current_definition",
        keywords: [
            'dòng chảy xa bờ là gì',
            'dòng rút xa bờ',
            'dong chay xa bo',
            'dòng rip',
            'nước kéo ra biển',
            'dòng nước ra xa bờ'
        ],
        response: "**Dòng chảy rút xa bờ là một dòng nước mạnh chảy từ bờ ra phía biển.**\n\n" +
                  "Dòng nước này có thể kéo người đang tắm hoặc bơi ra xa bờ rất nhanh.\n\n" +
                  "Điều nguy hiểm là khu vực có dòng chảy xa bờ đôi khi lại nhìn khá yên, ít sóng nên nhiều người tưởng đó là nơi an toàn.\n\n" +
                  "Vì vậy, khi đi biển em cần quan sát kỹ và chỉ tắm ở khu vực được phép, có người lớn và nhân viên cứu hộ."
    },

    {
        id: "rip_current_danger",
        keywords: [
            'dòng xa bờ có nguy hiểm không',
            'rip current nguy hiểm',
            'dong xa bo nguy hiem',
            'bị nước kéo ra xa',
            'dòng nước kéo người'
        ],
        response: "**Dòng chảy xa bờ rất nguy hiểm vì có thể kéo người ra xa bờ nhanh hơn khả năng bơi vào.**\n\n" +
                  "Nếu cố bơi ngược dòng, người bơi rất dễ mất sức và hoảng loạn.\n\n" +
                  "Dòng này có thể xuất hiện ở khu vực tưởng như yên tĩnh và cũng có thể thay đổi vị trí.\n\n" +
                  "Vì vậy, điều quan trọng là biết nhận diện, tránh xa và không cố chống lại dòng nước."
    },

    {
        id: "rip_current_calm_water_danger",
        keywords: [
            'nước lặng ở biển',
            'bien lang co an toan',
            'chỗ ít sóng',
            'chỗ biển yên',
            'nước yên có nguy hiểm',
            'vùng lặng sóng'
        ],
        response: "**Ở biển, chỗ nước lặng chưa chắc đã an toàn.**\n\n" +
                  "Một vùng ít sóng, mặt nước phẳng hơn khu vực xung quanh có thể là nơi xuất hiện dòng chảy rút xa bờ.\n\n" +
                  "Dòng này có thể kéo người ra xa bờ dù bên ngoài trông rất yên.\n\n" +
                  "Vì vậy, em không nên tự chọn chỗ tắm chỉ vì thấy ít sóng. Hãy theo biển báo và hướng dẫn của nhân viên cứu hộ."
    },

    {
        id: "rip_current_signs",
        keywords: [
            'nhận biết dòng xa bờ',
            'dau hieu dong xa bo',
            'dòng rip nhìn thế nào',
            'biết chỗ có dòng xa bờ',
            'dấu hiệu rip current'
        ],
        response: "**Một số dấu hiệu có thể giúp nhận biết dòng chảy xa bờ:**\n\n" +
                  "1. Mặt nước ở một khu vực **phẳng và ít sóng hơn** vùng xung quanh.\n" +
                  "2. Màu nước có thể **sẫm hoặc đục hơn**.\n" +
                  "3. Có thể thấy bọt nước hoặc vật nổi bị cuốn từ bờ ra biển.\n\n" +
                  "Tuy nhiên, học sinh không nên tự mình phán đoán rồi xuống thử. Hãy hỏi người lớn hoặc nhân viên cứu hộ trước khi xuống biển."
    },

    {
        id: "rip_current_dark_water",
        keywords: [
            'nước biển sẫm màu',
            'nuoc sam mau o bien',
            'nước biển đục hơn',
            'vùng nước tối màu',
            'màu nước khác'
        ],
        response: "**Một vùng nước có màu sẫm hoặc đục hơn khu vực xung quanh có thể là dấu hiệu của dòng chảy xa bờ.**\n\n" +
                  "Nguyên nhân là độ sâu, dòng chảy và cát, bọt nước trong khu vực đó có thể khác những nơi bên cạnh.\n\n" +
                  "Nếu thấy dấu hiệu bất thường, em không nên xuống nước và hãy hỏi người lớn hoặc nhân viên cứu hộ."
    },

    {
        id: "rip_current_debris_sign",
        keywords: [
            'bọt nước trôi ra biển',
            'rac troi ra xa bo',
            'vật nổi bị kéo ra',
            'bọt bị cuốn ra xa',
            'đồ nổi trôi ra biển'
        ],
        response: "**Nếu thấy bọt nước hoặc các vật nổi bị cuốn từ bờ ra phía biển, đó có thể là dấu hiệu của dòng chảy xa bờ.**\n\n" +
                  "Em nên tránh xa khu vực đó và báo cho người lớn hoặc nhân viên cứu hộ.\n\n" +
                  "Không nên xuống nước để thử xem dòng chảy có mạnh hay không."
    },

    {
        id: "rip_current_before_swimming",
        keywords: [
            'trước khi tắm biển làm gì',
            'truoc khi xuong bien',
            'kiểm tra biển trước khi bơi',
            'xuống biển cần xem gì',
            'tắm biển cần quan sát gì'
        ],
        response: "**Trước khi xuống biển, em nên quan sát khu vực định tắm và hỏi người lớn hoặc nhân viên cứu hộ.**\n\n" +
                  "Hãy chú ý biển báo, cờ cảnh báo, khu vực được phép tắm và những nơi có dấu hiệu dòng chảy xa bờ.\n\n" +
                  "Không xuống nước nếu thời tiết xấu hoặc khu vực không có người lớn giám sát."
    },

    {
        id: "rip_current_ask_lifeguard",
        keywords: [
            'hỏi cứu hộ trước khi bơi',
            'hoi nhan vien cuu ho',
            'nhân viên cứu hộ biển',
            'hỏi chỗ tắm an toàn',
            'ai chỉ chỗ tắm biển'
        ],
        response: "**Nhân viên cứu hộ là người em nên hỏi khi không biết khu vực nào an toàn để tắm biển.**\n\n" +
                  "Họ có thể biết nơi nào có dòng chảy nguy hiểm, khu vực nào được phép tắm và thời điểm nào không nên xuống nước.\n\n" +
                  "Nếu không có nhân viên cứu hộ, em càng cần ở gần người lớn và không tự ý xuống nước."
    },

    {
        id: "rip_current_caught_first_action",
        keywords: [
            'bị dòng xa bờ',
            'bi dong keo ra bien',
            'bị kéo ra xa bờ',
            'gặp dòng rip',
            'bị nước kéo đi'
        ],
        response: "**Nếu bị dòng chảy xa bờ kéo đi, việc đầu tiên là phải giữ bình tĩnh.**\n\n" +
                  "Hãy kêu cứu và cố giữ cơ thể nổi.\n\n" +
                  "Tuyệt đối không cố bơi thẳng ngược dòng vào bờ vì sẽ rất nhanh mất sức.\n\n" +
                  "Nếu đã được học kỹ năng phù hợp, hãy tìm cách bơi song song hoặc hơi chéo với bờ để thoát ra khỏi dòng chảy rồi mới hướng dần vào bờ."
    },

    {
        id: "rip_current_do_not_swim_against",
        keywords: [
            'bơi ngược dòng',
            'boi nguoc dong',
            'có nên bơi thẳng vào bờ',
            'bị kéo ra biển bơi vào bờ',
            'chống dòng xa bờ'
        ],
        response: "**Không nên bơi ngược trực tiếp dòng chảy xa bờ.**\n\n" +
                  "Dòng nước có thể mạnh hơn sức bơi của con người. Cố bơi ngược dòng sẽ làm em nhanh kiệt sức.\n\n" +
                  "Hãy bình tĩnh, giữ nổi và tìm cách di chuyển ra khỏi vùng dòng chảy theo hướng song song hoặc hơi chéo với bờ."
    },

    {
        id: "rip_current_swim_parallel",
        keywords: [
            'bơi song song bờ',
            'boi song song bo',
            'thoát dòng xa bờ hướng nào',
            'bơi ngang bờ',
            'ra khỏi dòng rip'
        ],
        response: "**Khi bị dòng xa bờ cuốn, một cách thoát là bơi song song hoặc hơi chéo với bờ để ra khỏi vùng dòng chảy.**\n\n" +
                  "Dòng chảy thường chỉ hoạt động mạnh trong một vùng tương đối hẹp.\n\n" +
                  "Sau khi thoát khỏi dòng, em mới từ từ bơi về phía bờ.\n\n" +
                  "Nếu quá mệt, hãy ưu tiên giữ nổi, kêu cứu và chờ hỗ trợ."
    },

    {
        id: "rip_current_too_tired",
        keywords: [
            'bị dòng kéo mà mệt',
            'met trong dong xa bo',
            'không bơi nổi khi bị kéo',
            'đuối sức ngoài biển',
            'bị kéo ra xa hết sức'
        ],
        response: "**Nếu bị dòng chảy xa bờ kéo đi và em đã quá mệt, đừng cố bơi mạnh.**\n\n" +
                  "Hãy thả lỏng, cố giữ cơ thể nổi hoặc đứng nước nếu em đã được học kỹ năng này.\n\n" +
                  "Tiếp tục kêu cứu và tiết kiệm sức cho đến khi dòng yếu hơn hoặc có người hỗ trợ."
    },

    {
        id: "rip_current_float_and_wait",
        keywords: [
            'nổi khi bị kéo ra biển',
            'noi khi dong xa bo',
            'giữ nổi ngoài biển',
            'bị rip thì nổi',
            'đứng nước khi dòng kéo'
        ],
        response: "**Giữ cơ thể nổi là cách quan trọng để tiết kiệm sức khi bị dòng chảy xa bờ kéo đi.**\n\n" +
                  "Nếu em không thể bơi thoát ngay, hãy thả lỏng và thực hiện kỹ năng nổi ngửa hoặc đứng nước nếu đã được học.\n\n" +
                  "Khi dòng yếu hơn, mới tìm cách di chuyển ra khỏi vùng nguy hiểm và hướng về bờ."
    },

    {
        id: "rip_current_call_for_help",
        keywords: [
            'kêu cứu khi bị kéo',
            'keu cuu ngoai bien',
            'bị dòng kéo gọi ai',
            'ra hiệu cứu hộ',
            'bị cuốn ra biển'
        ],
        response: "**Khi bị dòng nước kéo ra xa bờ, hãy kêu cứu càng sớm càng tốt.**\n\n" +
                  "Em có thể hô lớn, ra hiệu bằng tay khi vẫn giữ được cơ thể nổi an toàn và cố gắng hướng về phía nhân viên cứu hộ hoặc người lớn.\n\n" +
                  "Không nên đợi đến lúc đã kiệt sức mới kêu cứu."
    },

    {
        id: "rip_current_rescue_friend",
        keywords: [
            'bạn bị dòng kéo',
            'ban bi keo ra bien',
            'cứu bạn dòng xa bờ',
            'bạn bị rip',
            'thấy người bị cuốn'
        ],
        response: "**Nếu thấy bạn bị dòng chảy xa bờ cuốn đi, em không được tự bơi ra cứu.**\n\n" +
                  "Em hãy gọi thật to để báo người lớn hoặc nhân viên cứu hộ.\n\n" +
                  "Nếu có phao hoặc vật nổi phù hợp và có thể đưa hoặc ném từ nơi an toàn, hãy sử dụng để hỗ trợ người gặp nạn.\n\n" +
                  "Không tự xuống nước vì em cũng có thể bị dòng chảy cuốn theo."
    },

    {
        id: "rip_current_throw_float",
        keywords: [
            'ném phao cho người bị cuốn',
            'nem phao dong xa bo',
            'dùng dây cứu ngoài biển',
            'quăng phao cứu',
            'vật nổi cứu người'
        ],
        response: "**Nếu có người bị dòng chảy xa bờ cuốn, có thể hỗ trợ từ nơi an toàn bằng phao hoặc vật nổi.**\n\n" +
                  "Hãy gọi người lớn, nhân viên cứu hộ và ném phao hoặc dây khi có điều kiện phù hợp.\n\n" +
                  "Trẻ em không nên tự bơi ra cứu trực tiếp."
    },

    {
        id: "rip_current_safe_beach",
        keywords: [
            'tắm biển ở đâu an toàn',
            'bai bien an toan',
            'chỗ nào được tắm biển',
            'biển có cứu hộ',
            'nơi tắm biển an toàn'
        ],
        response: "**Nơi an toàn hơn để tắm biển là khu vực được phép, có người lớn giám sát và có nhân viên cứu hộ.**\n\n" +
                  "Em cần tuân thủ biển báo, cờ cảnh báo và không tự ý đi ra ngoài khu vực được cho phép.\n\n" +
                  "Ngay cả khi biết bơi, em vẫn không nên bơi một mình hoặc bơi quá xa bờ."
    },

    {
        id: "rip_current_children_beach_rules",
        keywords: [
            'trẻ em tắm biển',
            'tre em di bien',
            'đi biển cần nhớ gì',
            'tắm biển an toàn',
            'bé đi biển'
        ],
        response: "**Khi tắm biển, em hãy nhớ:**\n\n" +
                  "✅ Luôn có người lớn đi cùng và giám sát.\n" +
                  "✅ Chỉ tắm ở khu vực được phép.\n" +
                  "✅ Quan sát biển báo và nghe nhân viên cứu hộ.\n" +
                  "✅ Không bơi một mình hoặc quá xa bờ.\n" +
                  "✅ Tránh khu vực có dấu hiệu dòng chảy xa bờ.\n\n" +
                  "Nếu chưa chắc nơi nào an toàn, đừng xuống nước."
    },

    {
        id: "rip_current_summary",
        keywords: [
            'nhớ gì về dòng xa bờ',
            'quy tac dong xa bo',
            'tóm tắt dòng rip',
            'thoát dòng xa bờ',
            'dòng xa bờ làm sao'
        ],
        response: "**Nếu gặp dòng chảy xa bờ, hãy nhớ:**\n\n" +
                  "1. **Bình tĩnh và kêu cứu.**\n" +
                  "2. **Không bơi ngược dòng.**\n" +
                  "3. **Giữ cơ thể nổi để tiết kiệm sức.**\n" +
                  "4. Nếu có khả năng, **bơi song song hoặc hơi chéo với bờ để thoát ra khỏi dòng.**\n" +
                  "5. Sau khi thoát, mới từ từ bơi vào bờ.\n\n" +
                  "Câu dễ nhớ: **Không chống dòng – Giữ nổi – Bơi ngang – Gọi cứu.**"
    },
{
        id: "water_whirlpool_definition",
        keywords: [
            'nước xoáy là gì',
            'xoáy nước',
            'nuoc xoay',
            'vùng nước xoáy',
            'dòng xoáy',
            'xoáy dưới nước'
        ],
        response: "**Nước xoáy là vùng nước chuyển động vòng tròn và có thể kéo người hoặc vật vào phía trong.**\n\n" +
                  "Nước xoáy có thể xuất hiện khi hai dòng nước chảy ngược chiều gặp nhau, ở khu vực chân thác, ghềnh nước hoặc nơi dưới đáy có địa hình đặc biệt.\n\n" +
                  "Một số vùng xoáy có lực hút rất mạnh nên cực kỳ nguy hiểm đối với người đang bơi.\n\n" +
                  "Vì vậy, khi thấy khu vực có nước xoáy hoặc dòng nước chuyển động bất thường, em phải tránh xa."
    },

    {
        id: "whirlpool_danger",
        keywords: [
            'nước xoáy có nguy hiểm không',
            'xoay nuoc nguy hiem',
            'xoáy nước có sao không',
            'bị nước xoáy',
            'dòng xoáy nguy hiểm'
        ],
        response: "**Nước xoáy rất nguy hiểm đối với người đang bơi.**\n\n" +
                  "Dòng xoáy có thể làm em mất thăng bằng, bị kéo khỏi vị trí an toàn hoặc làm em hoảng sợ và nhanh mất sức.\n\n" +
                  "Một số vùng xoáy còn có lực hút mạnh xuống phía dưới.\n\n" +
                  "Cách an toàn nhất là không tự ý bơi ở nơi có dấu hiệu nước xoáy."
    },

    {
        id: "whirlpool_locations",
        keywords: [
            'nước xoáy ở đâu',
            'noi co nuoc xoay',
            'chỗ nào dễ có xoáy',
            'xoáy thường ở đâu',
            'vùng nào có xoáy'
        ],
        response: "**Nước xoáy có thể xuất hiện ở nhiều vị trí khác nhau.**\n\n" +
                  "Theo tài liệu, em cần đặc biệt chú ý khu vực gần chân thác, ghềnh nước, nơi hai dòng nước gặp nhau, gần trụ cột hoặc tảng đá.\n\n" +
                  "Một số vùng xoáy còn có thể hình thành do địa hình đặc biệt dưới đáy sông.\n\n" +
                  "Không nên tự xuống nước để kiểm tra xem có xoáy hay không."
    },

    {
        id: "waterfall_whirlpool_risk",
        keywords: [
            'chân thác',
            'chan thac nuoc',
            'tắm gần thác',
            'bơi chân thác',
            'thác nước có xoáy'
        ],
        response: "**Không nên tắm hoặc bơi ngay gần chân thác nước.**\n\n" +
                  "Nước đổ mạnh xuống có thể tạo dòng chảy rối, dòng xiết và vùng xoáy khó nhận biết.\n\n" +
                  "Dù em biết bơi, những khu vực này vẫn có thể khiến em nhanh mất sức hoặc bị cuốn đi.\n\n" +
                  "Hãy đứng ở vị trí an toàn và tuân thủ biển cảnh báo."
    },

    {
        id: "rocks_pillars_whirlpool_risk",
        keywords: [
            'gần tảng đá',
            'gan tru cau',
            'gần trụ cột',
            'xoáy gần đá',
            'nước xoáy gần cầu'
        ],
        response: "**Khu vực gần tảng đá, trụ cầu hoặc trụ cột có thể xuất hiện dòng nước xoáy.**\n\n" +
                  "Khi nước chảy gặp vật cản, dòng nước có thể đổi hướng và tạo chuyển động bất thường.\n\n" +
                  "Vì vậy, em không nên bơi sát các trụ cầu, tảng đá hoặc công trình nằm trong dòng nước."
    },

    {
        id: "whirlpool_body_drop_sign",
        keywords: [
            'cảm giác bị sụt xuống',
            'bi sut xuong nuoc',
            'đang bơi bị hút xuống',
            'cơ thể bị kéo xuống',
            'bị tụt khi bơi'
        ],
        response: "**Nếu đang bơi mà cảm thấy cơ thể như bị sụt hoặc kéo xuống bất thường, đó có thể là dấu hiệu em đang gặp vùng nước xoáy.**\n\n" +
                  "Em cần cố giữ bình tĩnh, không hoảng loạn và tìm cách di chuyển ra khỏi vùng xoáy.\n\n" +
                  "Nếu có thể, hãy gọi người lớn hoặc nhân viên cứu hộ hỗ trợ."
    },

    {
        id: "whirlpool_first_action",
        keywords: [
            'gặp nước xoáy làm gì',
            'gap xoay nuoc',
            'bị xoáy phải làm sao',
            'rơi vào dòng xoáy',
            'xoáy nước xử lý sao'
        ],
        response: "**Khi gặp vùng nước xoáy, điều đầu tiên là phải bình tĩnh.**\n\n" +
                  "Không nên vùng vẫy hoặc bơi thẳng vào tâm xoáy.\n\n" +
                  "Theo tài liệu, cần quan sát hướng xoáy và tìm cách bơi ra phía ngoài vòng xoáy để thoát khỏi vùng nguy hiểm.\n\n" +
                  "Sau khi ra khỏi vùng xoáy, hãy tiết kiệm sức và di chuyển từ từ đến nơi an toàn."
    },

    {
        id: "whirlpool_spread_body",
        keywords: [
            'dang tay chân khi nước xoáy',
            'dang tay chan',
            'gặp xoáy nằm sấp',
            'xoáy nước nằm thế nào',
            'tư thế khi gặp xoáy'
        ],
        response: "**Theo tài liệu, khi đang bơi mà gặp vùng nước xoáy, cần bình tĩnh và có thể nằm sấp, dang rộng tay và chân.**\n\n" +
                  "Tư thế này giúp em chủ động hơn trước sự cuốn, hút của dòng nước.\n\n" +
                  "Sau đó cần tìm hướng di chuyển ra ngoài vùng xoáy thay vì bơi vào tâm."
    },

    {
        id: "whirlpool_escape_direction",
        keywords: [
            'thoát nước xoáy hướng nào',
            'boi huong nao khi xoay',
            'ra khỏi vòng xoáy',
            'bơi khỏi tâm xoáy',
            'hướng thoát xoáy'
        ],
        response: "**Khi gặp nước xoáy, không nên bơi vào tâm xoáy.**\n\n" +
                  "Theo tài liệu, cần bơi vòng theo hướng giúp em ra xa dần tâm xoáy và tìm cách vượt khỏi ảnh hưởng của dòng xoáy.\n\n" +
                  "Sau khi đã ra ngoài vùng xoáy, mới tập trung bơi đến nơi an toàn."
    },

    {
        id: "whirlpool_after_escape",
        keywords: [
            'thoát xoáy rồi làm gì',
            'sau khi thoat xoay',
            'ra khỏi nước xoáy',
            'thoát xoáy có bơi tiếp không'
        ],
        response: "**Sau khi thoát khỏi vùng nước xoáy, em cần tiết kiệm sức.**\n\n" +
                  "Theo tài liệu, có thể sử dụng bơi ếch hoặc đứng nước để hồi sức, chờ hỗ trợ hoặc từ từ di chuyển vào nơi an toàn.\n\n" +
                  "Không nên cố bơi thật nhanh nếu cơ thể đã mệt."
    },

    {
        id: "fast_current_definition",
        keywords: [
            'nước chảy xiết là gì',
            'dong chay xiet',
            'nước chảy mạnh',
            'dòng nước mạnh',
            'nước xiết'
        ],
        response: "**Nước chảy xiết là dòng nước di chuyển rất nhanh và mạnh.**\n\n" +
                  "Dòng nước này có thể làm người mất thăng bằng, bị cuốn đi và rất khó bơi ngược lại.\n\n" +
                  "Trẻ em tuyệt đối không nên xuống tắm, bơi hoặc lội qua nơi có nước chảy xiết."
    },

    {
        id: "fast_current_danger",
        keywords: [
            'nước xiết có nguy hiểm không',
            'nuoc chay manh nguy hiem',
            'dòng xiết có sao không',
            'bơi nước xiết',
            'lội nước chảy mạnh'
        ],
        response: "**Dòng nước chảy xiết rất nguy hiểm.**\n\n" +
                  "Ngay cả người biết bơi cũng có thể bị cuốn đi hoặc nhanh chóng mất sức.\n\n" +
                  "Vì vậy, em không được tự ý xuống nước khi thấy dòng chảy mạnh, đặc biệt ở sông, suối, khu vực mưa lũ hoặc gần thác."
    },

    {
        id: "do_not_swim_fast_current",
        keywords: [
            'bơi chỗ nước xiết',
            'boi nuoc chay xiet',
            'có được bơi nước mạnh không',
            'xuống dòng chảy xiết',
            'tắm chỗ nước mạnh'
        ],
        response: "**Không. Em không được bơi ở nơi có dòng nước chảy xiết.**\n\n" +
                  "Dòng nước mạnh có thể cuốn em khỏi vị trí an toàn rất nhanh.\n\n" +
                  "Ngay cả khi có người lớn ở gần hoặc em bơi giỏi, khu vực nước xiết vẫn có thể rất nguy hiểm."
    },

    {
        id: "friend_caught_whirlpool",
        keywords: [
            'bạn bị nước xoáy',
            'ban bi xoay nuoc',
            'bạn bị cuốn',
            'thấy người gặp xoáy',
            'cứu bạn nước xoáy'
        ],
        response: "**Nếu thấy bạn bị cuốn vào vùng nước xoáy, em không được tự nhảy xuống cứu.**\n\n" +
                  "Hãy lập tức gọi người lớn, nhân viên cứu hộ hoặc người có khả năng cứu hộ.\n\n" +
                  "Nếu có vật hỗ trợ phù hợp như phao, dây, gậy hoặc cành cây và em có thể sử dụng từ nơi an toàn, hãy đưa hoặc ném cho người gặp nạn.\n\n" +
                  "An toàn của người cứu phải được đặt lên trước."
    },

    {
        id: "friend_caught_fast_current",
        keywords: [
            'bạn bị nước xiết cuốn',
            'ban bi nuoc cuon',
            'cứu người dòng xiết',
            'người bị dòng mạnh cuốn',
            'bạn rơi vào nước mạnh'
        ],
        response: "**Nếu thấy người bị dòng nước xiết cuốn, trẻ em tuyệt đối không được tự nhảy xuống cứu.**\n\n" +
                  "Dòng nước có thể cuốn luôn cả người cứu.\n\n" +
                  "Hãy hô thật to, gọi người lớn hoặc lực lượng cứu hộ và tìm phao, dây hoặc vật nổi để hỗ trợ từ vị trí an toàn."
    },

    {
        id: "whirlpool_rescue_with_pole",
        keywords: [
            'dùng gậy cứu người',
            'dung gay cuu ban',
            'cành cây cứu người',
            'đưa sào cứu',
            'que dài cứu đuối'
        ],
        response: "**Có thể dùng gậy, sào hoặc cành cây để hỗ trợ người gặp nạn nếu em đang ở vị trí an toàn.**\n\n" +
                  "Hãy gọi người lớn trước, sau đó đưa đầu gậy hoặc cành cây về phía người gặp nạn để họ bám vào.\n\n" +
                  "Không đứng sát mép nước hoặc để người gặp nạn kéo em xuống.\n\n" +
                  "Nếu cảm thấy không an toàn, hãy thả vật hỗ trợ và lùi ra xa."
    },

    {
        id: "whirlpool_rescue_with_rope",
        keywords: [
            'dùng dây cứu người',
            'quang day cuu',
            'ném dây xuống nước',
            'dây cứu bạn',
            'dây cứu đuối'
        ],
        response: "**Nếu có dây và có thể sử dụng từ nơi an toàn, em có thể hỗ trợ bằng cách ném dây về phía người gặp nạn.**\n\n" +
                  "Tuy nhiên, em cần gọi người lớn hoặc cứu hộ càng sớm càng tốt.\n\n" +
                  "Không quấn dây quanh người mình hoặc đứng ở vị trí dễ bị kéo xuống nước."
    },

    {
        id: "whirlpool_rescue_with_clothes",
        keywords: [
            'dùng quần áo cứu người',
            'ao quan cuu duoi',
            'thắt lưng cứu người',
            'dùng áo kéo người',
            'vật nối cứu đuối'
        ],
        response: "**Trong tình huống khẩn cấp, có thể dùng quần áo, thắt lưng hoặc vật dài để hỗ trợ từ trên bờ nếu thật sự an toàn.**\n\n" +
                  "Mục đích là tạo một vật để người gặp nạn bám vào mà người cứu không phải xuống nước.\n\n" +
                  "Em vẫn cần gọi người lớn hoặc lực lượng cứu hộ ngay."
    },

    {
        id: "do_not_jump_into_whirlpool_rescue",
        keywords: [
            'nhảy xuống cứu người nước xoáy',
            'nhay xuong cuu ban',
            'có nên bơi ra cứu',
            'cứu trực tiếp dòng xiết',
            'lao xuống cứu người'
        ],
        response: "**Không. Trẻ em tuyệt đối không được tự nhảy xuống vùng nước xoáy hoặc dòng chảy xiết để cứu người.**\n\n" +
                  "Người cứu có thể bị cuốn theo và khiến tình huống trở nên nguy hiểm hơn.\n\n" +
                  "Cách đúng là **gọi cứu hộ – gọi người lớn – dùng vật hỗ trợ từ trên bờ nếu an toàn**."
    },

    {
        id: "whirlpool_call_rescue",
        keywords: [
            'gọi ai khi có người bị cuốn',
            'goi cuu ho',
            'ai cứu người nước xoáy',
            'báo ai khi có người gặp nạn',
            'gọi cứu nạn'
        ],
        response: "**Khi thấy người gặp nạn trong dòng nước xoáy hoặc nước xiết, hãy gọi người lớn và lực lượng cứu hộ ngay.**\n\n" +
                  "Nếu cần cấp cứu y tế, có thể gọi **115**. Trẻ em cũng nên ghi nhớ **111 – Tổng đài Quốc gia bảo vệ trẻ em**.\n\n" +
                  "Trong lúc chờ hỗ trợ, hãy đứng ở vị trí an toàn và chỉ dùng vật hỗ trợ nếu không làm mình gặp nguy hiểm."
    },

    {
        id: "whirlpool_safety_summary",
        keywords: [
            'nhớ gì về nước xoáy',
            'quy tac nuoc xoay',
            'tóm tắt nước xoáy',
            'gặp xoáy phải nhớ gì',
            'thoát xoáy'
        ],
        response: "**Khi gặp nước xoáy, em hãy nhớ:**\n\n" +
                  "1. **Bình tĩnh.**\n" +
                  "2. **Không bơi vào tâm xoáy.**\n" +
                  "3. **Tìm hướng ra ngoài vùng xoáy.**\n" +
                  "4. Sau khi thoát, **giữ sức và di chuyển đến nơi an toàn.**\n" +
                  "5. Nếu thấy người khác gặp nạn, **không tự nhảy xuống cứu.**\n\n" +
                  "Câu dễ nhớ: **Tránh xoáy – Không lao vào – Gọi cứu hộ.**"
    },
{
        id: "fall_into_water_general",
        keywords: [
            'rơi xuống nước',
            'roi xuong nuoc',
            'ngã xuống nước',
            'nga xuong nuoc',
            'rớt xuống hồ',
            'rơi xuống ao',
            'rơi xuống sông'
        ],
        response: "**Nếu bất ngờ rơi xuống nước, điều đầu tiên em cần làm là giữ bình tĩnh.**\n\n" +
                  "Không vùng vẫy mạnh hoặc cố hét liên tục vì em sẽ nhanh mất sức.\n\n" +
                  "Hãy cố giữ cơ thể nổi, đưa mũi và miệng lên khỏi mặt nước, sau đó kêu cứu khi có thể.\n\n" +
                  "Nếu em đã được học nổi ngửa hoặc đứng nước, hãy sử dụng những kỹ năng đó để giữ sức trong lúc chờ người đến giúp."
    },

    {
        id: "first_thing_when_falling_water",
        keywords: [
            'rơi xuống nước làm gì đầu tiên',
            'viec dau tien khi roi xuong nuoc',
            'ngã xuống nước phải làm sao',
            'rơi xuống hồ phải làm gì',
            'xuống nước bất ngờ'
        ],
        response: "**Việc đầu tiên là: BÌNH TĨNH.**\n\n" +
                  "Khi bất ngờ rơi xuống nước, em có thể hoảng sợ và cử động rất mạnh. Điều đó làm em nhanh mất sức và dễ bị sặc nước hơn.\n\n" +
                  "Hãy cố thả lỏng, tìm cách đưa mặt lên khỏi nước và thực hiện kỹ năng nổi ngửa hoặc đứng nước nếu em đã được học.\n\n" +
                  "Sau đó hãy kêu cứu."
    },

    {
        id: "stay_calm_falling_water",
        keywords: [
            'bình tĩnh khi rơi xuống nước',
            'binh tinh duoi nuoc',
            'bị rơi xuống nước hoảng',
            'hoảng sợ dưới nước',
            'làm sao không hoảng'
        ],
        response: "**Giữ bình tĩnh là điều rất quan trọng khi em bất ngờ rơi xuống nước.**\n\n" +
                  "Nếu hoảng loạn, em thường vùng vẫy mạnh, thở gấp và nhanh mất sức.\n\n" +
                  "Hãy cố thả lỏng cơ thể, tập trung đưa mũi và miệng lên khỏi mặt nước rồi tìm cách giữ nổi.\n\n" +
                  "Khi đã ổn định hơn, hãy gọi người xung quanh giúp đỡ."
    },

    {
        id: "do_not_struggle_falling_water",
        keywords: [
            'có nên vùng vẫy không',
            'khong vung vay duoi nuoc',
            'vùng vẫy khi rơi xuống nước',
            'đạp nước loạn có sao không',
            'rơi xuống nước có nên quẫy mạnh'
        ],
        response: "**Không nên vùng vẫy mạnh khi rơi xuống nước.**\n\n" +
                  "Vùng vẫy làm cơ thể nhanh mệt và dễ khiến nước vào miệng, mũi.\n\n" +
                  "Thay vào đó, hãy cố bình tĩnh, thả lỏng và sử dụng kỹ năng giữ nổi mà em đã được học.\n\n" +
                  "Mục tiêu là giữ được đường thở trên mặt nước và tiết kiệm sức."
    },

    {
        id: "call_for_help_falling_water",
        keywords: [
            'rơi xuống nước kêu cứu',
            'keu cuu duoi nuoc',
            'bị ngã xuống nước gọi ai',
            'kêu cứu thế nào',
            'gọi người giúp'
        ],
        response: "**Nếu em rơi xuống nước và cần giúp đỡ, hãy kêu cứu thật to khi có thể.**\n\n" +
                  "Em có thể gọi: **“Cứu với!”**, **“Cháu bị rơi xuống nước!”** hoặc gọi người lớn ở gần.\n\n" +
                  "Nếu em đang giữ nổi tốt, có thể giơ một tay để ra hiệu nhưng không nên cử động quá mạnh làm mất thăng bằng.\n\n" +
                  "Sau khi gọi, tiếp tục cố giữ nổi và chờ hỗ trợ."
    },

    {
        id: "raise_hand_for_help_water",
        keywords: [
            'giơ tay kêu cứu',
            'gio tay duoi nuoc',
            'ra hiệu khi đuối nước',
            'tín hiệu cầu cứu dưới nước',
            'giơ tay khi rơi xuống nước'
        ],
        response: "**Nếu vẫn giữ được cơ thể nổi an toàn, em có thể giơ một tay để ra hiệu cho người xung quanh.**\n\n" +
                  "Tuy nhiên, em không nên cố vẫy cả hai tay hoặc cử động quá mạnh vì có thể làm cơ thể chìm hơn.\n\n" +
                  "Ưu tiên lớn nhất vẫn là giữ mặt trên mặt nước, kêu cứu và tiết kiệm sức."
    },

    {
        id: "keep_airway_above_water",
        keywords: [
            'giữ đầu trên mặt nước',
            'giu mieng mui tren nuoc',
            'không để sặc nước',
            'giữ mặt nổi',
            'thở khi rơi xuống nước'
        ],
        response: "**Khi rơi xuống nước, em cần cố giữ mũi và miệng ở trên mặt nước để có thể thở.**\n\n" +
                  "Kỹ năng nổi ngửa hoặc đứng nước sẽ giúp em làm việc này tốt hơn.\n\n" +
                  "Nếu đầu vừa bị chìm xuống, hãy cố bình tĩnh, tránh hít vào khi đang ở dưới nước và tìm cách đưa mặt trở lại mặt nước."
    },

    {
        id: "hold_breath_initial_fall",
        keywords: [
            'nín thở khi rơi xuống nước',
            'nin tho duoi nuoc',
            'rơi xuống nước có nín thở không',
            'bị chìm phải thở sao'
        ],
        response: "**Khi vừa bất ngờ bị chìm xuống nước, em cần tránh hít nước vào đường thở.**\n\n" +
                  "Tài liệu hướng dẫn người gặp nạn cần bình tĩnh, nín thở trong lúc đầu để hạn chế bị sặc và chờ cơ thể nổi lên.\n\n" +
                  "Ngay khi mặt lên khỏi nước, hãy thở bình thường, giữ nổi và kêu cứu."
    },

    {
        id: "back_float_self_rescue",
        keywords: [
            'nổi ngửa tự cứu',
            'noi ngua tu cuu',
            'rơi xuống nước nổi ngửa',
            'nằm ngửa dưới nước',
            'nổi ngửa khi gặp nạn'
        ],
        response: "**Nổi ngửa là một kỹ năng tự cứu rất quan trọng.**\n\n" +
                  "Khi nổi ngửa đúng cách, mặt, mũi và miệng được giữ trên mặt nước nên em có thể thở và nghỉ.\n\n" +
                  "Hãy thả lỏng cơ thể, giữ đầu ngửa nhẹ và cử động tay chân vừa đủ để giữ thăng bằng.\n\n" +
                  "Em nên học kỹ năng này với giáo viên trước để có thể sử dụng khi cần."
    },

    {
        id: "tread_water_self_rescue",
        keywords: [
            'đứng nước tự cứu',
            'dung nuoc tu cuu',
            'đứng nước khi rơi xuống',
            'giữ nổi bằng đứng nước',
            'đứng nước chờ cứu'
        ],
        response: "**Đứng nước giúp em giữ đầu và đường thở trên mặt nước trong khi chờ người đến hỗ trợ.**\n\n" +
                  "Tay và chân chỉ cần cử động vừa đủ để giữ cơ thể ổn định, không nên đạp hoặc quẫy quá mạnh.\n\n" +
                  "Nếu em thấy mệt, có thể chuyển sang nổi ngửa để tiết kiệm sức hơn."
    },

    {
        id: "float_or_tread_water_choice",
        keywords: [
            'nổi ngửa hay đứng nước',
            'noi hay dung nuoc',
            'nên nổi hay đứng nước',
            'tự cứu dùng kỹ năng nào'
        ],
        response: "**Nổi ngửa và đứng nước đều là kỹ năng an toàn quan trọng.**\n\n" +
                  "Đứng nước giúp em quan sát xung quanh và gọi cứu giúp. Nổi ngửa thường giúp tiết kiệm sức hơn khi em đã mệt.\n\n" +
                  "Em nên học cả hai kỹ năng và sử dụng kỹ năng phù hợp với tình huống, khả năng của mình."
    },

    {
        id: "look_for_safe_hold",
        keywords: [
            'tìm chỗ bám',
            'tim cho bam',
            'bám gì khi rơi xuống nước',
            'bám thành bể',
            'tìm vật để bám'
        ],
        response: "**Nếu gần em có một vị trí chắc chắn và an toàn để bám, hãy từ từ di chuyển tới đó.**\n\n" +
                  "Ví dụ như thành bể, dây phao hoặc vật nổi chắc chắn.\n\n" +
                  "Không nên cố với quá xa hoặc bám vào vật không chắc chắn vì em có thể mất thăng bằng.\n\n" +
                  "Nếu không có chỗ bám, hãy tiếp tục giữ nổi và kêu cứu."
    },

    {
        id: "use_floating_object_self_rescue",
        keywords: [
            'vật nổi để tự cứu',
            'vat noi tu cuu',
            'bám phao khi rơi xuống nước',
            'bám chai nhựa',
            'có vật nổi thì làm gì'
        ],
        response: "**Nếu gần em có phao hoặc vật nổi chắc chắn, hãy cố giữ lấy để hỗ trợ cơ thể nổi.**\n\n" +
                  "Không nên trèo hoặc đè mạnh lên một vật nhỏ khiến nó tuột khỏi tay.\n\n" +
                  "Hãy ôm hoặc bám chắc, giữ mặt trên mặt nước và tiếp tục gọi người giúp đỡ."
    },

    {
        id: "unexpected_fall_cannot_swim",
        keywords: [
            'không biết bơi bị rơi xuống nước',
            'khong biet boi roi xuong nuoc',
            'không biết bơi phải làm sao',
            'chưa biết bơi bị ngã xuống hồ'
        ],
        response: "**Nếu chưa biết bơi mà bất ngờ rơi xuống nước, em càng cần bình tĩnh.**\n\n" +
                  "Không vùng vẫy mạnh. Hãy cố thả lỏng, đưa mặt lên khỏi nước và kêu cứu.\n\n" +
                  "Nếu em đã từng được học nổi ngửa hoặc kỹ năng tự nổi, hãy sử dụng ngay.\n\n" +
                  "Nếu có vật nổi hoặc chỗ bám an toàn ở gần, hãy từ từ tiếp cận."
    },

    {
        id: "unexpected_fall_known_swimmer",
        keywords: [
            'biết bơi bị rơi xuống nước',
            'biet boi bi roi xuong nuoc',
            'bơi giỏi bị ngã xuống nước',
            'biết bơi thì tự cứu sao'
        ],
        response: "**Ngay cả khi biết bơi, em vẫn cần giữ bình tĩnh khi bất ngờ rơi xuống nước.**\n\n" +
                  "Không nên lập tức bơi thật nhanh nếu chưa biết mình đang ở đâu hoặc dòng nước có nguy hiểm không.\n\n" +
                  "Hãy nổi lên, quan sát xung quanh, đánh giá chỗ an toàn rồi mới từ từ di chuyển.\n\n" +
                  "Nếu thấy mệt hoặc dòng nước bất thường, hãy giữ nổi và gọi hỗ trợ."
    },

    {
        id: "turn_body_to_back_float",
        keywords: [
            'xoay người nổi ngửa',
            'xoay tu the duoi nuoc',
            'từ sấp sang ngửa',
            'rơi xuống nước xoay người',
            'đổi tư thế dưới nước'
        ],
        response: "**Biết xoay chuyển tư thế cơ thể giúp em xử lý tốt hơn khi bất ngờ rơi xuống nước.**\n\n" +
                  "Nếu đang ở tư thế sấp hoặc mất phương hướng, em có thể sử dụng kỹ năng đã học để chuyển sang nổi ngửa hoặc đứng nước.\n\n" +
                  "Việc này giúp em kiểm soát hơi thở và giảm hoảng loạn.\n\n" +
                  "Kỹ năng này cần được luyện tập trước trong lớp học bơi an toàn."
    },

    {
        id: "unexpected_fall_disoriented",
        keywords: [
            'mất phương hướng dưới nước',
            'mat phuong huong duoi nuoc',
            'rơi xuống nước không biết hướng',
            'không biết đâu là mặt nước',
            'bị chìm hoảng loạn'
        ],
        response: "**Khi bất ngờ rơi xuống nước, em có thể bị mất phương hướng và rất dễ hoảng sợ.**\n\n" +
                  "Hãy cố giữ bình tĩnh và sử dụng những kỹ năng đã học để đưa cơ thể lên mặt nước.\n\n" +
                  "Khi mặt lên khỏi nước, hãy ổn định tư thế bằng nổi ngửa hoặc đứng nước rồi mới tìm cách thoát ra."
    },

    {
        id: "self_rescue_if_alone",
        keywords: [
            'rơi xuống nước không có ai',
            'khong co ai cuu',
            'một mình rơi xuống nước',
            'không ai nghe kêu cứu',
            'tự cứu khi một mình'
        ],
        response: "**Nếu chưa có người đến giúp, em cần cố duy trì trạng thái an toàn càng lâu càng tốt.**\n\n" +
                  "Hãy giữ cơ thể nổi bằng nổi ngửa hoặc đứng nước, tiết kiệm sức và tiếp tục quan sát xung quanh.\n\n" +
                  "Nếu xác định được vị trí an toàn ở gần và em có khả năng di chuyển, hãy từ từ tiến về đó.\n\n" +
                  "Không nên cố bơi thật nhanh khi đã mệt."
    },

    {
        id: "self_rescue_move_to_shore",
        keywords: [
            'tự bơi vào bờ',
            'tu boi vao bo',
            'rơi xuống nước vào bờ thế nào',
            'tự cứu vào bờ',
            'bơi về nơi an toàn'
        ],
        response: "**Nếu đã giữ được bình tĩnh và xác định được nơi an toàn, em có thể từ từ di chuyển vào bờ theo khả năng của mình.**\n\n" +
                  "Không nên cố bơi nhanh hoặc bơi quá sức.\n\n" +
                  "Nếu thấy mệt, hãy chuyển sang nổi ngửa hoặc đứng nước để nghỉ và gọi hỗ trợ."
    },

    {
        id: "self_rescue_do_not_overexert",
        keywords: [
            'có nên cố bơi vào bờ',
            'co boi het suc khong',
            'bơi hết sức khi gặp nạn',
            'mệt vẫn cố bơi',
            'đuối sức có bơi tiếp'
        ],
        response: "**Không nên cố bơi đến kiệt sức.**\n\n" +
                  "Nếu em cảm thấy quá mệt, việc cố bơi nhanh có thể khiến em mất khả năng giữ nổi.\n\n" +
                  "Hãy nghỉ bằng nổi ngửa hoặc đứng nước, gọi cứu giúp và chỉ tiếp tục di chuyển khi cơ thể ổn định hơn."
    },

    {
        id: "self_rescue_breath_control",
        keywords: [
            'thở thế nào khi tự cứu',
            'tho khi gap nan',
            'thở dưới nước sao',
            'giữ nhịp thở khi nổi',
            'thở chậm dưới nước'
        ],
        response: "**Khi đã đưa mặt lên khỏi nước, hãy cố gắng thở chậm và đều.**\n\n" +
                  "Thở quá nhanh do hoảng sợ sẽ làm em nhanh mệt hơn.\n\n" +
                  "Giữ nhịp thở ổn định kết hợp với nổi ngửa hoặc đứng nước sẽ giúp em tiết kiệm sức trong lúc chờ hỗ trợ."
    },

    {
        id: "self_rescue_safe_skills_to_learn",
        keywords: [
            'cần học kỹ năng tự cứu nào',
            'hoc ky nang tu cuu',
            'kỹ năng sinh tồn cần học',
            'học gì để tự cứu dưới nước',
            'kỹ năng khi rơi xuống nước'
        ],
        response: "**Để tự bảo vệ mình khi gặp sự cố dưới nước, em nên học một số kỹ năng quan trọng:**\n\n" +
                  "✅ Nổi ngửa.\n" +
                  "✅ Đứng nước.\n" +
                  "✅ Xoay chuyển tư thế cơ thể.\n" +
                  "✅ Kiểm soát hơi thở.\n" +
                  "✅ Kêu cứu và nhận biết nơi an toàn.\n\n" +
                  "Những kỹ năng này nên được học và thực hành với giáo viên hoặc người hướng dẫn."
    },

    {
        id: "self_rescue_not_same_as_swimming",
        keywords: [
            'tự cứu có phải biết bơi không',
            'tu cuu va boi',
            'biết bơi là đủ chưa',
            'bơi giỏi có cần tự cứu',
            'biết bơi với tự cứu khác nhau'
        ],
        response: "**Biết bơi và biết tự cứu không hoàn toàn giống nhau.**\n\n" +
                  "Biết bơi giúp em di chuyển trong nước, nhưng kỹ năng tự cứu còn bao gồm giữ bình tĩnh, nổi ngửa, đứng nước, kiểm soát hơi thở và xử lý khi bất ngờ rơi xuống nước.\n\n" +
                  "Vì vậy, ngay cả người biết bơi vẫn cần học kỹ năng tự cứu."
    },

    {
        id: "self_rescue_summary",
        keywords: [
            'nhớ gì khi rơi xuống nước',
            'quy tac tu cuu',
            'tóm tắt tự cứu',
            'tự cứu thế nào',
            'rơi xuống nước nhớ gì'
        ],
        response: "**Nếu bất ngờ rơi xuống nước, em hãy nhớ:**\n\n" +
                  "1. **Bình tĩnh.**\n" +
                  "2. **Không vùng vẫy mạnh.**\n" +
                  "3. **Giữ mũi, miệng trên mặt nước.**\n" +
                  "4. **Nổi ngửa hoặc đứng nước nếu đã được học.**\n" +
                  "5. **Kêu cứu và tìm chỗ bám an toàn.**\n" +
                  "6. Chỉ từ từ di chuyển vào bờ khi đủ sức và xác định được nơi an toàn.\n\n" +
                  "Câu dễ nhớ: **Bình tĩnh – Giữ nổi – Kêu cứu – Tìm an toàn.**"
    },
 {
        id: "see_drowning_person_general",
        keywords: [
            'thấy người đuối nước',
            'thay nguoi duoi nuoc',
            'bạn bị đuối nước',
            'ban bi duoi nuoc',
            'người rơi xuống nước',
            'thấy bạn gặp nạn'
        ],
        response: "**Nếu thấy một người đang bị đuối nước, em cần hành động nhanh nhưng phải bảo đảm an toàn cho mình.**\n\n" +
                  "Việc đầu tiên là **hô thật to để gọi người lớn, nhân viên cứu hộ hoặc người xung quanh đến giúp**.\n\n" +
                  "Em không được tự nhảy xuống nước để cứu, kể cả khi em biết bơi.\n\n" +
                  "Nếu có thể hỗ trợ từ trên bờ, hãy tìm phao, dây, gậy, cành cây hoặc vật nổi để đưa hoặc ném cho người gặp nạn."
    },

    {
        id: "do_not_jump_rescue",
        keywords: [
            'có nên nhảy xuống cứu',
            'nhay xuong cuu ban',
            'bơi ra cứu bạn',
            'xuống nước cứu người',
            'lao xuống cứu',
            'cứu trực tiếp được không'
        ],
        response: "**Không. Trẻ em không nên tự nhảy xuống nước để cứu người bị đuối nước.**\n\n" +
                  "Người đang hoảng loạn có thể bấu, ôm hoặc kéo người cứu xuống nước.\n\n" +
                  "Khi đó, thay vì một người gặp nạn có thể trở thành hai người cùng nguy hiểm.\n\n" +
                  "Em hãy nhớ: **Gọi người lớn – Dùng vật hỗ trợ – Không tự xuống nước.**"
    },

    {
        id: "good_swimmer_can_rescue",
        keywords: [
            'bơi giỏi có cứu được không',
            'boi gioi cuu ban',
            'biết bơi có nên cứu',
            'bơi giỏi nhảy xuống cứu',
            'em bơi giỏi mà'
        ],
        response: "**Biết bơi giỏi vẫn chưa đủ để cứu đuối trực tiếp.**\n\n" +
                  "Cứu một người đang hoảng loạn dưới nước khó hơn rất nhiều so với bơi bình thường.\n\n" +
                  "Người gặp nạn có thể bấu víu rất mạnh và kéo cả người cứu xuống nước.\n\n" +
                  "Vì vậy, học sinh vẫn nên cứu từ trên bờ và gọi người lớn hoặc nhân viên cứu hộ chuyên nghiệp."
    },

    {
        id: "call_adult_when_drowning",
        keywords: [
            'bạn đuối nước gọi ai',
            'goi ai cuu ban',
            'thấy người chìm báo ai',
            'gọi người lớn',
            'gọi cứu hộ'
        ],
        response: "**Khi thấy người gặp nạn dưới nước, hãy gọi người lớn hoặc nhân viên cứu hộ ngay.**\n\n" +
                  "Em có thể hô thật to: **“Có người bị đuối nước! Cứu với!”** để mọi người chú ý.\n\n" +
                  "Nếu có điện thoại và tình huống cần cấp cứu y tế, có thể gọi **115**.\n\n" +
                  "Trong khi chờ người lớn, chỉ hỗ trợ từ vị trí an toàn."
    },

    {
        id: "rescue_from_shore_general",
        keywords: [
            'cứu từ trên bờ',
            'cuu tren bo',
            'cứu bạn không xuống nước',
            'cứu đuối gián tiếp',
            'cách cứu an toàn'
        ],
        response: "**Cứu từ trên bờ là cách phù hợp và an toàn hơn đối với học sinh.**\n\n" +
                  "Em có thể dùng vật dài để người gặp nạn bám vào, hoặc ném vật nổi cho họ.\n\n" +
                  "Các vật có thể dùng gồm gậy, cành cây, sào, dây, quần áo nối lại, phao hoặc can nhựa rỗng.\n\n" +
                  "Luôn gọi thêm người lớn hỗ trợ."
    },

    {
        id: "rescue_near_shore",
        keywords: [
            'người đuối gần bờ',
            'gan bo cuu sao',
            'bạn bị đuối gần bờ',
            'người ở sát bờ',
            'cứu người gần mép nước'
        ],
        response: "**Nếu người gặp nạn ở gần bờ, em vẫn không được đưa tay trực tiếp cho họ nắm.**\n\n" +
                  "Hãy tìm gậy, sào, cành cây, mái chèo hoặc một vật dài để đưa về phía họ.\n\n" +
                  "Em cần đứng hoặc nằm ở vị trí thật chắc chắn để không bị kéo xuống nước.\n\n" +
                  "Hướng dẫn người gặp nạn bám vào vật rồi gọi người lớn cùng hỗ trợ kéo vào bờ."
    },

    {
        id: "do_not_offer_bare_hand",
        keywords: [
            'đưa tay kéo người đuối',
            'dua tay cho ban nam',
            'nắm tay người đuối',
            'kéo bạn bằng tay',
            'có nên đưa tay không'
        ],
        response: "**Không nên đưa tay trần trực tiếp cho người đang hoảng loạn dưới nước nắm.**\n\n" +
                  "Người gặp nạn có thể nắm rất chặt và kéo em xuống theo.\n\n" +
                  "Hãy dùng một vật dài như gậy, cành cây, sào hoặc dây để giữ khoảng cách an toàn."
    },

    {
        id: "rescue_with_stick",
        keywords: [
            'dùng gậy cứu người',
            'dung gay cuu nguoi',
            'gậy cứu đuối',
            'đưa sào cứu bạn',
            'cành cây cứu người'
        ],
        response: "**Nếu người gặp nạn ở gần bờ, em có thể dùng gậy, sào hoặc cành cây để hỗ trợ.**\n\n" +
                  "Hãy gọi người lớn trước, sau đó giữ cơ thể ở vị trí chắc chắn và đưa đầu vật đó về phía người gặp nạn.\n\n" +
                  "Bảo họ bám thật chắc rồi từ từ kéo về phía bờ.\n\n" +
                  "Nếu em cảm thấy mình có thể bị kéo xuống nước, hãy thả vật ra và lùi lại."
    },

    {
        id: "rescue_with_rope",
        keywords: [
            'dùng dây cứu người',
            'dung day cuu ban',
            'ném dây cứu',
            'dây cứu đuối',
            'quăng dây'
        ],
        response: "**Dây có thể được dùng để hỗ trợ người gặp nạn từ trên bờ.**\n\n" +
                  "Nếu người ở xa tầm gậy, có thể ném dây về phía họ và hướng dẫn họ bám hoặc nắm chắc.\n\n" +
                  "Em cần đứng ở nơi chắc chắn và nên có người lớn hỗ trợ khi kéo.\n\n" +
                  "Không quấn dây quanh người mình vì có thể bị kéo xuống nước."
    },

    {
        id: "rescue_with_clothes",
        keywords: [
            'dùng áo cứu người',
            'quan ao cuu duoi',
            'nối quần áo cứu',
            'dùng khăn cứu bạn',
            'thắt lưng cứu người'
        ],
        response: "**Khi không có dây hoặc gậy, có thể dùng quần áo, khăn hoặc thắt lưng làm vật nối nếu đủ chắc chắn.**\n\n" +
                  "Mục đích là để người gặp nạn có vật bám mà em không phải tiến sát mép nước.\n\n" +
                  "Nếu vật quá ngắn hoặc không chắc chắn, đừng cố sử dụng. Hãy tiếp tục gọi người lớn và tìm vật phù hợp hơn."
    },

    {
        id: "throw_lifebuoy",
        keywords: [
            'ném phao cứu người',
            'nem phao cuu ban',
            'quăng phao',
            'phao cứu đuối',
            'ném áo phao'
        ],
        response: "**Nếu có phao hoặc áo phao, hãy ném về phía người gặp nạn để họ bám vào.**\n\n" +
                  "Cố ném vật nổi đến gần họ nhưng không cần em phải bước xuống nước.\n\n" +
                  "Sau đó tiếp tục gọi người lớn hoặc nhân viên cứu hộ để đưa người gặp nạn vào bờ."
    },

    {
        id: "throw_floating_object",
        keywords: [
            'ném vật nổi',
            'vat noi cuu nguoi',
            'can nhựa cứu đuối',
            'thùng nhựa cứu người',
            'bóng cứu người'
        ],
        response: "**Nếu không có phao, em có thể tìm vật nổi phù hợp để ném cho người gặp nạn.**\n\n" +
                  "Theo tài liệu, có thể dùng vòng phao, quả bóng, can nhựa hoặc vật khác có khả năng nổi.\n\n" +
                  "Người gặp nạn có thể bám vào vật đó để giữ cơ thể nổi trong lúc chờ hỗ trợ.\n\n" +
                  "Em vẫn phải gọi người lớn hoặc cứu hộ ngay."
    },

    {
        id: "plastic_container_rescue",
        keywords: [
            'can nhựa cứu người',
            'chai nhựa cứu bạn',
            'can rong cuu duoi',
            'thùng nhựa nổi',
            'bình nhựa cứu người'
        ],
        response: "**Một can hoặc thùng nhựa rỗng, có nắp kín và nổi tốt có thể được dùng làm vật hỗ trợ trong tình huống khẩn cấp.**\n\n" +
                  "Em có thể ném vật đó về phía người gặp nạn để họ bám vào.\n\n" +
                  "Không cần cố ném thật trúng người; chỉ cần vật nổi ở đủ gần để họ có thể với tới.\n\n" +
                  "Sau đó tiếp tục gọi cứu hộ hoặc người lớn."
    },

    {
        id: "rescue_far_from_shore",
        keywords: [
            'người đuối xa bờ',
            'xa bo cuu sao',
            'bạn bị đuối xa',
            'người ở giữa hồ',
            'cứu người ngoài xa'
        ],
        response: "**Nếu người bị đuối nước ở xa bờ, trẻ em tuyệt đối không được bơi ra cứu.**\n\n" +
                  "Hãy nhanh chóng gọi người lớn hoặc lực lượng cứu hộ.\n\n" +
                  "Nếu có phao, can nhựa, bóng hoặc vật nổi, có thể ném ra cho người gặp nạn bám.\n\n" +
                  "Nếu có dây đủ dài và sử dụng được an toàn, người lớn có thể dùng dây để hỗ trợ kéo vào bờ."
    },

    {
        id: "talk_to_drowning_person",
        keywords: [
            'nói gì với người đuối',
            'noi gi voi ban duoi nuoc',
            'trấn an người gặp nạn',
            'bảo bạn bình tĩnh',
            'động viên người đuối'
        ],
        response: "**Nếu người gặp nạn còn nghe được, em có thể nói thật to để giúp họ bình tĩnh.**\n\n" +
                  "Ví dụ: **“Bình tĩnh nhé! Bám vào phao!”**, **“Có người đang đến giúp!”** hoặc **“Giữ lấy cây này!”**\n\n" +
                  "Việc trấn an có thể giúp họ bớt hoảng sợ và thực hiện theo hướng dẫn."
    },

    {
        id: "safe_position_when_pulling",
        keywords: [
            'đứng thế nào khi kéo người',
            'tu the cuu tren bo',
            'kéo người sao cho an toàn',
            'nằm xuống kéo bạn',
            'không bị kéo xuống nước'
        ],
        response: "**Khi hỗ trợ kéo người từ trên bờ, em phải giữ tư thế thật chắc chắn.**\n\n" +
                  "Tài liệu hướng dẫn có thể nằm thấp xuống để cơ thể vững hơn và giảm nguy cơ bị kéo xuống nước.\n\n" +
                  "Không đứng sát mép nước hoặc cúi người quá xa.\n\n" +
                  "Tốt nhất nên có thêm người lớn hỗ trợ."
    },

    {
        id: "if_victim_grabs_rescuer",
        keywords: [
            'người đuối nắm tay mình',
            'bi nam tay khi cuu',
            'bạn kéo mình xuống',
            'người gặp nạn bấu mình',
            'bị kéo xuống nước'
        ],
        response: "**Nếu người gặp nạn cố nắm hoặc kéo trực tiếp em xuống nước, em phải ưu tiên an toàn của mình.**\n\n" +
                  "Hãy buông tay hoặc lùi ra khỏi mép nước, sau đó tiếp tục dùng vật hỗ trợ như gậy, dây hoặc phao.\n\n" +
                  "Không cố giữ người bằng tay nếu em có nguy cơ bị kéo xuống."
    },

    {
        id: "rescue_multiple_friends",
        keywords: [
            'nhiều bạn bị đuối',
            'nhieu nguoi duoi nuoc',
            'hai bạn bị rơi xuống nước',
            'cả nhóm gặp nạn',
            'nhiều người gặp nạn'
        ],
        response: "**Nếu có nhiều người cùng gặp nạn, em càng không được tự xuống nước cứu.**\n\n" +
                  "Hãy hô thật to để gọi nhiều người lớn và lực lượng cứu hộ đến hỗ trợ.\n\n" +
                  "Nếu có nhiều phao hoặc vật nổi, hãy ném về phía những người gặp nạn.\n\n" +
                  "Không để thêm người trở thành nạn nhân vì cố cứu trực tiếp."
    },

    {
        id: "friend_falls_in_pool",
        keywords: [
            'bạn rơi xuống hồ bơi',
            'ban roi xuong be',
            'bạn chìm ở bể bơi',
            'thấy bạn gặp nạn ở hồ',
            'bạn bị đuối trong bể'
        ],
        response: "**Nếu thấy bạn gặp nạn trong bể bơi, hãy gọi nhân viên cứu hộ, giáo viên hoặc người lớn ngay.**\n\n" +
                  "Không tự nhảy xuống cứu nếu em chưa được đào tạo cứu hộ.\n\n" +
                  "Nếu gần đó có phao hoặc vật hỗ trợ, hãy đưa hoặc ném cho bạn trong khi chờ người lớn đến."
    },

    {
        id: "friend_falls_in_river",
        keywords: [
            'bạn rơi xuống sông',
            'ban roi xuong song',
            'bạn bị cuốn sông',
            'người rơi xuống sông',
            'thấy bạn chìm ở sông'
        ],
        response: "**Nếu bạn rơi xuống sông, em tuyệt đối không được nhảy theo xuống cứu.**\n\n" +
                  "Sông có thể có nước sâu, dòng chảy mạnh hoặc nước xoáy.\n\n" +
                  "Hãy gọi người lớn hoặc cứu hộ ngay và tìm phao, dây, gậy hoặc vật nổi để hỗ trợ từ bờ."
    },

    {
        id: "friend_falls_in_pond",
        keywords: [
            'bạn rơi xuống ao',
            'ban roi xuong ao',
            'bạn chìm trong ao',
            'cứu bạn ở ao',
            'người rơi xuống hồ'
        ],
        response: "**Nếu bạn rơi xuống ao hoặc hồ, em không nên tự xuống nước.**\n\n" +
                  "Hãy hô cứu, gọi người lớn và tìm vật dài hoặc vật nổi để hỗ trợ.\n\n" +
                  "Đừng đứng sát mép ao vì bờ có thể trơn và em cũng có thể bị rơi xuống."
    },

    {
        id: "rescue_order_to_remember",
        keywords: [
            'cứu bạn theo thứ tự nào',
            'thu tu cuu duoi',
            'cứu người bắt đầu từ đâu',
            'thấy người đuối làm gì trước'
        ],
        response: "**Khi thấy người bị đuối nước, em có thể nhớ thứ tự sau:**\n\n" +
                  "1. **Hô cứu thật to.**\n" +
                  "2. **Gọi người lớn hoặc cứu hộ.**\n" +
                  "3. **Không tự nhảy xuống nước.**\n" +
                  "4. **Đưa vật dài** nếu người ở gần bờ.\n" +
                  "5. **Ném vật nổi** nếu người ở xa hơn.\n\n" +
                  "An toàn của em phải được bảo đảm trong suốt quá trình giúp đỡ."
    },

    {
        id: "safe_rescue_memory_rule",
        keywords: [
            'quy tắc cứu đuối',
            'quy tac cuu ban',
            'nhớ gì khi cứu người',
            'cứu đuối an toàn nhớ gì',  'nguyên tắc cứu đuối',
            'câu dễ nhớ cứu đuối'
        ],
        response: "**Em hãy nhớ câu: GỌI – ĐƯA – NÉM – KHÔNG NHẢY.**\n\n" +
                  "📣 **GỌI:** Gọi người lớn hoặc cứu hộ.\n" +
                  "🦯 **ĐƯA:** Đưa gậy, sào, cành cây nếu người ở gần.\n" +
                  "🛟 **NÉM:** Ném phao, dây hoặc vật nổi nếu ở xa.\n" +
                  "🚫 **KHÔNG NHẢY:** Trẻ em không tự nhảy xuống cứu trực tiếp.\n\n" +
                  "Đây là cách giúp người khác mà vẫn bảo vệ được chính mình."
    },
{
        id: "after_drowning_rescue_general",
        keywords: [
            'đưa người lên bờ rồi làm gì',
            'len bo roi lam gi',
            'cứu lên bờ',
            'sau khi cứu đuối',
            'vớt người lên bờ',
            'người đuối lên bờ'
        ],
        response: "**Sau khi đưa người gặp nạn lên bờ, cần nhanh chóng kiểm tra tình trạng của họ và gọi người lớn hỗ trợ.**\n\n" +
                  "Hãy đưa người bị nạn đến vị trí an toàn, quan sát xem họ có tỉnh táo, phản ứng và thở hay không.\n\n" +
                  "Nếu tình trạng nghiêm trọng, cần gọi cấp cứu **115** ngay.\n\n" +
                  "Học sinh không nên tự thực hiện những kỹ thuật sơ cấp cứu phức tạp nếu chưa được hướng dẫn và luyện tập đúng cách."
    },

    {
        id: "check_drowning_person_response",
        keywords: [
            'kiểm tra người bị đuối',
            'kiem tra nan nhan',
            'người bị đuối có tỉnh không',
            'kiểm tra phản ứng',
            'gọi mà không trả lời'
        ],
        response: "**Sau khi người gặp nạn đã ở nơi an toàn, cần kiểm tra xem họ có phản ứng hay không.**\n\n" +
                  "Có thể gọi to, nói chuyện với họ và quan sát xem họ có trả lời hoặc cử động hay không.\n\n" +
                  "Nếu người đó không phản ứng, hãy gọi người lớn và cấp cứu **115** ngay."
    },

    {
        id: "drowning_person_awake",
        keywords: [
            'người bị đuối còn tỉnh',
            'nan nhan con tinh',
            'cứu lên vẫn tỉnh',
            'người đuối nói được',
            'còn phản ứng'
        ],
        response: "**Nếu người gặp nạn còn tỉnh, hãy giúp họ ở nơi an toàn và trấn an để họ bình tĩnh.**\n\n" +
                  "Không nên để họ tiếp tục xuống nước hoặc tự ý bỏ đi ngay.\n\n" +
                  "Hãy gọi người lớn đến hỗ trợ và tiếp tục quan sát tình trạng của họ.\n\n" +
                  "Nếu xuất hiện ho nhiều, khó thở, mệt bất thường hoặc nhận thức không bình thường thì cần được đưa đến cơ sở y tế."
    },

    {
        id: "drowning_person_unconscious",
        keywords: [
            'người bị đuối bất tỉnh',
            'bat tinh sau duoi nuoc',
            'cứu lên không tỉnh',
            'không phản ứng',
            'người đuối nằm im'
        ],
        response: "**Nếu người bị đuối nước không tỉnh hoặc không phản ứng, đây là tình huống khẩn cấp.**\n\n" +
                  "Hãy gọi thật to để tìm người lớn trợ giúp và gọi cấp cứu **115** ngay.\n\n" +
                  "Nếu có người đã được huấn luyện sơ cấp cứu, họ cần nhanh chóng kiểm tra hô hấp và thực hiện các bước cấp cứu phù hợp.\n\n" +
                  "Không mất thời gian làm những việc như dốc ngược hoặc xốc nước."
    },

    {
        id: "drowning_person_not_breathing",
        keywords: [
            'người bị đuối không thở',
            'khong tho sau duoi nuoc',
            'cứu lên không thở',
            'ngừng thở',
            'không thấy thở'
        ],
        response: "**Nếu người gặp nạn không thở, cần gọi cấp cứu 115 và người lớn hỗ trợ ngay lập tức.**\n\n" +
                  "Đây là tình huống cần sơ cấp cứu khẩn cấp.\n\n" +
                  "Người đã được học và thực hành kỹ năng hồi sức cần thực hiện theo đúng kỹ thuật đã được hướng dẫn.\n\n" +
                  "Tuyệt đối không dốc ngược người bị nạn để cố làm nước chảy ra."
    },

    {
        id: "call_115_drowning",
        keywords: [
            'gọi 115 khi nào',
            'goi 115 duoi nuoc',
            'số cấp cứu đuối nước',
            'gọi cấp cứu',
            'cấp cứu số mấy'
        ],
        response: "**Trong tình huống đuối nước nghiêm trọng, hãy gọi cấp cứu y tế 115.**\n\n" +
                  "Đặc biệt cần gọi ngay nếu người gặp nạn bất tỉnh, không thở, khó thở hoặc có biểu hiện bất thường sau khi được đưa lên bờ.\n\n" +
                  "Nếu em là học sinh, hãy vừa gọi người lớn vừa nhờ người khác gọi 115 càng sớm càng tốt."
    },

    {
        id: "first_aid_get_adult_help",
        keywords: [
            'em có tự sơ cứu được không',
            'hoc sinh so cuu',
            'gọi người lớn giúp',
            'trẻ em sơ cứu',
            'em phải làm gì'
        ],
        response: "**Học sinh cần gọi người lớn hỗ trợ càng sớm càng tốt.**\n\n" +
                  "Nếu em đã được thầy cô hoặc người có chuyên môn hướng dẫn kỹ năng sơ cấp cứu, em có thể thực hiện những kỹ năng phù hợp mà mình đã được học.\n\n" +
                  "Nếu chưa được học, ưu tiên của em là **gọi người lớn – gọi 115 – giữ hiện trường an toàn**."
    },

    {
        id: "cpr_definition_simple",
        keywords: [
            'cpr là gì',
            'CPR',
            'hồi sức tim phổi',
            'hoi suc tim phoi',
            'ép tim hô hấp'
        ],
        response: "**CPR là hồi sức tim phổi, một kỹ thuật cấp cứu được sử dụng khi người gặp nạn bị ngừng tim hoặc ngừng thở.**\n\n" +
                  "Tài liệu giới thiệu CPR gồm các nội dung về tuần hoàn, đường thở và hô hấp.\n\n" +
                  "Đây là kỹ năng cần được học và thực hành đúng cách với người hướng dẫn chuyên môn.\n\n" +
                  "Học sinh không nên tự tập CPR trên bạn bè để thử."
    },

    {
        id: "cab_first_aid_meaning",
        keywords: [
            'CAB là gì',
            'cab so cuu',
            'C A B cấp cứu',
            'quy trình CAB'
        ],
        response: "**Trong tài liệu, CAB là cách ghi nhớ các nội dung sơ cấp cứu:**\n\n" +
                  "**C – Circulation:** Tuần hoàn, ép tim ngoài lồng ngực.\n" +
                  "**A – Airway:** Khai thông đường thở và kiểm tra hơi thở.\n" +
                  "**B – Breathing:** Hỗ trợ hô hấp.\n\n" +
                  "Đây là kỹ năng thực hành cần được giáo viên hoặc người có chuyên môn hướng dẫn trực tiếp."
    },

    {
        id: "chest_compression_only_if_trained",
        keywords: [
            'ép tim người đuối nước',
            'ep tim cuu nguoi',
            'ấn ngực người đuối',
            'có phải ép tim không',
            'ép tim thế nào'
        ],
        response: "**Ép tim ngoài lồng ngực là một kỹ năng sơ cấp cứu quan trọng khi người gặp nạn ngừng tim.**\n\n" +
                  "Tuy nhiên, với học sinh, kỹ năng này cần được học và luyện tập đúng cách dưới sự hướng dẫn của người có chuyên môn.\n\n" +
                  "Nếu gặp tình huống thật mà em chưa được học, hãy gọi người lớn và cấp cứu **115** ngay thay vì tự đoán cách thực hiện."
    },

    {
        id: "rescue_breathing_only_if_trained",
        keywords: [
            'hô hấp nhân tạo',
            'ho hap nhan tao',
            'thổi ngạt',
            'thổi hơi cứu người',
            'hà hơi'
        ],
        response: "**Hô hấp nhân tạo là một phần của kỹ năng hồi sức được tài liệu giới thiệu trong sơ cấp cứu.**\n\n" +
                  "Kỹ thuật này cần được học và thực hành đúng cách với người hướng dẫn.\n\n" +
                  "Nếu em chưa từng được huấn luyện, hãy gọi người lớn và 115 ngay để người có kỹ năng thực hiện."
    },

    {
        id: "do_not_upend_drowning_victim",
        keywords: [
            'xốc nước',
            'soc nuoc',
            'dốc ngược người đuối',
            'vác người chạy',
            'úp người cho ra nước',
            'dốc nước ra'
        ],
        response: "**Tuyệt đối không xốc nước hoặc dốc ngược người bị đuối nước.**\n\n" +
                  "Không nên vác người gặp nạn lên vai rồi chạy hoặc treo ngược để cố làm nước chảy ra.\n\n" +
                  "Việc này làm chậm thời gian cấp cứu cần thiết và có thể khiến tình trạng nguy hiểm hơn.\n\n" +
                  "Hãy gọi cấp cứu và tập trung vào các bước sơ cấp cứu đúng đã được hướng dẫn."
    },

    {
        id: "why_not_upend_drowning_victim",
        keywords: [
            'vì sao không xốc nước',
            'tai sao khong soc nuoc',
            'dốc ngược có sao không',
            'xốc nước nguy hiểm'
        ],
        response: "**Không nên xốc nước vì vấn đề nguy hiểm chính của người bị đuối nước là thiếu oxy, không phải cần dốc cho nước chảy ra trước.**\n\n" +
                  "Xốc ngược người gặp nạn sẽ làm chậm việc cung cấp oxy và cấp cứu cần thiết.\n\n" +
                  "Tài liệu cũng cảnh báo việc này có thể làm chất trong dạ dày trào ngược vào đường thở."
    },

    {
        id: "do_not_waste_time_drain_water",
        keywords: [
            'có cần làm nước chảy ra không',
            'lay nuoc ra khoi nguoi',
            'nước trong phổi làm sao',
            'đổ nước ra trước',
            'làm cho hết nước'
        ],
        response: "**Không nên mất thời gian cố dốc hoặc xốc người gặp nạn để làm nước chảy ra.**\n\n" +
                  "Nếu người đó không tỉnh hoặc không thở, cần gọi cấp cứu và thực hiện sơ cấp cứu đúng cách càng sớm càng tốt.\n\n" +
                  "Thời gian rất quan trọng trong cấp cứu đuối nước."
    },

    {
        id: "do_not_practice_cpr_on_friends",
        keywords: [
            'tập ép tim với bạn',
            'tap cpr voi ban',
            'thử hô hấp nhân tạo',
            'tập sơ cứu trên người',
            'thực hành ép tim bạn'
        ],
        response: "**Không được thực hành thử CPR hoặc các kỹ thuật sơ cấp cứu trên bạn bè khỏe mạnh.**\n\n" +
                  "Tài liệu yêu cầu học sinh thực hành trên **mô hình** khi học kỹ năng.\n\n" +
                  "Chỉ thực hiện trên người thật khi đó là người đang gặp nạn và kỹ năng cần được áp dụng để cấp cứu."
    },

    {
        id: "practice_first_aid_on_mannequin",
        keywords: [
            'tập sơ cứu bằng gì',
            'mo hinh so cuu',
            'tập CPR ở đâu',
            'học ép tim thế nào',
            'tập hồi sức'
        ],
        response: "**Khi học sơ cấp cứu, học sinh nên thực hành trên mô hình dưới sự hướng dẫn của giáo viên hoặc người có chuyên môn.**\n\n" +
                  "Không nên dùng bạn bè làm người để thử ép tim hoặc các kỹ thuật hồi sức.\n\n" +
                  "Việc luyện tập đúng giúp em biết phải làm gì khi thật sự gặp tình huống khẩn cấp."
    },

    {
        id: "drowning_person_coughing_after_rescue",
        keywords: [
            'cứu lên bị ho',
            'ho sau khi sặc nước',
            'ho sau boi',
            'sặc nước rồi ho',
            'người đuối ho nhiều'
        ],
        response: "**Sau khi tắm, bơi hoặc bị sặc nước, nếu người đó ho nhiều hoặc có biểu hiện bất thường thì cần được người lớn theo dõi.**\n\n" +
                  "Nếu có khó thở, mệt nhiều, khó chịu hoặc nhận thức không bình thường, tài liệu khuyến cáo cần đến cơ sở y tế gần nhất để kiểm tra."
    },

    {
        id: "breathing_difficulty_after_water",
        keywords: [
            'khó thở sau sặc nước',
            'kho tho sau boi',
            'sặc nước khó thở',
            'lên bờ vẫn khó thở',
            'thở mệt sau bơi'
        ],
        response: "**Khó thở sau khi bị sặc nước là dấu hiệu không nên bỏ qua.**\n\n" +
                  "Theo tài liệu, sau khi tắm, bơi hoặc sặc nước mà xuất hiện khó thở, ho, mệt mỏi hoặc nhận thức bất thường thì cần đến cơ sở y tế để được kiểm tra kịp thời.\n\n" +
                  "Hãy báo ngay cho người lớn."
    },

    {
        id: "fatigue_after_water_incident",
        keywords: [
            'mệt sau sặc nước',
            'met sau khi duoi nuoc',
            'cứu lên vẫn mệt',
            'mệt bất thường sau bơi',
            'đuối sức sau sặc'
        ],
        response: "**Nếu sau khi bị sặc nước hoặc gặp sự cố dưới nước mà vẫn mệt bất thường, cần báo cho người lớn.**\n\n" +
                  "Đặc biệt nếu đi kèm ho, khó thở, khó chịu hoặc nhận thức bất thường thì nên được đưa đến cơ sở y tế kiểm tra."
    },

    {
        id: "abnormal_behavior_after_water",
        keywords: [
            'lơ mơ sau sặc nước',
            'lo mo sau boi',
            'không tỉnh táo sau bơi',
            'nhận thức bất thường',
            'sặc nước rồi lơ mơ'
        ],
        response: "**Lơ mơ hoặc nhận thức bất thường sau khi bị sặc nước là dấu hiệu cần được người lớn xử lý ngay.**\n\n" +
                  "Không để người đó tự đi về hoặc tiếp tục vui chơi.\n\n" +
                  "Hãy báo người lớn và đưa đến cơ sở y tế để được kiểm tra."
    },

    {
        id: "medical_check_after_water_symptoms",
        keywords: [
            'sặc nước có cần đi viện',
            'sac nuoc di vien',
            'khi nào đi bệnh viện',
            'sau đuối nước đi khám',
            'cần đến cơ sở y tế không'
        ],
        response: "**Nếu sau khi bơi hoặc sặc nước có triệu chứng bất thường, cần đến cơ sở y tế kiểm tra.**\n\n" +
                  "Các dấu hiệu tài liệu nêu gồm **mệt mỏi, khó thở, ho, khó chịu hoặc nhận thức bất thường**.\n\n" +
                  "Em hãy báo ngay cho bố mẹ, thầy cô hoặc người lớn nếu bản thân hoặc bạn có những biểu hiện này."
    },

    {
        id: "comfort_drowning_person_after_rescue",
        keywords: [
            'trấn an người bị đuối',
            'tran an nan nhan',
            'người bị đuối sợ hãi',
            'cứu lên khóc',
            'nói gì sau khi cứu'
        ],
        response: "**Sau khi đưa người gặp nạn lên nơi an toàn, hãy giúp họ bình tĩnh.**\n\n" +
                  "Có thể nói nhẹ nhàng rằng đã có người giúp và bảo họ nghỉ tại chỗ.\n\n" +
                  "Đồng thời gọi người lớn đến kiểm tra tình trạng và bảo vệ họ khỏi những nguy cơ khác."
    },

    {
        id: "first_aid_scene_safety",
        keywords: [
            'hiện trường an toàn',
            'hien truong an toan',
            'sơ cứu ở đâu',
            'đưa người ra chỗ an toàn',
            'nơi sơ cứu'
        ],
        response: "**Trước khi sơ cấp cứu, cần bảo đảm khu vực xung quanh an toàn.**\n\n" +
                  "Không sơ cứu ở vị trí mà bản thân người cứu có thể tiếp tục rơi xuống nước hoặc gặp nguy hiểm.\n\n" +
                  "Sau khi người gặp nạn được đưa khỏi nơi nguy hiểm, hãy gọi trợ giúp và tiến hành các bước phù hợp."
    },

    {
        id: "first_aid_time_is_important",
        keywords: [
            'cấp cứu có cần nhanh không',
            'cap cuu nhanh',
            'thời gian cấp cứu',
            'có được chờ không',
            'chậm sơ cứu có sao không'
        ],
        response: "**Trong sơ cấp cứu, thời gian rất quan trọng.**\n\n" +
                  "Nếu người gặp nạn bất tỉnh hoặc không thở, không nên mất thời gian vào những việc không cần thiết như xốc nước.\n\n" +
                  "Hãy gọi người trợ giúp và cấp cứu **115** càng sớm càng tốt."
    },

    {
        id: "first_aid_summary_for_children",
        keywords: [
            'nhớ gì sau khi cứu người',
            'quy tac so cuu',
            'tóm tắt sơ cứu',
            'lên bờ phải nhớ gì',
            'sơ cứu đuối nước nhớ gì'
        ],
        response: "**Sau khi người gặp nạn được đưa lên bờ, em hãy nhớ:**\n\n" +
                  "1. **Đưa đến nơi an toàn.**\n" +
                  "2. **Gọi người lớn và kiểm tra phản ứng.**\n" +
                  "3. Nếu nghiêm trọng, **gọi 115 ngay.**\n" +
                  "4. **Không xốc nước, không dốc ngược người gặp nạn.**\n" +
                  "5. Kỹ thuật CPR chỉ thực hiện theo kỹ năng đã được học và hướng dẫn.\n" +
                  "6. Nếu sau sặc nước có ho, khó thở, mệt hoặc lơ mơ, cần đến cơ sở y tế.\n\n" +
                  "Câu dễ nhớ: **An toàn – Gọi người lớn – Gọi 115 – Không xốc nước.**"
    },
{
        id: "flood_safety_general",
        keywords: [
            'an toàn mùa lũ',
            'nuoc lu',
            'ngập lụt',
            'mưa lũ',
            'phòng đuối nước khi lũ',
            'trời lụt làm gì'
        ],
        response: "**Khi có mưa lớn, ngập lụt hoặc nước lũ, em cần đặc biệt cẩn thận.**\n\n" +
                  "Không tự ý đi vào vùng nước ngập, không chơi đùa trong nước lũ và không cố đi qua nơi có dòng nước chảy mạnh.\n\n" +
                  "Nước lũ thường đục nên em không nhìn thấy hố sâu, cống, vật sắc nhọn hoặc những nguy hiểm bên dưới.\n\n" +
                  "Hãy ở nơi an toàn, đi cùng người lớn và làm theo hướng dẫn của gia đình, nhà trường và chính quyền địa phương."
    },

    {
        id: "do_not_enter_flood_water",
        keywords: [
            'có được đi vào nước lũ không',
            'di vao nuoc lu',
            'lội nước ngập',
            'xuống nước lũ',
            'đi qua vùng ngập'
        ],
        response: "**Không nên đi vào vùng nước lũ hoặc vùng ngập.**\n\n" +
                  "Ngay cả khi nước nhìn có vẻ nông, bên dưới vẫn có thể có hố sâu, cống bị mất nắp, vật sắc nhọn hoặc dòng nước mạnh.\n\n" +
                  "Cách an toàn nhất là tránh nước lũ và tìm đường hoặc nơi trú an toàn."
    },

    {
        id: "flood_water_shallow_still_dangerous",
        keywords: [
            'nước lũ cạn có nguy hiểm không',
            'nuoc can co nguy hiem',
            'ngập ít có đi được không',
            'nước lũ thấp',
            'nước chỉ tới chân'
        ],
        response: "**Nước lũ nhìn cạn vẫn có thể nguy hiểm.**\n\n" +
                  "Dòng nước chảy mạnh có thể làm em mất thăng bằng, trong khi nước đục khiến em không nhìn thấy hố, cống hoặc vật nằm dưới chân.\n\n" +
                  "Vì vậy, không nên tự lội qua chỉ vì thấy mực nước thấp."
    },

    {
        id: "flood_fast_current",
        keywords: [
            'nước lũ chảy xiết',
            'nuoc lu chay manh',
            'dòng lũ mạnh',
            'nước ngập chảy nhanh',
            'lũ cuốn'
        ],
        response: "**Tuyệt đối không đi vào vùng nước lũ đang chảy xiết.**\n\n" +
                  "Dòng nước mạnh có thể cuốn trôi cả cây cối, xe và các vật lớn, nên trẻ em càng dễ bị mất thăng bằng và cuốn đi.\n\n" +
                  "Hãy tránh xa và chờ người lớn hoặc lực lượng có trách nhiệm hướng dẫn."
    },

    {
        id: "flood_water_is_murky",
        keywords: [
            'nước lũ đục',
            'nuoc ngap duc',
            'không thấy đáy',
            'nước đục nguy hiểm',
            'đường ngập không thấy gì'
        ],
        response: "**Nước lũ thường đục nên rất khó nhìn thấy nguy hiểm bên dưới.**\n\n" +
                  "Có thể có hố sâu, cống, vật sắc nhọn hoặc chỗ trũng mà em không thể nhận ra bằng mắt.\n\n" +
                  "Vì vậy, không nên dùng chân để dò đường hoặc tự đi vào vùng nước đục."
    },

    {
        id: "open_manhole_flood_risk",
        keywords: [
            'hố ga ngập nước',
            'ho ga mat nap',
            'cống ngập',
            'cống không nắp khi mưa',
            'miệng cống dưới nước',
            'hố ga bị che'
        ],
        response: "**Hố ga hoặc cống bị ngập là một nguy cơ rất lớn khi trời mưa to.**\n\n" +
                  "Nước ngập có thể che kín miệng cống hoặc hố ga bị mất nắp nên em không thể nhìn thấy.\n\n" +
                  "Nếu bước vào đó, em có thể bị rơi xuống hoặc bị dòng nước cuốn.\n\n" +
                  "Không đi qua vùng nước ngập khi không biết rõ bên dưới có gì."
    },

    {
        id: "street_flood_manhole",
        keywords: [
            'đường ngập có hố ga',
            'duong ngap ho ga',
            'đi trên phố ngập',
            'mưa to đường ngập',
            'hố ga ngoài đường'
        ],
        response: "**Khi đường phố bị ngập, em cần đề phòng hố ga và cống thoát nước bị che khuất.**\n\n" +
                  "Nắp cống có thể bị hỏng hoặc bị nước cuốn đi mà em không nhìn thấy.\n\n" +
                  "Không tự lội qua đường ngập; hãy tìm nơi an toàn và chờ người lớn hỗ trợ."
    },

    {
        id: "sharp_objects_in_flood_water",
        keywords: [
            'vật nhọn dưới nước',
            'vat sac trong nuoc lu',
            'dẫm phải đồ dưới nước',
            'rác dưới nước ngập',
            'đi chân trong nước lũ'
        ],
        response: "**Trong nước lũ có thể có nhiều vật nguy hiểm mà em không nhìn thấy.**\n\n" +
                  "Ví dụ như mảnh kim loại, vật sắc nhọn, nắp cống hoặc đồ vật bị nước cuốn trôi.\n\n" +
                  "Những vật này có thể làm em bị thương hoặc mắc chân.\n\n" +
                  "Vì vậy, hãy tránh đi vào nước lũ."
    },

    {
        id: "electric_shock_flood_water",
        keywords: [
            'điện dưới nước ngập',
            'dien giat nuoc lu',
            'nước ngập có điện không',
            'dây điện trong nước',
            'điện giật khi ngập'
        ],
        response: "**Nước ngập có thể có nguy cơ điện giật.**\n\n" +
                  "Điện có thể truyền qua nước nếu có dây điện hoặc thiết bị điện bị hỏng, rò điện.\n\n" +
                  "Em không nên đến gần dây điện, cột điện hoặc vùng nước nghi có điện.\n\n" +
                  "Hãy báo ngay cho người lớn và tránh xa khu vực đó."
    },

    {
        id: "flooded_home_electricity",
        keywords: [
            'nhà ngập có điện',
            'nha ngap dien',
            'ổ điện bị ngập',
            'nước vào nhà có nguy hiểm không',
            'điện khi nhà ngập'
        ],
        response: "**Nếu nhà bị ngập, điện là một nguy cơ rất nguy hiểm.**\n\n" +
                  "Tài liệu lưu ý cần chú ý ngắt các nguồn điện khi nhà bị ngập.\n\n" +
                  "Trẻ em không được tự chạm vào ổ cắm, dây điện hoặc thiết bị điện đang ở gần nước.\n\n" +
                  "Hãy để người lớn xử lý."
    },

    {
        id: "flood_life_jacket",
        keywords: [
            'lũ có cần áo phao',
            'ao phao mua lu',
            'gần nước lũ mặc gì',
            'đi qua vùng lũ cần áo phao',
            'áo phao khi ngập'
        ],
        response: "**Khi buộc phải ở gần vùng nước lũ, áo phao là thiết bị an toàn rất quan trọng.**\n\n" +
                  "Tài liệu khuyến cáo khi ở trong hoặc gần vùng nước lũ nên mặc áo phao để phòng trường hợp bất ngờ rơi xuống nước.\n\n" +
                  "Tuy nhiên, mặc áo phao không có nghĩa là em được tự ý đi vào vùng nước lũ."
    },

    {
        id: "follow_local_flood_instructions",
        keywords: [
            'nghe ai khi có lũ',
            'huong dan mua lu',
            'chính quyền báo lũ',
            'lũ phải nghe ai',
            'cảnh báo lũ'
        ],
        response: "**Khi có lũ lụt, em cần làm theo hướng dẫn của người lớn và chính quyền địa phương.**\n\n" +
                  "Không tự ý đi sang nơi khác hoặc làm theo lời rủ rê của bạn bè.\n\n" +
                  "Các hướng dẫn sơ tán, đường đi an toàn và khu vực nguy hiểm cần được tuân thủ nghiêm túc."
    },

    {
        id: "school_trip_home_storm_flood",
        keywords: [
            'đi học về gặp lũ',
            'di hoc ve gap mua',
            'tan học gặp ngập',
            'đường về bị lụt',
            'đang về nhà gặp mưa giông'
        ],
        response: "**Nếu trên đường đi học về gặp lụt hoặc mưa giông, em không nên cố tiếp tục đi qua vùng nguy hiểm.**\n\n" +
                  "Theo tài liệu, em nên **quay lại trường hoặc tìm nơi trú an toàn gần nhất**.\n\n" +
                  "Sau đó nhờ người lớn gọi bố mẹ hoặc người chăm sóc đến đón."
    },

    {
        id: "return_to_school_when_flooded",
        keywords: [
            'đường ngập có quay lại trường không',
            'quay lai truong khi mua',
            'không về nhà được vì lũ',
            'tan học đường ngập',
            'mưa lũ quay lại đâu'
        ],
        response: "**Có. Nếu đường về nhà bị ngập hoặc có mưa giông nguy hiểm, quay lại trường là một lựa chọn an toàn theo hướng dẫn trong tài liệu.**\n\n" +
                  "Nếu không thể quay lại trường, hãy tìm chỗ trú an toàn gần nhất và nhờ người lớn liên hệ với gia đình."
    },

    {
        id: "find_safe_shelter_storm",
        keywords: [
            'trú mưa ở đâu',
            'tim cho tru an toan',
            'gặp mưa giông trú đâu',
            'lụt thì trú đâu',
            'chỗ an toàn khi mưa'
        ],
        response: "**Khi gặp mưa giông hoặc ngập lụt trên đường, em cần tìm nơi trú an toàn.**\n\n" +
                  "Tài liệu khuyến cáo quay lại trường hoặc tìm chỗ trú an toàn gần nhất rồi nhờ người gọi gia đình đến đón.\n\n" +
                  "Không trú ở ngay sát sông, suối, cống, hố nước hoặc vùng đang bị ngập."
    },

    {
        id: "call_parents_when_flooded",
        keywords: [
            'gặp lũ gọi bố mẹ',
            'goi bo me mua lu',
            'đường về ngập gọi ai',
            'nhờ gọi gia đình',
            'mưa lớn không về được'
        ],
        response: "**Nếu mưa lũ làm em không thể về nhà an toàn, hãy nhờ người lớn liên hệ với bố mẹ hoặc người chăm sóc.**\n\n" +
                  "Em nên ở yên tại trường hoặc nơi trú an toàn cho đến khi có người đến đón.\n\n" +
                  "Không tự ý tìm đường khác qua vùng ngập."
    },

    {
        id: "do_not_play_in_floodwater",
        keywords: [
            'chơi nước ngập',
            'choi nuoc mua',
            'tắm nước lũ',
            'nghịch nước ngập',
            'bơi ngoài đường ngập'
        ],
        response: "**Không được chơi, tắm hoặc nghịch trong nước lũ và nước ngập.**\n\n" +
                  "Nước có thể chảy mạnh, che hố sâu, cống hoặc vật sắc nhọn và còn có nguy cơ điện giật.\n\n" +
                  "Hãy chọn khu vực khô ráo, an toàn để vui chơi."
    },

    {
        id: "do_not_cross_flooded_road",
        keywords: [
            'qua đường ngập',
            'di qua duong ngap',
            'lội qua đường lũ',
            'đường ngập có đi qua không',
            'băng qua nước lũ'
        ],
        response: "**Không nên tự băng qua đường đang ngập.**\n\n" +
                  "Em khó biết đoạn đường có bị sụt, có hố ga mở hay dòng nước mạnh hay không.\n\n" +
                  "Hãy dừng lại ở nơi an toàn và nhờ người lớn hỗ trợ."
    },

    {
        id: "flood_current_can_move_objects",
        keywords: [
            'lũ cuốn được gì',
            'nuoc lu cuon xe',
            'dòng lũ mạnh cỡ nào',
            'lũ cuốn cây',
            'nước lũ có mạnh không'
        ],
        response: "**Nước lũ chảy mạnh có thể cuốn cả cây cối, ô tô và các vật lớn.**\n\n" +
                  "Điều đó cho thấy sức nước rất mạnh và trẻ em không thể chống lại bằng sức của mình.\n\n" +
                  "Vì vậy, tuyệt đối tránh xa dòng nước đang chảy xiết."
    },

    {
        id: "flood_move_only_when_instructed",
        keywords: [
            'có nên tự sơ tán không',
            'tu di khi lu',
            'lũ có tự đi nơi khác không',
            'di chuyển khi lũ',
            'sơ tán thế nào'
        ],
        response: "**Khi có lũ, em không nên tự ý di chuyển một mình.**\n\n" +
                  "Hãy đi cùng gia đình, thầy cô hoặc người có trách nhiệm và làm theo hướng dẫn sơ tán.\n\n" +
                  "Tài liệu lưu ý cần xác định đường đến nơi an toàn và hạn chế di chuyển trên vùng nước, đặc biệt ở nơi nước chảy xiết."
    },

    {
        id: "avoid_large_flooded_areas",
        keywords: [
            'cánh đồng ngập',
            'song lon mua lu',
            'đi qua đồng ngập',
            'vùng nước rộng',
            'khu ngập lớn'
        ],
        response: "**Không nên tự di chuyển qua sông lớn, cánh đồng rộng bị ngập hoặc vùng nước chảy mạnh.**\n\n" +
                  "Những nơi này khó xác định độ sâu, hướng dòng chảy và rất khó được trợ giúp nếu xảy ra sự cố.\n\n" +
                  "Hãy ở cùng người lớn và đi theo tuyến đường an toàn được hướng dẫn."
    },

    {
        id: "flood_children_supervision",
        keywords: [
            'trẻ em khi có lũ',
            'tre em mua lu',
            'lũ có cần người lớn trông',
            'trông trẻ mùa lũ',
            'bé ở vùng ngập'
        ],
        response: "**Khi có lũ, trẻ em cần được người lớn trông nom chặt chẽ hơn bình thường.**\n\n" +
                  "Nước có thể dâng nhanh và tạo thêm nhiều khu vực nguy hiểm quanh nhà hoặc nơi sơ tán.\n\n" +
                  "Em không nên tự ý rời khỏi chỗ ở an toàn hoặc đi chơi gần nước."
    },

    {
        id: "flood_emergency_float_items",
        keywords: [
            'vật nổi mùa lũ',
            'phao mua lu',
            'can nhựa khi lũ',
            'chuẩn bị gì khi lũ',
            'dụng cụ nổi mùa lũ'
        ],
        response: "**Tài liệu khuyến cáo gia đình ở vùng lũ nên chuẩn bị các phương tiện nổi và cứu sinh như áo phao, phao cứu sinh hoặc can nhựa phù hợp.**\n\n" +
                  "Những vật này dùng để hỗ trợ an toàn khi thật sự cần thiết.\n\n" +
                  "Trẻ em không nên lấy các dụng cụ cứu sinh ra chơi."
    },

    {
        id: "flood_water_health_risk",
        keywords: [
            'nước lũ bẩn',
            'nuoc lu co ban khong',
            'nước ngập có hại',
            'lội nước lũ có sao không',
            'nước lũ có bệnh không'
        ],
        response: "**Tài liệu khuyến cáo tránh nước lũ ngay cả khi nước không chảy.**\n\n" +
                  "Ngoài nguy cơ đuối nước, nước lũ còn có thể gây hại cho sức khỏe và có nhiều vật nguy hiểm bên dưới.\n\n" +
                  "Vì vậy, em không nên tự lội hoặc nghịch trong nước ngập."
    },

    {
        id: "flood_safety_summary",
        keywords: [
            'nhớ gì khi có lũ',
            'quy tac mua lu',
            'an toàn khi ngập',
            'tóm tắt mùa lũ',
            'gặp nước lũ làm gì'
        ],
        response: "**Khi có mưa lớn, ngập lụt hoặc nước lũ, em hãy nhớ:**\n\n" +
                  "1. **Không đi vào nước lũ.**\n" +
                  "2. **Không chơi hoặc bơi trong nước ngập.**\n" +
                  "3. Đề phòng **hố ga, cống, hố sâu và vật sắc nhọn bị nước che khuất.**\n" +
                  "4. Tránh xa **dây điện và khu vực có nguy cơ điện giật.**\n" +
                  "5. Nếu trên đường đi học về gặp lũ, **quay lại trường hoặc tìm nơi trú an toàn và nhờ gọi gia đình.**\n" +
                  "6. Làm theo hướng dẫn của người lớn và chính quyền địa phương.\n\n" +
                  "Câu dễ nhớ: **Không lội – Không chơi – Tránh điện – Tìm nơi an toàn.**"
    },
{
        id: "bad_weather_swimming_general",
        keywords: [
            'thời tiết xấu có bơi không',
            'troi xau co boi khong',
            'mưa gió đi bơi',
            'giông sét đi bơi',
            'trời xấu xuống nước'
        ],
        response: "**Không nên bơi hoặc lội khi thời tiết đang xấu hoặc có dấu hiệu sắp xấu đi.**\n\n" +
                  "Các tình huống như mưa to, gió lớn, giông hoặc sấm sét đều không phù hợp để tiếp tục hoạt động dưới nước.\n\n" +
                  "Nếu thời tiết thay đổi khi em đang bơi, hãy làm theo hướng dẫn của người lớn hoặc giáo viên và ra khỏi nước để đến nơi an toàn."
    },

    {
        id: "swimming_in_rain",
        keywords: [
            'mưa có bơi được không',
            'mua co boi khong',
            'bơi lúc trời mưa',
            'đang mưa đi bơi',
            'tắm mưa dưới hồ'
        ],
        response: "**Không nên tiếp tục bơi khi trời mưa, đặc biệt là ở bể bơi ngoài trời hoặc vùng nước tự nhiên.**\n\n" +
                  "Tài liệu quy định không bơi, lội khi thời tiết đang hoặc sắp chuyển xấu.\n\n" +
                  "Nếu trời bắt đầu mưa khi em đang ở dưới nước, hãy nghe hướng dẫn của giáo viên hoặc người lớn và ra khỏi nước."
    },

    {
        id: "swimming_in_thunderstorm",
        keywords: [
            'giông có bơi không',
            'giong co boi khong',
            'trời giông đi bơi',
            'bơi lúc có giông',
            'giông bão xuống nước'
        ],
        response: "**Không được bơi, lội khi có giông.**\n\n" +
                  "Giông là dấu hiệu thời tiết xấu và có thể đi kèm mưa lớn, gió mạnh hoặc sấm sét.\n\n" +
                  "Em cần rời khu vực nước và đến nơi an toàn theo hướng dẫn của người lớn."
    },

    {
        id: "swimming_when_lightning",
        keywords: [
            'sét có bơi được không',
            'set co boi khong',
            'có sét đi bơi',
            'bơi khi có sét',
            'sấm sét dưới nước'
        ],
        response: "**Khi có sấm sét, không được tiếp tục bơi hoặc lội.**\n\n" +
                  "Tài liệu xếp sấm sét vào nhóm thời tiết xấu mà học sinh không được bơi, lội.\n\n" +
                  "Hãy ra khỏi nước và làm theo hướng dẫn của giáo viên, nhân viên bể bơi hoặc người lớn."
    },

    {
        id: "swimming_when_thunder",
        keywords: [
            'nghe sấm có bơi không',
            'nghe sam khi boi',
            'đang bơi nghe sấm',
            'có tiếng sấm',
            'sấm rồi có bơi tiếp'
        ],
        response: "**Nếu đang bơi mà nghe thấy sấm, em không nên tiếp tục bơi.**\n\n" +
                  "Sấm là dấu hiệu thời tiết đã hoặc đang chuyển xấu.\n\n" +
                  "Hãy ra khỏi nước, tập trung cùng người lớn hoặc giáo viên và làm theo hướng dẫn an toàn."
    },

    {
        id: "swimming_in_strong_wind",
        keywords: [
            'gió to có bơi không',
            'gio lon di boi',
            'đang bơi gió mạnh',
            'bơi lúc gió lớn',
            'trời gió to'
        ],
        response: "**Không nên bơi ở bể ngoài trời khi có gió to.**\n\n" +
                  "Nội quy lớp học bơi trong tài liệu quy định không bơi ngoài trời khi thời tiết xấu như mưa, gió to hoặc sấm sét.\n\n" +
                  "Nếu gió mạnh xuất hiện khi đang bơi, hãy ra khỏi nước theo hướng dẫn của người phụ trách."
    },

    {
        id: "weather_about_to_turn_bad",
        keywords: [
            'trời sắp mưa có bơi không',
            'sap mua co boi khong',
            'trời sắp giông',
            'mây đen đi bơi',
            'thời tiết sắp xấu'
        ],
        response: "**Không cần đợi đến khi mưa to mới dừng bơi.**\n\n" +
                  "Tài liệu quy định không bơi, lội cả khi thời tiết **đang hoặc sắp chuyển xấu**.\n\n" +
                  "Nếu người lớn, giáo viên hoặc nhân viên cứu hộ yêu cầu dừng bơi vì thời tiết, em cần lên bờ ngay."
    },

    {
        id: "weather_changes_while_swimming",
        keywords: [
            'đang bơi trời đổi',
            'dang boi troi mua',
            'đang bơi gặp giông',
            'đang bơi có sấm',
            'mưa bất ngờ khi bơi'
        ],
        response: "**Nếu thời tiết bất ngờ xấu đi khi em đang bơi, không nên cố bơi tiếp.**\n\n" +
                  "Hãy bình tĩnh, di chuyển đến lối lên bờ an toàn và làm theo hướng dẫn của giáo viên hoặc người lớn.\n\n" +
                  "Sau khi ra khỏi nước, đến khu vực an toàn và không tự ý quay lại bơi khi thời tiết chưa bảo đảm."
    },

    {
        id: "leave_water_bad_weather",
        keywords: [
            'khi nào phải lên bờ',
            'len bo khi mua',
            'mưa thì ra khỏi nước',
            'có sấm phải lên không',
            'dừng bơi khi nào'
        ],
        response: "**Khi xuất hiện mưa to, gió lớn, giông hoặc sấm sét, em cần dừng hoạt động dưới nước.**\n\n" +
                  "Hãy lên bờ bằng lối an toàn và nghe hướng dẫn của người quản lý, giáo viên hoặc người lớn.\n\n" +
                  "Không nên nán lại dưới nước để chơi thêm."
    },

    {
        id: "do_not_wait_for_heavy_rain",
        keywords: [
            'chưa mưa to có bơi được không',
            'chua mua co boi khong',
            'mới có giông thôi',
            'mưa nhỏ vẫn bơi',
            'chưa có mưa lớn'
        ],
        response: "**Không nên chờ đến khi thời tiết trở nên rất xấu mới dừng bơi.**\n\n" +
                  "Nguyên tắc trong tài liệu là không bơi, lội khi thời tiết **đang hoặc sắp chuyển xấu**.\n\n" +
                  "Nếu có cảnh báo hoặc người lớn yêu cầu lên bờ, em cần thực hiện ngay."
    },

    {
        id: "outdoor_pool_bad_weather",
        keywords: [
            'hồ bơi ngoài trời mưa',
            'be boi ngoai troi mua',
            'bể bơi ngoài trời có sét',
            'gió to ở hồ bơi',
            'mưa ở bể bơi'
        ],
        response: "**Bể bơi ngoài trời không nên tổ chức bơi khi thời tiết xấu.**\n\n" +
                  "Tài liệu nêu rõ không bơi ở bể ngoài trời khi có mưa, gió to hoặc sấm sét.\n\n" +
                  "Em cần nghiêm chỉnh làm theo nội quy của bể bơi và hướng dẫn của giáo viên."
    },

    {
        id: "follow_swimming_teacher_bad_weather",
        keywords: [
            'thầy bảo dừng bơi',
            'giao vien bao len bo',
            'huấn luyện viên cho nghỉ',
            'cứu hộ yêu cầu lên bờ',
            'có phải nghe thầy không'
        ],
        response: "**Có. Khi giáo viên, huấn luyện viên hoặc người phụ trách yêu cầu dừng bơi, em cần thực hiện ngay.**\n\n" +
                  "Họ có trách nhiệm theo dõi điều kiện an toàn, trong đó có thời tiết.\n\n" +
                  "Không tự ý quay xuống nước khi chưa được phép."
    },

    {
        id: "storm_on_way_home",
        keywords: [
            'đi học về gặp giông',
            'di hoc ve gap giong',
            'tan học gặp mưa giông',
            'đường về có giông',
            'mưa giông trên đường'
        ],
        response: "**Nếu trên đường đi học về gặp mưa giông, em không nên cố đi tiếp qua khu vực nguy hiểm.**\n\n" +
                  "Theo tài liệu, em nên quay lại trường hoặc tìm chỗ trú an toàn gần nhất.\n\n" +
                  "Sau đó nhờ người lớn gọi bố mẹ hoặc người chăm sóc đến đón."
    },

    {
        id: "safe_shelter_during_storm",
        keywords: [
            'mưa giông trú đâu',
            'tru dau khi giong',
            'gặp giông tìm chỗ nào',
            'chỗ trú an toàn',
            'mưa to trú ở đâu'
        ],
        response: "**Khi gặp mưa giông trên đường, hãy tìm chỗ trú an toàn gần nhất.**\n\n" +
                  "Nếu đang trên đường đi học về, tài liệu khuyến cáo có thể quay lại trường hoặc tìm nơi trú an toàn rồi nhờ người gọi gia đình đến đón.\n\n" +
                  "Không tự ý tiếp tục đi qua khu vực ngập hoặc vùng nước nguy hiểm."
    },

    {
        id: "do_not_play_near_water_in_storm",
        keywords: [
            'mưa giông chơi gần ao',
            'choi gan song khi mua',
            'giông chơi gần hồ',
            'mưa to ra bờ sông',
            'trời giông gần nước'
        ],
        response: "**Khi thời tiết xấu, em không nên chơi ở gần ao, hồ, sông, suối hoặc các vùng nước mở.**\n\n" +
                  "Tài liệu yêu cầu học sinh luôn cẩn thận khi vui chơi gần vùng nước và không bơi, lội khi có mưa to, giông hoặc sét.\n\n" +
                  "Hãy vào nơi an toàn và chờ thời tiết ổn định."
    },

    {
        id: "bad_weather_swimming_summary",
        keywords: [
            'nhớ gì khi trời mưa',
            'quy tac troi xau',
            'mưa giông khi bơi',
            'tóm tắt thời tiết xấu',
            'trời xấu phải làm gì'
        ],
        response: "**Khi thời tiết xấu, em hãy nhớ:**\n\n" +
                  "1. **Không bơi, lội khi mưa to, giông, sét hoặc gió lớn.**\n" +
                  "2. Nếu đang bơi mà thời tiết xấu đi, **ra khỏi nước theo hướng dẫn**.\n" +
                  "3. Không tự quay lại bơi khi chưa được phép.\n" +
                  "4. Nếu gặp mưa giông trên đường đi học về, **quay lại trường hoặc tìm nơi trú an toàn và nhờ gọi gia đình**.\n\n" +
                  "Câu dễ nhớ: **Trời xấu – Không xuống nước – Đang bơi thì lên bờ.**"
    },
{
        id: "pool_rules_general",
        keywords: [
            'nội quy bể bơi',
            'noi quy be boi',
            'đi hồ bơi cần nhớ gì',
            'quy tắc hồ bơi',
            'ở bể bơi phải làm gì'
        ],
        response: "**Khi đến bể bơi, em cần đọc và thực hiện đúng nội quy.**\n\n" +
                  "Nội quy thường cho biết giờ tập luyện, khu vực được phép bơi, khu vực nguy hiểm và những việc không được làm.\n\n" +
                  "Em cần khởi động trước khi xuống nước, bơi đúng khu vực, không tự ý nhảy xuống nơi không được phép và luôn nghe hướng dẫn của giáo viên hoặc nhân viên phụ trách."
    },

    {
        id: "read_pool_signs",
        keywords: [
            'đọc biển ở hồ bơi',
            'bien bao be boi',
            'biển ở bể bơi',
            'cần xem biển gì',
            'biển báo hồ bơi'
        ],
        response: "**Trước khi xuống nước, em nên quan sát các biển báo tại bể bơi.**\n\n" +
                  "Biển báo giúp em biết nơi nào dành cho người chưa biết bơi, nơi nào dành cho người biết bơi và khu vực nào cấm nhảy.\n\n" +
                  "Không nên bỏ qua biển báo chỉ vì thấy những bạn khác đang xuống nước."
    },

    {
        id: "non_swimmer_pool_area",
        keywords: [
            'chưa biết bơi ở đâu',
            'khong biet boi o dau',
            'khu người chưa biết bơi',
            'không biết bơi xuống đâu',
            'bể cho người chưa biết bơi'
        ],
        response: "**Người chưa biết bơi cần ở đúng khu vực dành cho người chưa biết bơi.**\n\n" +
                  "Theo tài liệu, khu vực này có độ sâu từ **1 mét trở xuống** và cần có biển báo rõ ràng.\n\n" +
                  "Em không được tự ý sang khu vực nước sâu chỉ vì muốn thử sức hoặc đi theo bạn."
    },

    {
        id: "non_swimmer_deep_area",
        keywords: [
            'chưa biết bơi xuống chỗ sâu',
            'khong biet boi xuong sau',
            'không biết bơi vào bể sâu',
            'chưa biết bơi sang khu sâu',
            'nước sâu khi chưa biết bơi'
        ],
        response: "**Nếu chưa biết bơi, em không được tự ý xuống khu vực nước sâu.**\n\n" +
                  "Ở chỗ sâu, em có thể không chạm chân xuống đáy và dễ hoảng loạn nếu mất thăng bằng.\n\n" +
                  "Hãy ở đúng khu vực dành cho người chưa biết bơi và làm theo hướng dẫn của giáo viên."
    },

    {
        id: "swimmer_designated_area",
        keywords: [
            'khu người biết bơi',
            'khu vuc biet boi',
            'biết bơi ở khu nào',
            'bể dành cho người biết bơi',
            'chỗ người biết bơi'
        ],
        response: "**Bể bơi có thể phân riêng khu vực dành cho người đã biết bơi.**\n\n" +
                  "Nếu em đã biết bơi, vẫn phải bơi đúng khu vực được hướng dẫn và không tự ý vượt rào, dây phân làn hoặc sang khu vực cấm.\n\n" +
                  "Biết bơi không có nghĩa là được bỏ qua nội quy."
    },

    {
        id: "do_not_cross_pool_zone",
        keywords: [
            'qua khu vực khác',
            'vuot day phan lan',
            'sang bể sâu',
            'qua dây hồ bơi',
            'đổi khu bơi'
        ],
        response: "**Không nên tự ý đi sang khu vực khác của bể bơi khi chưa được phép.**\n\n" +
                  "Các khu vực được phân chia theo độ sâu và khả năng bơi để bảo đảm an toàn.\n\n" +
                  "Nếu muốn đổi khu vực, hãy hỏi giáo viên hoặc người phụ trách trước."
    },

    {
        id: "no_diving_sign",
        keywords: [
            'biển cấm nhảy',
            'cam nhay cam dau',
            'cấm lao đầu',
            'biển cấm cắm đầu',
            'chỗ cấm nhảy'
        ],
        response: "**Nếu thấy biển cấm nhảy cắm đầu, em tuyệt đối không được thực hiện động tác này.**\n\n" +
                  "Theo tài liệu, khu vực có độ sâu dưới **1,4 mét** phải có biển cấm nhảy cắm đầu.\n\n" +
                  "Nhảy xuống nước nông có thể gây chấn thương nghiêm trọng ở đầu, cổ hoặc lưng."
    },

    {
        id: "shallow_pool_dive_risk",
        keywords: [
            'nước nông có nhảy đầu được không',
            'nuoc nong nhay dau',
            'bể nông cắm đầu',
            'nhảy cắm đầu bể nông',
            'lao đầu chỗ nông'
        ],
        response: "**Không được nhảy cắm đầu xuống khu vực nước nông.**\n\n" +
                  "Nếu đáy bể ở quá gần, đầu hoặc cổ có thể va mạnh vào đáy.\n\n" +
                  "Chỉ thực hiện các động tác nhảy xuống nước khi có khu vực cho phép và có giáo viên hướng dẫn."
    },

    {
        id: "obey_pool_teacher",
        keywords: [
            'phải nghe giáo viên không',
            'nghe huan luyen vien',
            'thầy dạy bơi bảo gì',
            'nghe người hướng dẫn',
            'có phải nghe cứu hộ không'
        ],
        response: "**Có. Khi học bơi, em cần làm theo hướng dẫn của giáo viên hoặc huấn luyện viên.**\n\n" +
                  "Người hướng dẫn chịu trách nhiệm tổ chức lớp và theo dõi điều kiện an toàn.\n\n" +
                  "Không tự ý xuống nước, đổi khu vực, nhảy xuống bể hoặc tiếp tục bơi khi đã được yêu cầu dừng."
    },

    {
        id: "pool_emergency_instructions",
        keywords: [
            'bể bơi gặp sự cố',
            'su co be boi',
            'khẩn cấp ở hồ bơi',
            'có sự cố phải làm gì',
            'bể bơi báo động'
        ],
        response: "**Khi bể bơi xảy ra tình huống khẩn cấp, em cần giữ bình tĩnh và nghe hướng dẫn.**\n\n" +
                  "Tài liệu yêu cầu khu vực dạy bơi phải có hướng dẫn quy trình xử lý khi gặp tình huống nguy hiểm.\n\n" +
                  "Không chạy lung tung, chen lấn hoặc tự quay xuống nước. Hãy tập trung ở nơi được giáo viên hoặc nhân viên hướng dẫn."
    },

    {
        id: "pool_rescue_equipment",
        keywords: [
            'phao cứu sinh ở hồ',
            'sao cuu ho',
            'dụng cụ cứu hộ bể bơi',
            'bể bơi có phao không',
            'thiết bị cứu hộ'
        ],
        response: "**Bể bơi an toàn cần có các dụng cụ cứu hộ được bố trí ở vị trí dễ sử dụng.**\n\n" +
                  "Tài liệu nêu các thiết bị như phao cứu sinh, sào cứu hộ và ghế cứu hộ dành cho nhân viên cứu hộ.\n\n" +
                  "Học sinh không nên lấy các dụng cụ này ra chơi vì chúng cần sẵn sàng cho trường hợp khẩn cấp."
    },

    {
        id: "do_not_play_with_rescue_equipment",
        keywords: [
            'nghịch phao cứu sinh',
            'nghich sao cuu ho',
            'lấy phao cứu hộ chơi',
            'chơi đồ cứu hộ',
            'có được nghịch phao không'
        ],
        response: "**Không nên lấy phao cứu sinh, sào cứu hộ hoặc các thiết bị an toàn ra chơi.**\n\n" +
                  "Đây là những dụng cụ cần được giữ đúng vị trí để sử dụng ngay khi có sự cố.\n\n" +
                  "Nếu em thấy thiết bị bị di chuyển hoặc hỏng, hãy báo cho người phụ trách."
    },

    {
        id: "pool_floor_slippery",
        keywords: [
            'sàn hồ bơi trơn',
            'san be boi tron',
            'chạy quanh hồ bơi',
            'chạy cạnh bể',
            'trượt ở bể bơi'
        ],
        response: "**Khu vực xung quanh bể bơi có thể ướt và dễ trượt ngã.**\n\n" +
                  "Tài liệu yêu cầu sàn quanh bể phải phẳng và không trơn trượt, nhưng em vẫn cần đi cẩn thận.\n\n" +
                  "Không chạy, đuổi nhau hoặc xô đẩy sát mép bể."
    },

    {
        id: "pool_water_visibility",
        keywords: [
            'nước bể đục',
            'nuoc be boi duc',
            'không thấy đáy bể',
            'bể bơi nhìn không rõ đáy',
            'nước hồ bơi không trong'
        ],
        response: "**Bể bơi dành cho trẻ cần có nước trong để có thể nhìn thấy đáy.**\n\n" +
                  "Nếu nước quá đục hoặc không quan sát được đáy, em không nên tự ý xuống bơi.\n\n" +
                  "Hãy báo cho giáo viên hoặc người phụ trách."
    },

    {
        id: "child_pool_depth",
        keywords: [
            'bể trẻ em sâu bao nhiêu',
            'be tre em sau',
            'hồ bơi trẻ em',
            'độ sâu bể trẻ em',
            'bể cho trẻ nhỏ'
        ],
        response: "**Tài liệu yêu cầu bể dành cho trẻ phải có độ sâu phù hợp với trẻ.**\n\n" +
                  "Mức nước cần phù hợp để việc học bơi được tổ chức an toàn, đồng thời nước phải trong và nhìn thấy đáy.\n\n" +
                  "Em vẫn cần học và bơi dưới sự quản lý của giáo viên, không tự đánh giá rằng bể thấp là hoàn toàn an toàn."
    },

    {
        id: "pool_entry_using_ladder",
        keywords: [
            'xuống bể bằng thang',
            'xuong be bang cau thang',
            'cách xuống cầu thang hồ',
            'lên xuống thang bể bơi',
            'bám tay vịn hồ bơi'
        ],
        response: "**Khi xuống bể bằng cầu thang, em cần đi chậm và chắc chắn.**\n\n" +
                  "Theo tài liệu, hãy nhìn vào cầu thang, dùng hai tay nắm tay vịn hoặc giữ thăng bằng và bước từng bậc cẩn thận.\n\n" +
                  "Không nhảy qua các bậc hoặc chen lấn với bạn."
    },

    {
        id: "pool_exit_using_ladder",
        keywords: [
            'lên bờ bằng thang',
            'len khoi be bang thang',
            'lên cầu thang hồ bơi',
            'ra khỏi bể bằng thang',
            'cách lên bờ hồ'
        ],
        response: "**Khi lên khỏi bể bằng cầu thang, hãy bám chắc tay vịn và đi từng bước.**\n\n" +
                  "Vừa đi vừa quan sát bậc thang, không leo vội hoặc đẩy bạn phía trước.\n\n" +
                  "Sau khi lên bờ, đi chậm vì sàn có thể ướt."
    },

    {
        id: "pool_session_duration",
        keywords: [
            'học bơi bao lâu',
            'hoc boi bao nhieu phut',
            'bơi dưới nước bao lâu',
            'buổi bơi dài bao lâu',
            'thời gian học bơi'
        ],
        response: "**Theo tài liệu, một buổi dạy bơi cho học sinh tối đa 90 phút, trong đó thời gian ở dưới nước không quá 60 phút.**\n\n" +
                  "Thời gian học cần được giáo viên tổ chức phù hợp để tránh mệt và quá sức.\n\n" +
                  "Nếu em cảm thấy lạnh hoặc mệt trước khi hết buổi, hãy báo giáo viên và ra khỏi nước."
    },

    {
        id: "pool_noon_training",
        keywords: [
            '11 giờ có nên bơi',
            '12 gio di boi',
            'bơi buổi trưa',
            '11h 13h bơi',
            'học bơi giữa trưa'
        ],
        response: "**Theo nội quy trong tài liệu, không nên tổ chức học và tập bơi trong khoảng 11 giờ đến 13 giờ.**\n\n" +
                  "Khi tham gia lớp bơi, em nên học đúng thời gian do giáo viên và đơn vị tổ chức quy định."
    },

    {
        id: "pool_no_food_during_training",
        keywords: [
            'ăn khi học bơi',
            'an truoc khi boi',
            'uống khi đang bơi',
            'ăn trong giờ bơi',
            'vừa ăn vừa học bơi'
        ],
        response: "**Nội quy lớp học bơi trong tài liệu yêu cầu ngay trước và trong khi bơi không ăn, uống.**\n\n" +
                  "Em nên thực hiện đúng hướng dẫn của giáo viên để tránh sặc, khó chịu hoặc mất an toàn trong lúc tập."
    },

    {
        id: "pool_rules_summary",
        keywords: [
            'nhớ gì ở hồ bơi',
            'quy tac be boi',
            'tóm tắt nội quy hồ bơi',
            'đi bể bơi nhớ gì',
            'nội quy bơi dễ nhớ'
        ],
        response: "**Khi ở bể bơi, em hãy nhớ:**\n\n" +
                  "1. **Đọc biển báo và nội quy.**\n" +
                  "2. **Bơi đúng khu vực phù hợp khả năng.**\n" +
                  "3. **Không nhảy cắm đầu ở nơi cấm.**\n" +
                  "4. **Không tự ý sang khu vực nước sâu.**\n" +
                  "5. **Không chạy, xô đẩy quanh bể.**\n" +
                  "6. **Làm theo giáo viên, huấn luyện viên và nhân viên cứu hộ.**\n\n" +
                  "Câu dễ nhớ: **Đọc biển – Đúng khu – Không nhảy – Nghe hướng dẫn.**"
    },
{
        id: "safe_swimming_definition",
        keywords: [
            'biết bơi an toàn là gì',
            'biet boi an toan',
            'thế nào là bơi an toàn',
            'bơi an toàn là sao',
            'biết bơi thế nào mới an toàn'
        ],
        response: "**Biết bơi an toàn không chỉ là biết một vài kiểu bơi.**\n\n" +
                  "Theo tài liệu, học sinh cần có cả kiến thức phòng tránh đuối nước, kỹ năng bơi, kỹ năng tự cứu và kỹ năng cứu đuối gián tiếp.\n\n" +
                  "Ở cấp độ ban đầu, em cần biết lên xuống bể an toàn, bơi được ít nhất 25 mét, nổi ngửa và đứng nước đủ thời gian, đồng thời biết xử lý khi bất ngờ rơi xuống nước."
    },

    {
        id: "swimming_25m_meaning",
        keywords: [
            'bơi 25m là gì',
            'boi duoc 25m',
            '25 mét có biết bơi chưa',
            'bơi 25m có đủ không',
            '25m bơi'
        ],
        response: "**Theo tài liệu, bơi được ít nhất 25 mét được coi là mức biết bơi ban đầu.**\n\n" +
                  "Tuy nhiên, chỉ bơi được 25 mét chưa có nghĩa là em hoàn toàn an toàn trong mọi môi trường nước.\n\n" +
                  "Em vẫn cần biết nổi ngửa, đứng nước, tự cứu, nhận biết nơi nguy hiểm và tuân thủ các quy tắc an toàn."
    },

    {
        id: "safe_swimming_level_one",
        keywords: [
            'cấp độ 1 bơi',
            'cap do 1 boi',
            'bơi an toàn cấp 1',
            'tiêu chuẩn cấp 1',
            'biết bơi ban đầu'
        ],
        response: "**Cấp độ 1 là mức biết bơi ban đầu và có kỹ năng phòng tránh đuối nước.**\n\n" +
                  "Theo tài liệu, học sinh cần:\n" +
                  "✅ Lên xuống bể an toàn.\n" +
                  "✅ Bơi được 1 hoặc 2 kiểu bơi, ít nhất 25 mét.\n" +
                  "✅ Xoay tư thế thân người khi rơi xuống nước.\n" +
                  "✅ Nổi ngửa và đứng nước ít nhất 90 giây.\n" +
                  "✅ Biết cứu đuối gián tiếp từ trên bờ."
    },

    {
        id: "safe_swimming_level_two",
        keywords: [
            'cấp độ 2 bơi',
            'cap do 2 boi',
            'bơi 50m',
            'tiêu chuẩn bơi 50 mét',
            'bơi an toàn cấp 2'
        ],
        response: "**Ở cấp độ 2, yêu cầu cao hơn cấp độ 1.**\n\n" +
                  "Theo tài liệu, học sinh cần bơi được ít nhất **50 mét**, có kỹ năng lặn chìm và di chuyển trong nước, nổi người đứng lên, nổi ngửa hoặc đứng nước ít nhất **2 phút** và biết xử lý các tình huống như nhiễm lạnh, đuối sức hoặc chuột rút.\n\n" +
                  "Đây là bước củng cố kỹ năng bơi và kỹ năng phòng tránh đuối nước."
    },

    {
        id: "safe_swimming_level_three",
        keywords: [
            'cấp độ 3 bơi',
            'cap do 3 boi',
            'bơi 100m',
            'tiêu chuẩn bơi 100 mét',
            'bơi an toàn cấp 3'
        ],
        response: "**Ở cấp độ 3, học sinh được yêu cầu có năng lực bơi và kỹ năng an toàn cao hơn.**\n\n" +
                  "Theo tài liệu, học sinh cần bơi được ít nhất **100 mét**, thực hiện nổi ngửa và đứng nước ít nhất **3 phút**, có kỹ năng thoát hiểm trong nước và kỹ năng cứu đuối gián tiếp.\n\n" +
                  "Dù đạt cấp độ cao, em vẫn phải tuân thủ các quy tắc an toàn khi xuống nước."
    },

    {
        id: "back_float_90_seconds",
        keywords: [
            'nổi ngửa 90 giây',
            'noi ngua 90 giay',
            'nổi ngửa bao lâu',
            'nổi 1 phút rưỡi',
            '90 giây dưới nước'
        ],
        response: "**Ở mức biết bơi an toàn cấp độ 1, tài liệu yêu cầu học sinh có thể nổi ngửa hoặc đứng nước ít nhất 90 giây.**\n\n" +
                  "Khoảng thời gian này giúp em có khả năng giữ đường thở trên mặt nước và chờ hỗ trợ khi gặp tình huống bất ngờ.\n\n" +
                  "Kỹ năng nổi cần được luyện tập thường xuyên dưới sự hướng dẫn của giáo viên."
    },

    {
        id: "tread_water_90_seconds",
        keywords: [
            'đứng nước 90 giây',
            'dung nuoc 90 giay',
            'đứng nước bao lâu',
            'đứng nước 1 phút rưỡi',
            '90 giây đứng nước'
        ],
        response: "**Theo tiêu chuẩn cấp độ 1 trong tài liệu, học sinh cần thực hiện đứng nước ít nhất 90 giây.**\n\n" +
                  "Đứng nước giúp em giữ đầu trên mặt nước, quan sát xung quanh và chờ người hỗ trợ.\n\n" +
                  "Đây là kỹ năng quan trọng không kém việc bơi được một quãng xa."
    },

    {
        id: "why_back_float_important",
        keywords: [
            'vì sao phải nổi ngửa',
            'tai sao noi ngua',
            'nổi ngửa quan trọng không',
            'nổi ngửa để làm gì',
            'lợi ích nổi ngửa'
        ],
        response: "**Nổi ngửa rất quan trọng vì giúp em vừa thở, vừa nghỉ và tiết kiệm sức.**\n\n" +
                  "Theo tài liệu, nổi ngửa và đứng nước là hai kỹ năng an toàn cần thiết khi học bơi.\n\n" +
                  "Khi mệt hoặc gặp khó khăn, em có thể dùng kỹ năng nổi ngửa để duy trì trạng thái an toàn trong lúc chờ người đến giúp."
    },

    {
        id: "why_treading_water_important",
        keywords: [
            'vì sao phải đứng nước',
            'tai sao dung nuoc',
            'đứng nước để làm gì',
            'đứng nước quan trọng không'
        ],
        response: "**Đứng nước giúp em giữ đầu trên mặt nước mà không cần bơi liên tục.**\n\n" +
                  "Kỹ năng này cho phép em quan sát xung quanh, kiểm soát hơi thở và chờ hỗ trợ khi cần.\n\n" +
                  "Theo tài liệu, đứng nước là một trong những kỹ năng quan trọng của bơi an toàn."
    },

    {
        id: "knowing_swim_styles_not_enough",
        keywords: [
            'biết bơi ếch là đủ chưa',
            'boi ech co an toan',
            'biết bơi sải là đủ không',
            'biết vài kiểu bơi',
            'biết bơi rồi có an toàn không'
        ],
        response: "**Chỉ biết một vài kiểu bơi chưa có nghĩa là em hoàn toàn an toàn dưới nước.**\n\n" +
                  "Tài liệu nhấn mạnh rằng em còn cần biết nổi ngửa khi mệt, nhận biết nơi nguy hiểm, không bơi một mình và có người lớn giám sát.\n\n" +
                  "Ngay cả người bơi giỏi vẫn có thể gặp chuột rút, nước xoáy hoặc thời tiết xấu."
    },

    {
        id: "safe_swimming_more_than_distance",
        keywords: [
            'bơi xa có phải bơi giỏi',
            'boi xa co an toan',
            'bơi được xa là đủ',
            'bơi nhiều mét có an toàn không',
            'bơi xa nhưng không nổi'
        ],
        response: "**Khả năng bơi xa chỉ là một phần của bơi an toàn.**\n\n" +
                  "Một người có thể bơi khá xa nhưng vẫn gặp nguy hiểm nếu không biết nổi, đứng nước, tự cứu hoặc nhận biết môi trường nước nguy hiểm.\n\n" +
                  "Vì vậy, đừng chỉ quan tâm mình bơi được bao nhiêu mét."
    },

    {
        id: "safe_swimming_requires_knowledge",
        keywords: [
            'bơi an toàn cần biết gì',
            'biet gi de boi an toan',
            'kiến thức bơi an toàn',
            'bơi giỏi cần biết gì',
            'ngoài bơi cần học gì'
        ],
        response: "**Ngoài kỹ thuật bơi, em còn cần kiến thức phòng tránh đuối nước.**\n\n" +
                  "Ví dụ: nhận biết khu vực nguy hiểm, không bơi một mình, biết xử lý khi mệt hoặc chuột rút, biết tự cứu và biết cách giúp người khác từ trên bờ.\n\n" +
                  "Đó là lý do chương trình bơi an toàn không chỉ dạy động tác bơi."
    },

    {
        id: "safe_swimming_self_rescue_required",
        keywords: [
            'bơi an toàn có cần tự cứu',
            'can ky nang tu cuu',
            'biết bơi có cần tự cứu không',
            'tự cứu trong bơi an toàn'
        ],
        response: "**Có. Kỹ năng tự cứu là một phần quan trọng của bơi an toàn.**\n\n" +
                  "Theo tài liệu, học sinh cần biết xoay tư thế cơ thể, nổi ngửa, đứng nước và bơi vào bờ khi gặp tình huống bất ngờ.\n\n" +
                  "Những kỹ năng này giúp em chủ động bảo vệ mình trước khi có người khác đến hỗ trợ."
    },

    {
        id: "safe_swimming_indirect_rescue_required",
        keywords: [
            'bơi an toàn có cần biết cứu người',
            'cuu duoi gian tiep',
            'học cứu đuối khi học bơi',
            'biết bơi cần biết cứu bạn không'
        ],
        response: "**Trong tiêu chuẩn bơi an toàn, học sinh còn cần biết kỹ năng cứu đuối gián tiếp.**\n\n" +
                  "Nghĩa là biết gọi người lớn, dùng gậy, dây, phao hoặc vật nổi từ trên bờ để hỗ trợ người gặp nạn.\n\n" +
                  "Trẻ em không nên tự nhảy xuống nước để cứu trực tiếp."
    },

    {
        id: "safe_swimming_fall_into_water_test",
        keywords: [
            'bài kiểm tra rơi xuống nước',
            'kiem tra roi xuong nuoc',
            'rơi xuống nước thi làm gì',
            'thi bơi an toàn có gì',
            'kiểm tra tự cứu'
        ],
        response: "**Trong đánh giá bơi an toàn cấp độ 1, tài liệu có tình huống thực hành khi bị rơi xuống nước.**\n\n" +
                  "Học sinh cần biết xoay tư thế thân người, nổi ngửa, đứng nước và bơi vào bờ.\n\n" +
                  "Mục đích là kiểm tra khả năng tự xử lý chứ không chỉ kiểm tra tốc độ bơi."
    },

    {
        id: "safe_swimming_level_one_enough",
        keywords: [
            'cấp 1 có đủ an toàn không',
            'cap 1 co du khong',
            'đạt cấp độ 1 rồi',
            'bơi 25m rồi có cần học thêm',
            'biết bơi ban đầu rồi'
        ],
        response: "**Cấp độ 1 là nền tảng quan trọng nhưng em vẫn nên tiếp tục rèn luyện.**\n\n" +
                  "Tài liệu xem cấp độ 1 là mức tối thiểu để đạt mục tiêu biết bơi ban đầu và phòng tránh đuối nước.\n\n" +
                  "Sau đó, học sinh được khuyến khích tiếp tục nâng cao sức bền, kỹ năng thoát hiểm và kỹ năng an toàn."
    },

    {
        id: "improve_swimming_after_25m",
        keywords: [
            'bơi 25m rồi học gì',
            'sau 25m hoc gi',
            'nâng cao bơi',
            'bơi xa hơn',
            'học bơi tiếp'
        ],
        response: "**Sau khi bơi được 25 mét, em nên tiếp tục củng cố và nâng cao kỹ năng.**\n\n" +
                  "Có thể luyện bơi xa hơn, tăng thời gian nổi ngửa và đứng nước, đồng thời học thêm kỹ năng thoát hiểm và xử lý các tình huống bất ngờ.\n\n" +
                  "Việc nâng cao cần thực hiện trong lớp bơi an toàn có người hướng dẫn."
    },

    {
        id: "safe_swimming_friend_not_supervisor",
        keywords: [
            'đi bơi với bạn giỏi',
            'ban boi gioi trong minh',
            'bạn biết bơi đi cùng',
            'không cần người lớn nếu có bạn',
            'đi bơi với bạn an toàn không'
        ],
        response: "**Đi cùng một người bạn bơi giỏi không thay thế được sự giám sát của người lớn.**\n\n" +
                  "Tài liệu nhấn mạnh trẻ em vẫn cần có người lớn có đủ khả năng giám sát và hỗ trợ khi đi bơi.\n\n" +
                  "Một người bơi giỏi chưa chắc có kỹ năng cứu hộ hoặc nhận biết được mọi nguy hiểm."
    },

    {
        id: "safe_swimming_expert_still_risk",
        keywords: [
            'người bơi giỏi có đuối không',
            'boi gioi van duoi',
            'chuyên gia bơi có gặp nạn',
            'bơi giỏi vẫn nguy hiểm'
        ],
        response: "**Có. Người bơi giỏi vẫn có thể gặp nguy hiểm.**\n\n" +
                  "Theo tài liệu, ngay cả người có kỹ năng bơi tốt vẫn có thể gặp chuột rút, vùng nước xoáy, thời tiết xấu hoặc môi trường nước lạ.\n\n" +
                  "Vì vậy, không ai nên chủ quan khi xuống nước."
    },

    {
        id: "safe_swimming_level_summary",
        keywords: [
            'tóm tắt bơi an toàn',
            'quy tac biet boi an toan',
            'biết bơi an toàn cần gì',
            'nhớ gì về bơi an toàn'
        ],
        response: "**Để được coi là biết bơi an toàn ở mức ban đầu, em hãy nhớ:**\n\n" +
                  "1. **Biết kiến thức phòng tránh đuối nước.**\n" +
                  "2. **Lên xuống bể an toàn.**\n" +
                  "3. **Bơi được ít nhất 25 mét.**\n" +
                  "4. **Nổi ngửa và đứng nước ít nhất 90 giây.**\n" +
                  "5. **Biết xử lý khi bất ngờ rơi xuống nước.**\n" +
                  "6. **Biết cứu đuối gián tiếp từ trên bờ.**\n\n" +
                  "Câu dễ nhớ: **Biết bơi + Biết nổi + Biết tự cứu + Biết phòng tránh = Bơi an toàn.**"
    },
{
        id: "swimming_benefits_general",
        keywords: [
            'học bơi có lợi gì',
            'hoc boi co loi gi',
            'bơi để làm gì',
            'tác dụng của bơi',
            'học bơi tốt không'
        ],
        response: "**Học bơi mang lại nhiều lợi ích cho học sinh.**\n\n" +
                  "Bơi giúp nâng cao sức khỏe, thể lực, phát triển cơ thể và rèn luyện khả năng vận động.\n\n" +
                  "Quan trọng hơn, học bơi an toàn còn giúp em có thêm kỹ năng tự bảo vệ khi gặp tình huống bất ngờ dưới nước.\n\n" +
                  "Tuy nhiên, biết bơi không có nghĩa là em được tự ý xuống nước ở bất cứ đâu."
    },

    {
        id: "swimming_improves_health",
        keywords: [
            'bơi có khỏe không',
            'boi co khoe khong',
            'bơi tốt cho sức khỏe',
            'học bơi có khỏe hơn không',
            'bơi giúp gì cho sức khỏe'
        ],
        response: "**Bơi là một hoạt động giúp nâng cao sức khỏe và thể lực.**\n\n" +
                  "Khi bơi, nhiều nhóm cơ trên cơ thể cùng hoạt động và em phải phối hợp tay, chân, hơi thở và tư thế cơ thể.\n\n" +
                  "Việc tập luyện phù hợp giúp cơ thể nhanh nhẹn, linh hoạt và khỏe mạnh hơn."
    },

    {
        id: "swimming_physical_development",
        keywords: [
            'bơi có phát triển cơ thể không',
            'boi phat trien the chat',
            'bơi giúp phát triển gì',
            'học bơi phát triển thể lực',
            'bơi có tốt cho thể chất'
        ],
        response: "**Theo tài liệu, học bơi góp phần phát triển thể chất và tầm vóc của học sinh.**\n\n" +
                  "Việc phối hợp tay, chân, thân người và hơi thở giúp cơ thể được vận động toàn diện.\n\n" +
                  "Bơi cũng giúp rèn luyện các tố chất như nhanh, mạnh, bền và khéo léo."
    },

    {
        id: "swimming_agility_flexibility",
        keywords: [
            'bơi có nhanh nhẹn không',
            'boi co linh hoat khong',
            'bơi giúp linh hoạt',
            'bơi giúp khéo léo',
            'bơi tăng nhanh nhẹn'
        ],
        response: "**Có. Học bơi giúp rèn luyện sự nhanh nhẹn, linh hoạt và khả năng phối hợp vận động.**\n\n" +
                  "Khi bơi, em phải phối hợp tay, chân, nhịp thở và tư thế cơ thể cùng lúc.\n\n" +
                  "Việc luyện tập đúng kỹ thuật giúp các động tác trở nên chính xác và linh hoạt hơn."
    },

    {
        id: "swimming_builds_endurance",
        keywords: [
            'bơi có tăng sức bền không',
            'boi tang suc ben',
            'bơi giúp khỏe lâu',
            'bơi rèn sức bền',
            'học bơi có dai sức'
        ],
        response: "**Bơi có thể giúp rèn luyện sức bền khi được tập đúng cách và vừa sức.**\n\n" +
                  "Tài liệu xem sức bền là một trong những tố chất thể lực được phát triển thông qua học và luyện tập bơi.\n\n" +
                  "Em không nên cố bơi quá lâu hoặc quá sức chỉ để rèn sức bền."
    },

    {
        id: "swimming_builds_strength",
        keywords: [
            'bơi có mạnh hơn không',
            'boi tang suc manh',
            'bơi có khỏe cơ không',
            'bơi rèn sức mạnh',
            'bơi có khỏe tay chân'
        ],
        response: "**Bơi giúp nhiều nhóm cơ cùng hoạt động nên góp phần phát triển sức mạnh của cơ thể.**\n\n" +
                  "Tay, chân và thân người đều phải phối hợp để cơ thể di chuyển trong nước.\n\n" +
                  "Việc luyện tập cần phù hợp với tuổi và thể trạng, không nên cố gắng quá sức."
    },

    {
        id: "swimming_body_coordination",
        keywords: [
            'bơi có giúp phối hợp không',
            'phoi hop tay chan',
            'bơi phối hợp cơ thể',
            'tay chân khi bơi',
            'bơi giúp phối hợp vận động'
        ],
        response: "**Một lợi ích quan trọng của học bơi là rèn khả năng phối hợp vận động.**\n\n" +
                  "Em phải phối hợp chân, tay, tư thế thân người và cách thở để thực hiện đúng kỹ thuật.\n\n" +
                  "Khả năng phối hợp tốt cũng hỗ trợ em xử lý các tình huống dưới nước hiệu quả hơn."
    },

    {
        id: "swimming_builds_confidence",
        keywords: [
            'bơi có tự tin hơn không',
            'boi giup tu tin',
            'học bơi bớt sợ nước',
            'sợ nước học bơi',
            'bơi giúp mạnh dạn'
        ],
        response: "**Học bơi đúng cách có thể giúp em mạnh dạn và tự tin hơn trong môi trường nước.**\n\n" +
                  "Khi được làm quen với nước, học cách nổi, đứng nước và bơi từng bước, em sẽ hiểu rõ hơn cách cơ thể hoạt động dưới nước.\n\n" +
                  "Tự tin ở đây không có nghĩa là chủ quan. Em vẫn phải tuân thủ các quy tắc an toàn."
    },

    {
        id: "swimming_reduces_fear_of_water",
        keywords: [
            'sợ nước phải làm sao',
            'so nuoc hoc boi',
            'học bơi có hết sợ nước',
            'sợ xuống hồ',
            'không dám xuống nước'
        ],
        response: "**Học bơi theo từng bước có thể giúp em dần làm quen và bớt sợ nước.**\n\n" +
                  "Giáo viên thường cho học sinh làm quen với nước, tập thở, tập nổi và tập các kỹ năng đơn giản trước khi học bơi hoàn chỉnh.\n\n" +
                  "Không nên tự ép mình xuống nơi sâu hoặc tự tập một mình."
    },

    {
        id: "swimming_self_protection",
        keywords: [
            'học bơi để tự bảo vệ',
            'boi de tu bao ve',
            'bơi giúp tự cứu không',
            'học bơi phòng đuối nước',
            'bơi giúp an toàn'
        ],
        response: "**Học bơi an toàn giúp em chủ động bảo vệ bản thân tốt hơn trong môi trường nước.**\n\n" +
                  "Nếu được học đầy đủ, em có thể biết cách nổi, đứng nước, tự cứu và xử lý một số tình huống bất ngờ.\n\n" +
                  "Tuy nhiên, khả năng tự bảo vệ chỉ tốt khi đi kèm kiến thức phòng tránh nguy hiểm."
    },

    {
        id: "swimming_escape_unexpected_fall",
        keywords: [
            'học bơi giúp khi rơi xuống nước',
            'roi xuong nuoc biet boi',
            'bơi giúp thoát hiểm',
            'biết bơi khi ngã xuống nước',
            'học bơi để thoát nạn'
        ],
        response: "**Học bơi và kỹ năng an toàn có thể giúp em xử lý tốt hơn nếu bất ngờ rơi xuống nước.**\n\n" +
                  "Em có thể sử dụng những kỹ năng đã học như giữ bình tĩnh, nổi ngửa, đứng nước và từ từ tìm cách đến nơi an toàn.\n\n" +
                  "Đó là lý do tài liệu coi học bơi là một biện pháp quan trọng để phòng tránh đuối nước."
    },

    {
        id: "swimming_handles_water_emergencies",
        keywords: [
            'bơi giúp xử lý sự cố gì',
            'su co khi boi',
            'học bơi xử lý nguy hiểm',
            'bơi gặp chuột rút',
            'bơi gặp nước xoáy'
        ],
        response: "**Một khóa học bơi an toàn không chỉ dạy cách di chuyển trong nước mà còn giúp em chuẩn bị cho các tình huống nguy hiểm.**\n\n" +
                  "Tài liệu đề cập các tình huống như bất ngờ rơi xuống nước, chuột rút, nước xoáy, nước cuốn hoặc mưa lũ.\n\n" +
                  "Các kỹ năng này cần được học và thực hành với người hướng dẫn."
    },

    {
        id: "swimming_survival_skill",
        keywords: [
            'bơi có phải kỹ năng sống',
            'boi la ky nang song',
            'bơi sinh tồn',
            'kỹ năng sinh tồn dưới nước',
            'học bơi để sinh tồn'
        ],
        response: "**Học bơi an toàn là một kỹ năng sống quan trọng.**\n\n" +
                  "Ngoài kỹ thuật bơi, em còn học cách nổi, đứng nước, tự cứu và nhận biết nguy cơ đuối nước.\n\n" +
                  "Những kỹ năng này có thể giúp em bảo vệ mình khi gặp sự cố bất ngờ trong môi trường nước."
    },

    {
        id: "swimming_teaches_discipline",
        keywords: [
            'học bơi có rèn kỷ luật không',
            'boi ren ky luat',
            'bơi có rèn tính kiên trì',
            'học bơi rèn gì',
            'bơi giúp cố gắng'
        ],
        response: "**Theo tài liệu, quá trình học bơi còn góp phần rèn tính kiên trì, nỗ lực và kỷ luật.**\n\n" +
                  "Em cần tập từng động tác, làm theo hướng dẫn và kiên trì luyện tập mới tiến bộ.\n\n" +
                  "Đồng thời, việc tuân thủ nội quy cũng giúp hình thành thói quen bảo vệ an toàn cho bản thân."
    },

    {
        id: "swimming_enjoyment_exercise",
        keywords: [
            'bơi có vui không',
            'hoc boi co vui',
            'bơi có phải vận động tốt',
            'bơi để vui chơi',
            'thích học bơi'
        ],
        response: "**Bơi vừa là một kỹ năng an toàn vừa là một hoạt động vận động thú vị.**\n\n" +
                  "Tài liệu hướng tới việc giúp học sinh hình thành hứng thú, yêu thích vận động và rèn luyện kỹ năng sống.\n\n" +
                  "Nhưng vui chơi dưới nước luôn phải đặt an toàn lên trước."
    },

    {
        id: "swimming_health_and_safety",
        keywords: [
            'học bơi vừa khỏe vừa an toàn',
            'boi khoe va an toan',
            'bơi tốt cho gì nhất',
            'lợi ích chính của bơi'
        ],
        response: "**Có thể nhớ hai lợi ích lớn của học bơi là: nâng cao thể chất và tăng khả năng tự bảo vệ trong môi trường nước.**\n\n" +
                  "Bơi giúp em khỏe hơn, linh hoạt hơn và học thêm các kỹ năng tự cứu.\n\n" +
                  "Hai mục tiêu này luôn phải đi cùng nhau."
    },

    {
        id: "swimming_does_not_remove_risk",
        keywords: [
            'biết bơi là hết nguy hiểm chưa',
            'biet boi het nguy hiem',
            'biết bơi có đuối không',
            'học bơi rồi có an toàn tuyệt đối',
            'bơi giỏi có sợ đuối không'
        ],
        response: "**Không. Học bơi không làm mọi nguy hiểm dưới nước biến mất.**\n\n" +
                  "Người biết bơi vẫn có thể gặp chuột rút, mệt, nước xoáy, dòng chảy mạnh hoặc thời tiết xấu.\n\n" +
                  "Vì vậy, em vẫn cần bơi đúng nơi, có người lớn giám sát và tuân thủ các quy tắc an toàn."
    },

    {
        id: "learned_swimming_can_go_alone",
        keywords: [
            'biết bơi đi một mình được không',
            'biet boi di mot minh',
            'học bơi rồi tự đi bơi',
            'biết bơi không cần người lớn',
            'bơi giỏi đi hồ một mình'
        ],
        response: "**Không. Trẻ em dù đã biết bơi vẫn không nên đi bơi một mình.**\n\n" +
                  "Tài liệu nhấn mạnh trẻ em cần có người lớn giám sát khi bơi.\n\n" +
                  "Một tình huống bất ngờ như chuột rút, mệt hoặc nước xoáy vẫn có thể xảy ra với người bơi tốt."
    },

    {
        id: "learned_swimming_any_water",
        keywords: [
            'biết bơi xuống đâu cũng được không',
            'biet boi o dau cung duoc',
            'học bơi rồi xuống sông',
            'biết bơi tắm ao được không',
            'bơi giỏi xuống chỗ lạ'
        ],
        response: "**Biết bơi không có nghĩa là em có thể xuống mọi nơi có nước.**\n\n" +
                  "Sông, hồ, ao và biển có thể có độ sâu thay đổi, dòng chảy mạnh, nước xoáy hoặc vật cản dưới nước.\n\n" +
                  "Chỉ bơi ở nơi được phép, phù hợp và có người lớn giám sát."
    },

    {
        id: "swimming_not_permission_to_take_risks",
        keywords: [
            'biết bơi có được liều không',
            'boi gioi duoc mao hiem',
            'bơi giỏi thử chỗ sâu',
            'học bơi rồi thử nước xoáy',
            'bơi giỏi có được thử sức'
        ],
        response: "**Không nên dùng khả năng bơi để thử những tình huống nguy hiểm.**\n\n" +
                  "Biết bơi là để giúp em an toàn hơn, không phải để bơi vào nước sâu, nước xoáy, dòng chảy mạnh hoặc nơi bị cấm.\n\n" +
                  "Kỹ năng tốt luôn phải đi cùng sự cẩn thận."
    },

    {
        id: "swimming_help_rescue_others_limit",
        keywords: [
            'học bơi có cứu được người không',
            'biet boi cuu nguoi',
            'bơi để cứu bạn',
            'học bơi rồi cứu đuối',
            'bơi giỏi cứu người'
        ],
        response: "**Học bơi giúp em hiểu môi trường nước tốt hơn, nhưng không có nghĩa là trẻ em được tự xuống nước cứu người.**\n\n" +
                  "Với học sinh, ưu tiên vẫn là cứu đuối gián tiếp: gọi người lớn, đưa gậy, ném phao hoặc vật nổi.\n\n" +
                  "Cứu đuối trực tiếp là kỹ năng khó và nguy hiểm, cần được đào tạo chuyên nghiệp."
    },

    {
        id: "swimming_benefits_summary",
        keywords: [
            'tóm tắt lợi ích học bơi',
            'loi ich boi de nho',
            'học bơi tốt gì',
            'nhớ gì về học bơi'
        ],
        response: "**Học bơi giúp em:**\n\n" +
                  "✅ Nâng cao sức khỏe và thể lực.\n" +
                  "✅ Rèn sự nhanh nhẹn, linh hoạt, sức bền và phối hợp vận động.\n" +
                  "✅ Tự tin hơn trong môi trường nước.\n" +
                  "✅ Học kỹ năng tự cứu và phòng tránh đuối nước.\n" +
                  "✅ Rèn sự kiên trì, kỷ luật và kỹ năng sống.\n\n" +
                  "Nhưng hãy nhớ: **Biết bơi không đồng nghĩa với được tự ý xuống nước.**"
    },
{
        id: "playing_near_water_general",
        keywords: [
            'chơi gần sông hồ',
            'choi gan song ho',
            'chơi gần ao',
            'chơi gần nước',
            'vui chơi ven sông'
        ],
        response: "**Chơi gần ao, hồ, sông, suối có thể nguy hiểm nếu em đến quá sát mép nước.**\n\n" +
                  "Bờ có thể trơn, bị sạt hoặc có chỗ sâu bất ngờ khiến em trượt chân rơi xuống nước.\n\n" +
                  "Khi vui chơi, hãy chọn nơi cách xa vùng nước nguy hiểm và luôn nghe lời người lớn."
    },

    {
        id: "after_school_near_water",
        keywords: [
            'tan học ra sông chơi',
            'tan hoc ra ho',
            'đi chơi sau giờ học',
            'tan trường đi tắm',
            'sau học ra ao'
        ],
        response: "**Sau giờ học, em không nên rủ bạn ra ao, hồ, sông, suối để chơi hoặc tắm.**\n\n" +
                  "Tài liệu cảnh báo nhiều vụ đuối nước xảy ra sau khi tan trường do học sinh rủ nhau đến các vùng nước mở.\n\n" +
                  "Hãy về nhà hoặc tham gia hoạt động ở nơi an toàn."
    },

    {
        id: "holiday_near_water",
        keywords: [
            'nghỉ hè ra sông',
            'nghi he di tam',
            'nghỉ học ra hồ',
            'nghỉ lễ đi tắm',
            'nghỉ hè chơi gần nước'
        ],
        response: "**Trong ngày nghỉ hoặc nghỉ hè, em càng cần nhớ các quy tắc phòng tránh đuối nước.**\n\n" +
                  "Không tự rủ nhau đi tắm, bơi hoặc chơi ở ao, hồ, sông, suối khi không có người lớn đi cùng.\n\n" +
                  "Khi vui chơi, rất dễ quên nguy hiểm nên hãy chọn địa điểm an toàn."
    },

    {
        id: "friends_invite_water_play",
        keywords: [
            'bạn rủ ra sông chơi',
            'ban ru ra ho',
            'rủ đi tắm sông',
            'bạn rủ đi bơi',
            'rủ nhau ra đập'
        ],
        response: "**Nếu bạn rủ em ra sông, hồ hoặc đập để tắm hay chơi mà không có người lớn, em nên từ chối.**\n\n" +
                  "Em có thể nói: **“Không nên đi một mình, chỗ đó nguy hiểm.”**\n\n" +
                  "Nếu muốn đi bơi, hãy xin phép gia đình và chọn nơi an toàn có người lớn giám sát."
    },

    {
        id: "catching_fish_near_water",
        keywords: [
            'bắt cá gần ao',
            'bat ca o song',
            'đi bắt cá',
            'bắt cá dưới mương',
            'xuống ao bắt cá'
        ],
        response: "**Bắt cá ở ao, hồ, sông hoặc mương có thể làm em đến rất gần vùng nước sâu và trơn trượt.**\n\n" +
                  "Tài liệu nêu rằng học sinh tiểu học có thể gặp đuối nước khi chơi đùa hoặc bắt cá ở ao hồ, sông suối gần nhà.\n\n" +
                  "Em không nên tự xuống nước hoặc ra mép ao, sông để bắt cá khi không có người lớn bảo đảm an toàn."
    },

    {
        id: "fish_in_water_curiosity",
        keywords: [
            'xem cá gần nước',
            'xem ca trong chum',
            'cúi xem cá',
            'nhìn cá trong ao',
            'xem cá có nguy hiểm không'
        ],
        response: "**Khi xem cá, em vẫn cần giữ khoảng cách an toàn với mép nước hoặc vật chứa nước.**\n\n" +
                  "Không cúi người quá sâu, trèo lên thành chum, bể hoặc đứng sát mép ao.\n\n" +
                  "Một cú trượt chân cũng có thể làm em rơi xuống nước."
    },

    {
        id: "ball_falls_into_water",
        keywords: [
            'bóng rơi xuống sông',
            'bong roi xuong nuoc',
            'bóng rơi xuống hồ',
            'bóng xuống ao',
            'lấy bóng dưới nước'
        ],
        response: "**Nếu bóng rơi xuống sông, hồ hoặc ao, em không được tự bơi hoặc lội xuống lấy.**\n\n" +
                  "Tài liệu nêu tình huống thực tế học sinh chơi bóng gần sông, bóng rơi xuống nước và có em bơi ra lấy rồi gặp vùng nước xoáy.\n\n" +
                  "Hãy để bóng lại và gọi người lớn hỗ trợ. **Mất một quả bóng còn hơn gặp nguy hiểm đến tính mạng.**"
    },

    {
        id: "toy_falls_into_water",
        keywords: [
            'đồ chơi rơi xuống nước',
            'do choi roi xuong ao',
            'đồ rơi xuống sông',
            'lấy đồ dưới hồ',
            'đồ vật rơi xuống nước'
        ],
        response: "**Nếu đồ chơi hoặc đồ vật rơi xuống vùng nước nguy hiểm, em không nên tự xuống lấy.**\n\n" +
                  "Nước có thể sâu hơn em nghĩ hoặc có dòng chảy, bùn, vật cản bên dưới.\n\n" +
                  "Hãy gọi người lớn. Đồ vật có thể thay thế được, còn sự an toàn của em là quan trọng nhất."
    },

    {
        id: "football_near_river",
        keywords: [
            'đá bóng gần sông',
            'da bong gan song',
            'chơi bóng ven hồ',
            'đá bóng gần nước',
            'bóng đá ven sông'
        ],
        response: "**Không nên chọn bãi chơi bóng quá gần sông, hồ hoặc vùng nước sâu.**\n\n" +
                  "Bóng có thể lăn xuống nước và khiến em hoặc bạn muốn xuống lấy.\n\n" +
                  "Tài liệu đã nêu một vụ việc nghiêm trọng xảy ra từ tình huống bóng bị đá xuống sông.\n\n" +
                  "Hãy chọn sân chơi cách xa mép nước."
    },

    {
        id: "play_near_dam",
        keywords: [
            'chơi gần đập',
            'choi gan dap',
            'ra đập chơi',
            'đi chơi hồ đập',
            'đập nước có nguy hiểm không'
        ],
        response: "**Hồ và đập nước là nơi không phù hợp để trẻ em tự ý vui chơi.**\n\n" +
                  "Nước có thể sâu, bờ trơn và có những vùng nguy hiểm khó nhìn thấy.\n\n" +
                  "Tài liệu cảnh báo học sinh không được tự rủ nhau chơi đùa trên hồ, đập hoặc sông."
    },

    {
        id: "slippery_water_edge",
        keywords: [
            'bờ sông trơn',
            'bo ao tron',
            'trượt chân xuống nước',
            'mép hồ trơn',
            'đứng sát mép nước'
        ],
        response: "**Bờ ao, hồ hoặc sông có thể trơn và làm em trượt chân bất ngờ.**\n\n" +
                  "Không đứng sát mép, chạy nhảy hoặc xô đẩy nhau ở khu vực này.\n\n" +
                  "Nếu cần quan sát mặt nước, hãy đứng ở nơi chắc chắn và có khoảng cách an toàn."
    },

    {
        id: "push_friend_near_water",
        keywords: [
            'xô bạn gần nước',
            'day ban xuong nuoc',
            'đùa đẩy nhau ven sông',
            'đẩy bạn xuống hồ',
            'xô nhau gần ao'
        ],
        response: "**Không được xô, đẩy hoặc giả vờ đẩy bạn xuống nước.**\n\n" +
                  "Một trò đùa có thể khiến bạn mất thăng bằng, rơi xuống chỗ sâu hoặc đập vào vật cứng.\n\n" +
                  "Khi vui chơi gần nước, cần giữ khoảng cách và không đùa nghịch nguy hiểm."
    },

    {
        id: "holding_hands_rescue_chain",
        keywords: [
            'nắm tay nhau cứu bạn',
            'nam tay cuu ban',
            'xếp hàng kéo bạn',
            'nối tay cứu người',
            'cả nhóm kéo bạn'
        ],
        response: "**Không nên nắm tay nhau thành chuỗi để kéo người đang ở dưới nước nếu việc đó khiến các em tiến sát hoặc xuống nước.**\n\n" +
                  "Tài liệu nêu những vụ việc nhiều học sinh cùng gặp nạn khi lần lượt nắm tay nhau để cứu bạn.\n\n" +
                  "Hãy gọi người lớn và dùng gậy, dây hoặc phao từ vị trí an toàn."
    },

    {
        id: "one_friend_falls_group_action",
        keywords: [
            'một bạn rơi xuống nước',
            'mot ban roi xuong nuoc',
            'bạn trượt chân xuống hồ',
            'bạn ngã xuống ao',
            'bạn rơi xuống sông'
        ],
        response: "**Nếu một bạn trong nhóm rơi xuống nước, những bạn còn lại không được lần lượt nhảy xuống cứu.**\n\n" +
                  "Hãy hô cứu thật to, gọi người lớn và tìm vật nổi hoặc vật dài để hỗ trợ từ trên bờ.\n\n" +
                  "Điều quan trọng là không để một tai nạn trở thành tai nạn của cả nhóm."
    },

    {
        id: "group_water_play_risk",
        keywords: [
            'đi chơi đông có an toàn không',
            'di choi ca nhom gan song',
            'đông bạn ra hồ',
            'cả nhóm đi tắm',
            'nhiều bạn đi cùng'
        ],
        response: "**Có nhiều bạn đi cùng không có nghĩa là khu vực nước trở nên an toàn.**\n\n" +
                  "Nếu không có người lớn và không ai có kỹ năng cứu hộ, khi một bạn gặp nạn những bạn khác rất dễ hoảng loạn và cứu sai cách.\n\n" +
                  "Trẻ em vẫn cần có người lớn giám sát."
    },

    {
        id: "picnic_near_water_safety",
        keywords: [
            'dã ngoại gần hồ',
            'da ngoai gan song',
            'picnic gần nước',
            'đi chơi ven hồ',
            'đi chơi gần sông'
        ],
        response: "**Khi đi chơi hoặc dã ngoại ở nơi gần sông, hồ, em cần áp dụng các nguyên tắc an toàn giống như khi vui chơi gần vùng nước mở.**\n\n" +
                  "Không tự tách khỏi người lớn để ra sát mép nước, không tự xuống tắm và không chạy nhảy ở bờ trơn.\n\n" +
                  "Nếu muốn xuống nước, chỉ thực hiện tại khu vực được phép và có người lớn giám sát."
    },

    {
        id: "trip_to_beach_with_family",
        keywords: [
            'đi du lịch biển',
            'di bien voi gia dinh',
            'đi chơi biển',
            'du lịch tắm biển',
            'đi biển cần nhớ gì'
        ],
        response: "**Khi đi du lịch biển, em chỉ nên tắm ở khu vực an toàn và có người lớn đi cùng.**\n\n" +
                  "Tài liệu có tình huống riêng hướng dẫn học sinh nhận biết khu vực được tắm và khu vực không an toàn.\n\n" +
                  "Không tự ý chạy ra biển hoặc xuống nước khi người lớn chưa đồng ý."
    },

    {
        id: "leave_group_near_water",
        keywords: [
            'tách nhóm ra bờ sông',
            'tu di ra ho',
            'đi riêng gần nước',
            'trốn người lớn ra sông',
            'một mình ra bờ hồ'
        ],
        response: "**Không nên tự tách khỏi nhóm hoặc người lớn để đi ra khu vực gần nước.**\n\n" +
                  "Nếu xảy ra trượt ngã hoặc sự cố, có thể không ai phát hiện kịp thời.\n\n" +
                  "Hãy luôn ở trong phạm vi mà người lớn có thể quan sát và hỗ trợ."
    },

    {
        id: "take_photo_near_water_edge",
        keywords: [
            'chụp ảnh sát mép nước',
            'chup anh bo song',
            'chụp hình ven hồ',
            'đứng sát nước chụp ảnh',
            'selfie gần sông'
        ],
        response: "**Khi chụp ảnh gần sông, hồ hoặc ao, em vẫn phải giữ khoảng cách an toàn.**\n\n" +
                  "Không lùi sát mép nước, trèo lên đá trơn hoặc đứng ở vị trí dễ trượt ngã chỉ để chụp hình.\n\n" +
                  "Nếu khu vực không chắc chắn, hãy chọn vị trí khác an toàn hơn."
    },

    {
        id: "water_play_without_adult",
        keywords: [
            'chơi nước không có người lớn',
            'choi nuoc mot minh',
            'không có người lớn vẫn chơi',
            'bạn bè tự đi chơi nước',
            'tự đi ra hồ'
        ],
        response: "**Trẻ em không nên tự chơi ở vùng nước mở khi không có người lớn giám sát.**\n\n" +
                  "Ao, hồ, sông, suối có thể có chỗ sâu, bùn, dòng chảy hoặc vật cản mà em không nhận biết được.\n\n" +
                  "Hãy chọn nơi vui chơi khác an toàn hơn."
    },

    {
        id: "water_activity_safe_choice",
        keywords: [
            'muốn chơi gần nước làm sao',
            'choi gan nuoc an toan',
            'đi chơi hồ sao an toàn',
            'vui chơi ven sông',
            'chọn chỗ chơi an toàn'
        ],
        response: "**Nếu hoạt động ở nơi gần nước, hãy chọn khu vực bằng phẳng, chắc chắn và cách xa mép nước nguy hiểm.**\n\n" +
                  "Luôn ở gần người lớn, không tự ý xuống nước và không đuổi bắt, xô đẩy nhau sát bờ.\n\n" +
                  "Nếu thấy biển cấm hoặc khu vực nguy hiểm, hãy tránh xa."
    },

    {
        id: "daily_water_safety_summary",
        keywords: [
            'nhớ gì khi chơi gần nước',
            'quy tac choi gan nuoc',
            'tóm tắt vui chơi an toàn',
            'chơi gần sông nhớ gì',
            'đi chơi gần hồ cần nhớ'
        ],
        response: "**Khi vui chơi gần ao, hồ, sông hoặc suối, em hãy nhớ:**\n\n" +
                  "1. **Không đến sát mép nước.**\n" +
                  "2. **Không tự xuống lấy bóng hoặc đồ vật.**\n" +
                  "3. **Không bắt cá, tắm hoặc bơi khi không có người lớn.**\n" +
                  "4. **Không xô đẩy, chạy nhảy sát bờ.**\n" +
                  "5. Nếu bạn rơi xuống nước, **gọi người lớn – dùng gậy/dây/phao – không nhảy xuống cứu.**\n\n" +
                  "Câu dễ nhớ: **Chơi xa mép nước – Đồ rơi không xuống lấy – Bạn gặp nạn thì gọi người lớn.**"
    },
 {
        id: "known_swimmer_can_swim_anywhere",
        keywords: [
            'biết bơi rồi xuống sông được không',
            'biet boi xuong song',
            'bơi giỏi xuống hồ được không',
            'biết bơi tắm ao được không',
            'biết bơi xuống đâu cũng được'
        ],
        response: "**Không. Biết bơi không có nghĩa là em có thể xuống bất kỳ nơi nào có nước.**\n\n" +
                  "Sông, hồ, ao hoặc biển có thể có chỗ sâu bất ngờ, dòng chảy mạnh, nước xoáy hoặc vật cản dưới nước.\n\n" +
                  "Em chỉ nên bơi ở khu vực an toàn, được phép và có người lớn giám sát."
    },

    {
        id: "shallow_water_is_always_safe",
        keywords: [
            'nước nông có nguy hiểm không',
            'nuoc nong co sao khong',
            'nước cạn có đuối không',
            'chỗ nông có an toàn',
            'nông thì không sao đúng không'
        ],
        response: "**Không nên nghĩ nước nông là hoàn toàn an toàn.**\n\n" +
                  "Độ sâu có thể thay đổi đột ngột và dưới nước có thể có hố, bùn, vật sắc nhọn hoặc chỗ trơn.\n\n" +
                  "Trẻ em vẫn cần có người lớn giám sát khi ở gần hoặc trong nước."
    },

    {
        id: "calm_water_is_always_safe",
        keywords: [
            'nước yên có an toàn không',
            'nuoc yen co an toan',
            'nước lặng có sao không',
            'không có sóng là an toàn',
            'nước phẳng có bơi được'
        ],
        response: "**Không. Nước yên chưa chắc là nước an toàn.**\n\n" +
                  "Theo tài liệu, vùng nước yên vẫn có thể có dòng chảy mạnh, vật sắc nhọn, chất bẩn hoặc độ sâu thay đổi bất ngờ.\n\n" +
                  "Ở biển, vùng lặng sóng thậm chí có thể liên quan đến dòng chảy xa bờ."
    },

    {
        id: "life_jacket_allows_anywhere",
        keywords: [
            'có áo phao xuống đâu cũng được không',
            'ao phao la an toan',
            'mặc phao rồi xuống sông',
            'có phao thì bơi đâu cũng được',
            'áo phao là đủ chưa'
        ],
        response: "**Không. Áo phao giúp tăng an toàn nhưng không biến mọi vùng nước thành nơi an toàn.**\n\n" +
                  "Em vẫn phải tránh nơi nước sâu, nước xoáy, dòng chảy mạnh hoặc khu vực bị cấm.\n\n" +
                  "Áo phao phải được mặc đúng cách, đúng kích cỡ và trẻ em vẫn cần người lớn giám sát."
    },

    {
        id: "life_jacket_wrong_size_safe",
        keywords: [
            'áo phao rộng có sao không',
            'ao phao sai co',
            'phao to quá có dùng được',
            'áo phao nhỏ có được không',
            'phao không vừa'
        ],
        response: "**Áo phao cần đúng kích cỡ với người mặc.**\n\n" +
                  "Áo phao quá rộng hoặc không được mặc đúng cách có thể không giữ cơ thể ổn định khi xuống nước.\n\n" +
                  "Hãy nhờ người lớn kiểm tra và cài áo phao đúng trước khi sử dụng."
    },

    {
        id: "swim_with_good_friend_no_adult",
        keywords: [
            'đi với bạn bơi giỏi được không',
            'ban boi gioi trong minh',
            'không có người lớn nhưng có bạn',
            'đi bơi với anh biết bơi',
            'bạn giỏi bơi là đủ chưa'
        ],
        response: "**Không. Một người bạn bơi giỏi không thể thay thế người lớn giám sát.**\n\n" +
                  "Theo tài liệu, bơi giỏi không có nghĩa là người đó biết nhận biết mọi nguy hiểm hoặc có kỹ năng cứu hộ.\n\n" +
                  "Trẻ em vẫn cần người lớn đủ khả năng quan sát và hỗ trợ."
    },

    {
        id: "swim_alone_if_good_swimmer",
        keywords: [
            'bơi giỏi đi một mình được không',
            'boi mot minh duoc khong',
            'biết bơi có đi một mình được',
            'một mình xuống hồ',
            'tự đi bơi được không'
        ],
        response: "**Không. Trẻ em không nên bơi một mình dù đã biết bơi.**\n\n" +
                  "Sự cố như chuột rút, mệt, dòng nước mạnh hoặc nước xoáy có thể xảy ra bất ngờ.\n\n" +
                  "Luôn cần có người lớn giám sát khi em bơi."
    },

    {
        id: "swim_without_lifeguard",
        keywords: [
            'không có cứu hộ có bơi không',
            'khong co cuu ho',
            'bãi biển không cứu hộ',
            'hồ không có nhân viên cứu hộ',
            'không cứu hộ vẫn tắm'
        ],
        response: "**Nơi an toàn hơn để bơi là nơi có người lớn giám sát và có lực lượng cứu hộ khi cần.**\n\n" +
                  "Nếu khu vực không có nhân viên cứu hộ, em càng không được tự ý xuống nước.\n\n" +
                  "Hãy hỏi người lớn và chỉ bơi ở nơi được xác định là an toàn."
    },

    {
        id: "good_weather_means_water_safe",
        keywords: [
            'trời đẹp thì nước an toàn đúng không',
            'troi dep co an toan',
            'không mưa thì bơi đâu cũng được',
            'thời tiết tốt là đủ chưa'
        ],
        response: "**Thời tiết tốt chỉ là một điều kiện, chưa đủ để khẳng định nơi đó an toàn.**\n\n" +
                  "Em vẫn cần xem độ sâu, dòng chảy, biển báo, khu vực được phép và phải có người lớn giám sát."
    },

    {
        id: "pool_is_always_safe",
        keywords: [
            'hồ bơi luôn an toàn đúng không',
            'be boi co nguy hiem',
            'bể bơi có đuối không',
            'hồ bơi thì không sao',
            'bể bơi an toàn tuyệt đối'
        ],
        response: "**Không. Bể bơi an toàn hơn khi được quản lý tốt nhưng vẫn có thể xảy ra tai nạn.**\n\n" +
                  "Em vẫn cần tuân thủ nội quy, bơi đúng khu vực, không xô đẩy, không tự nhảy xuống chỗ sâu và nghe hướng dẫn của giáo viên hoặc cứu hộ."
    },

    {
        id: "river_near_home_is_safe",
        keywords: [
            'sông gần nhà có an toàn không',
            'song gan nha',
            'ao nhà quen rồi có sao không',
            'hồ gần nhà quen thuộc',
            'chỗ quen có nguy hiểm không'
        ],
        response: "**Nơi quen thuộc vẫn có thể nguy hiểm.**\n\n" +
                  "Mực nước, dòng chảy hoặc đáy sông hồ có thể thay đổi mà em không biết.\n\n" +
                  "Không nên chủ quan chỉ vì em đã từng chơi hoặc bơi ở đó nhiều lần."
    },

    {
        id: "know_one_stroke_is_safe",
        keywords: [
            'biết bơi ếch là an toàn chưa',
            'biet boi ech la du',
            'biết một kiểu bơi',
            'bơi sải là đủ chưa',
            'biết bơi cơ bản là đủ'
        ],
        response: "**Chưa. Chỉ biết một kiểu bơi không có nghĩa là em đã an toàn hoàn toàn.**\n\n" +
                  "Em còn cần biết nổi ngửa, đứng nước, tự cứu, nhận biết nơi nguy hiểm và tuân thủ quy tắc an toàn.\n\n" +
                  "Tài liệu nhấn mạnh rằng ngay cả người bơi giỏi vẫn có thể gặp sự cố."
    },

    {
        id: "strong_swimmer_can_rescue_directly",
        keywords: [
            'bơi giỏi cứu người được không',
            'boi gioi nhay cuu',
            'biết bơi có nhảy xuống cứu',
            'em bơi giỏi em cứu bạn nhé',
            'giỏi bơi cứu trực tiếp'
        ],
        response: "**Không nên. Trẻ em dù bơi giỏi vẫn không nên nhảy xuống cứu trực tiếp.**\n\n" +
                  "Người bị đuối nước có thể hoảng loạn, bấu víu và kéo người cứu xuống theo.\n\n" +
                  "Hãy gọi người lớn, đưa gậy hoặc ném phao từ nơi an toàn."
    },

    {
        id: "small_amount_water_cannot_drown",
        keywords: [
            'ít nước có đuối không',
            'it nuoc co sao khong',
            'chậu ít nước có nguy hiểm',
            'xô ít nước có đuối',
            'nước ít không sao đúng không'
        ],
        response: "**Sai. Một lượng nước nhỏ vẫn có thể gây đuối nước, đặc biệt với trẻ nhỏ.**\n\n" +
                  "Vì vậy, xô, chậu, lu, chum, bể hoặc các vật chứa nước cần được che đậy, cất an toàn hoặc làm rỗng khi không dùng."
    },

    {
        id: "warning_sign_absent_means_safe",
        keywords: [
            'không có biển cấm là an toàn',
            'khong co bien bao',
            'không có biển nguy hiểm',
            'không cấm thì xuống được',
            'không thấy cảnh báo'
        ],
        response: "**Không. Không có biển cảnh báo không có nghĩa là khu vực đó an toàn.**\n\n" +
                  "Tài liệu nhấn mạnh rằng môi trường sống có nhiều nguy cơ đuối nước nhưng không phải nơi nào cũng có biển cảnh báo.\n\n" +
                  "Nếu không rõ độ sâu hoặc mức độ an toàn, em không nên xuống nước."
    },

    {
        id: "adult_present_means_any_water_safe",
        keywords: [
            'có người lớn thì xuống đâu cũng được',
            'co nguoi lon la an toan',
            'người lớn đi cùng thì bơi nước xiết',
            'có bố mẹ thì chỗ sâu cũng được',
            'có người lớn khỏi sợ'
        ],
        response: "**Không. Có người lớn đi cùng không có nghĩa là em được xuống mọi vùng nước.**\n\n" +
                  "Tài liệu vẫn yêu cầu trẻ em tránh những nơi nước sâu, chảy xiết hoặc nước xoáy, kể cả khi có người lớn giám sát.\n\n" +
                  "Người lớn giúp giám sát, nhưng việc chọn nơi an toàn vẫn rất quan trọng."
    },

    {
        id: "float_device_replaces_supervision",
        keywords: [
            'có phao không cần người lớn',
            'co phao khoi can giam sat',
            'mặc phao tự bơi',
            'áo phao thay người lớn được không',
            'có phao thì đi một mình'
        ],
        response: "**Không. Áo phao không thay thế được sự giám sát của người lớn.**\n\n" +
                  "Phao chỉ là một phương tiện hỗ trợ an toàn.\n\n" +
                  "Trẻ em vẫn cần người lớn ở gần để quan sát và hỗ trợ nếu có sự cố."
    },

    {
        id: "quiet_beach_without_waves_safe",
        keywords: [
            'biển không có sóng có an toàn',
            'bien lang an toan',
            'chỗ ít sóng có bơi được',
            'biển yên xuống được không',
            'không sóng thì an toàn'
        ],
        response: "**Không nên kết luận như vậy.**\n\n" +
                  "Theo tài liệu, một số vùng biển ít sóng có thể là khu vực có dòng chảy rút xa bờ.\n\n" +
                  "Hãy tắm ở khu vực được phép và hỏi nhân viên cứu hộ hoặc người lớn nếu không chắc."
    },

    {
        id: "swim_when_tired_if_good_swimmer",
        keywords: [
            'mệt nhưng biết bơi có xuống được không',
            'met van boi',
            'bơi giỏi nhưng mệt',
            'mệt có đi bơi được',
            'đang mệt xuống nước'
        ],
        response: "**Không. Khi cơ thể mệt, em không nên xuống nước dù biết bơi.**\n\n" +
                  "Mệt làm sức bơi giảm và dễ khiến em không xử lý kịp khi gặp tình huống bất ngờ.\n\n" +
                  "Hãy nghỉ ngơi và chỉ bơi khi cơ thể khỏe, có người lớn giám sát."
    },

    {
        id: "swim_in_bad_weather_with_adult",
        keywords: [
            'có người lớn thì mưa vẫn bơi được không',
            'mua van boi duoc khong',
            'có bố mẹ bơi lúc giông',
            'mưa có cứu hộ vẫn bơi',
            'trời xấu có người lớn'
        ],
        response: "**Không. Thời tiết xấu vẫn là lý do phải dừng bơi.**\n\n" +
                  "Tài liệu quy định không bơi, lội khi trời đang hoặc sắp có mưa to, giông hoặc sét.\n\n" +
                  "Có người lớn đi cùng không làm mất đi nguy cơ từ thời tiết."
    },

    {
        id: "friend_falls_should_jump_immediately",
        keywords: [
            'bạn rơi xuống nước phải nhảy cứu ngay đúng không',
            'ban roi xuong nhay cuu',
            'thấy bạn chìm phải lao xuống',
            'cứu bạn càng nhanh càng phải nhảy',
            'nhảy ngay xuống cứu'
        ],
        response: "**Sai. Nhanh chóng giúp đỡ không có nghĩa là phải nhảy xuống nước.**\n\n" +
                  "Trẻ em cần hô cứu, gọi người lớn và dùng gậy, dây, phao hoặc vật nổi từ vị trí an toàn.\n\n" +
                  "Nhảy xuống trực tiếp có thể khiến em trở thành người gặp nạn thứ hai."
    },

    {
        id: "water_safety_quick_true_false",
        keywords: [
            'đúng hay sai về đuối nước',
            'dung sai duoi nuoc',
            'câu hỏi đúng sai',
            'kiểm tra an toàn nước',
            'đố em phòng đuối nước'
        ],
        response: "**Một số câu đúng – sai dễ nhớ:**\n\n" +
                  "❌ Biết bơi thì xuống đâu cũng được – **SAI**.\n" +
                  "❌ Nước yên luôn an toàn – **SAI**.\n" +
                  "❌ Có áo phao thì không cần người lớn – **SAI**.\n" +
                  "❌ Bạn bơi giỏi có thể thay người lớn giám sát – **SAI**.\n" +
                  "✅ Trẻ em cần bơi ở nơi an toàn và có người lớn giám sát – **ĐÚNG**.\n" +
                  "✅ Thấy bạn đuối nước cần gọi người lớn và hỗ trợ từ trên bờ – **ĐÚNG**."
    },
// BỔ SUNG CÁC TÌNH HUỐNG TÂM LÝ & CÂU HỎI NGÔ NGHÊ CỦA HỌC SINH
  // 1. TÂM LÝ ANH HÙNG / SỢ BỊ BẢO LÀ HÈN
  {
    id: "why_not_jump_to_save_friend",
    category: "drowning",
    keywords: [
      "tại sao không được nhảy xuống cứu bạn",
      "sao không được cứu bạn",
      "bạn sắp chết sao không nhảy xuống cứu",
      "sao k dc nhay xuong cuu",
      "để bạn chết đuối à",
      "không cứu bạn là hèn",
      "sao không nhảy xuống vớt bạn",
      "nhảy xuống cứu bạn thân"
    ],
    response: "**Thỏ ngọc hiểu em rất thương bạn và muốn làm người hùng, nhưng tuyệt đối KHÔNG NHẢY XUỐNG! 🦸‍♂️🚫**\n\n**Vì sao ư?**\n1. Khi sắp chìm, bạn đang cực kỳ hoảng loạn. Bạn sẽ coi em như một cây cọc và **dìm chặt đầu em xuống nước** để ngoi lên thở.\n2. Sức của bạn lúc đó mạnh gấp 3 lần bình thường, em sẽ bị kéo chìm theo ngay lập tức!\n3. **Cứu thông minh mới là dũng cảm:** Hô thật to gọi người lớn, tìm cành cây dài hoặc ném can nhựa/phao xuống cho bạn bám. Đó mới là cách cứu sống bạn thực sự!"
  },

  // 2. TÂM LÝ "BIẾT BƠI CHÓ / BƠI BÌNH THƯỜNG" LÀ VÔ ĐỊCH
  {
    id: "dog_paddle_overconfidence",
    category: "drowning",
    keywords: [
      "cháu biết bơi chó rồi",
      "em biết bơi chó",
      "biet boi cho",
      "bơi chó có bị chìm không",
      "bơi được một đoạn rồi sao phải sợ",
      "em bơi được mà sao cấm"
    ],
    response: "**Bơi chó chỉ giúp em nổi được một đoạn ngắn ở chỗ nước êm thôi nhé! 🐶💦**\n\n• Ở sông, suối, biển có **dòng nước ngầm** chảy rất xiết và nhiệt độ nước lạnh bất ngờ.\n• Kiểu bơi chó làm em **nhanh mất sức gấp đôi** bơi chuẩn. Chỉ sau 2-3 phút là chân tay em mỏi nhừ, cứng đờ (chuột rút) và không tự bơi vào bờ được nữa.\n• Muốn an toàn, em cần học bơi bài bản và kỹ năng thả nổi ngửa ngơi sức nhé!"
  },

  // 3. THẮC MẮC QUANG HỌC: "NƯỚC TRONG / TRÔNG NÔNG SAO LẠI SÂU?"
  {
    id: "why_clear_water_is_deep",
    category: "drowning",
    keywords: [
      "nước nhìn cạn sao lại sâu",
      "sao nhìn thấy đáy mà vẫn đuối",
      "nước trong veo có sâu không",
      "nhìn nước nông lắm",
      "sao nước nhìn cạn queo",
      "đáy ao nhìn gần xịt"
    ],
    response: "**Đó là một 'chiếc bẫy ảo giác' của mắt đấy em! 👀⚠️**\n\n• Khi nhìn qua mặt nước trong suốt, mắt mình sẽ bị đánh lừa: **Đáy nước trông có vẻ rất nông nhưng thực tế lại sâu hơn cả cái đầu của em!**\n• Chưa kể mép bờ thường trơn tuột hoặc hụt chân bất ngờ (hố sâu sụt cát).\n• Đừng bao giờ tin vào mắt mình khi nhìn xuống nước tự nhiên: Luôn có người lớn kiểm tra độ sâu trước nhé!"
  },

  // 4. ÁP LỰC BẠN BÈ: BỊ BẠN THÁCH THỨC / CHÊ NHÁT GAN
  {
    id: "peer_pressure_dare_swim",
    category: "behavior",
    keywords: [
      "bạn bảo em nhát gan",
      "bạn chê em hèn",
      "bạn thách em nhảy xuống",
      "bạn thách bơi qua sông",
      "bị bạn rủ rê trêu chọc",
      "bạn bảo nhát không dám tắm"
    ],
    response: "**Ai dám từ chối mới là người dũng cảm và thông minh nhất! 🛡️😎**\n\n• Khi bạn thách: *'Mày nhát thế, không dám nhảy à?'*, em hãy mỉm cười và trả lời:\n👉 **'Tớ yêu mạng sống của tớ hơn! Ai muốn bơi thì phải đến bể bơi có phao và người lớn cơ!'**\n• Người bạn tốt sẽ không bao giờ thách em làm điều nguy hiểm đến tính mạng đâu nhé!"
  },

  // 5. CỨU THÚ CƯNG (CHÓ/MÈO RƠI XUỐNG NƯỚC)
  {
    id: "pet_falls_into_water",
    category: "drowning",
    keywords: [
      "chó rơi xuống ao có cứu không",
      "mèo ngã xuống nước",
      "cứu con cún rơi xuống sông",
      "chó cưng bị chìm",
      "cún con ngã xuống nước"
    ],
    response: "**Bình tĩnh nghe Thỏ ngọc dặn này: Tuyệt đối KHÔNG nhảy xuống vớt cún/mèo nhé! 🐶🐱❌**\n\n1. Loài chó và mèo có bản năng sinh tồn tự bơi vào bờ giỏi hơn chúng ta tưởng rất nhiều.\n2. Bờ ao dốc trơn, em nhảy xuống sẽ bị trượt chân và ngạt nước trước cả thú cưng đấy!\n3. **Cách làm đúng:** Hô to nhờ người lớn, hoặc tìm một cành cây to/tấm ván gác thoai thoải xuống mép nước để cún tự bám trèo lên bờ."
  },

  // 6. TẠI SAO LẠI CẤM DỐC NGƯỢC NGƯỜI (XỐC NƯỚC)?
  {
    id: "why_no_upending_victim",
    category: "first_aid",
    keywords: [
      "sao không được dốc ngược người",
      "vì sao cấm xốc nước",
      "tại sao không dốc nước ra",
      "sao khong cho vác chạy",
      "xốc nước có hại gì",
      "sao không dốc đầu xuống"
    ],
    response: "**Vì xốc nước là cách làm SAI và cực kỳ NGUY HIỂM! 🚑🛑**\n\n• Khi bị ngạt nước, phổi nạn nhân **thiếu ô-xy**, não chỉ sống được khoảng 4-5 phút.\n• Nước trong bụng không làm chết người, mà việc em **vác nạn nhân chạy vòng vòng sẽ làm mất 'thời gian vàng' cấp cứu não**.\n• Nguy hiểm hơn: Thức ăn và nước trong dạ dày sẽ trào ngược lên, chui thẳng vào đường thở làm nạn nhân nghẹt thở chết nhanh hơn!\n👉 **Đúng nhất:** Đặt nằm ngửa chỗ phẳng, lau sạch mũi miệng và người lớn lập tức ép tim thổi ngạt!"
  },

  // 7. ĐEO PHAO LÀ BẤT TỬ?
  {
    id: "floatie_armband_myth",
    category: "drowning",
    keywords: [
      "đeo phao tay rồi sao phải sợ",
      "có phao bơi rồi nhảy đâu cũng được",
      "ôm phao có bị đuối không",
      "phao tròn có an toàn không",
      "phao xì hơi thì sao"
    ],
    response: "**Phao chỉ là đồ chơi hỗ trợ, KHÔNG PHẢI bùa hộ mệnh đâu nhé! 🛟⚠️**\n\n• Phao tay hoặc phao tròn có thể bị **tuột khỏi người, bị lật úp** làm em chúi đầu xuống nước không ngóc lên được.\n• Phao bơi bằng cao su rất dễ bị cành cây, đá nhọn châm thủng xì hơi bất ngờ.\n• Dòng nước mạnh hoặc sóng biển có thể cuốn bay cả em và chiếc phao ra xa bờ.\n👉 Dù đeo phao, em vẫn luôn phải có người lớn đứng cạnh trong tầm với tay!"
  },

  // 8. ĐIỆN VÀ NƯỚC (CÂU HỎI NGÔ NGHÊ)
  {
    id: "why_water_conducts_electricity",
    category: "electric",
    keywords: [
      "sao tay ướt lại bị giật",
      "nước có cắn người đâu sao cắm điện bị giật",
      "vì sao tay ướt chạm ổ điện nguy hiểm",
      "chân ướt sờ vào tủ lạnh"
    ],
    response: "**Tưởng tượng da khô như một lớp áo giáp, còn nước là 'đường cao tốc' cho điện chạy qua! ⚡💧**\n\n• Khi tay em khô, điện khó chui vào người.\n• Nhưng khi tay bị ướt, nước lập tức mở đường cho dòng điện lao thẳng qua tim chỉ trong chớp mắt!\n• Vì vậy: **Tay ướt, chân ướt tuyệt đối không được sờ vào công tắc, ổ cắm hay phích cắm điện nhé!**"
  },

  // 9. NƯỚC CẠN Ở NHÀ (XÔ NƯỚC, CHẬU TẮM)
  {
    id: "drowning_in_small_bucket",
    category: "drowning",
    keywords: [
      "xô nước tí xíu sao chết đuối được",
      "sao ngã vào chậu nước lại chết",
      "chậu nước có tí tẹo sao nguy hiểm",
      "chậu tắm của em bé có nguy hiểm không"
    ],
    response: "**Chỉ cần một lượng nước ngập qua mũi và miệng là đã có thể bị đuối nước rồi! 🪣⚠️**\n\n• Các em bé nhỏ đầu rất nặng nhưng cổ và tay còn yếu. Khi cúi đầu cắm vào xô/chậu để với đồ chơi, bé sẽ bị **lộn nhào đầu xuống đáy**.\n• Bé không tự chống tay đứng dậy được và không thể cất tiếng kêu cứu.\n• Hãy nhắc bố mẹ đổ hết nước trong xô chậu và đậy nắp bồn cầu lại nhé!"
  },

  // 10. BỎNG - TẠI SAO CẤM BÔI KEM ĐÁNH RĂNG/NƯỚC MẮM?
  {
    id: "why_no_toothpaste_on_burn",
    category: "injury",
    keywords: [
      "sao không được bôi kem đánh răng vào vết bỏng",
      "bôi nước mắm vào vết bỏng được không",
      "bôi mỡ trăn vào vết bỏng",
      "tại sao cấm bôi kem đánh răng"
    ],
    response: "**Tuyệt đối KHÔNG bôi kem đánh răng, nước mắm hay mỡ trăn vào vết bỏng nhé! 🛑🩹**\n\n• Kem đánh răng có chất kiềm, bôi vào vết da đang trợt sẽ làm vết bỏng **nhiễm trùng và ăn sâu vào thịt hơn**.\n• Nước mắm chứa vi khuẩn, mỡ trăn giữ nhiệt làm vết bỏng càng hầm nóng và thối rữa.\n👉 **Cách DUY NHẤT đúng:** Ngâm hoặc xả nhẹ vùng bị bỏng dưới **vòi nước mát sạch** trong 15-20 phút rồi đến gặp bác sĩ!"
  },
{
    "id": "drink_lake_water_not_drown",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "uống hết nước hồ",
      "uống nước để không bị chìm",
      "chìm thì uống nước",
      "uong nuoc ho",
      "uống nước ao cho đỡ chìm",
      "uống hết nước sông"
    ],
    "response": "**Thỏ ngọc cười xỉu với ý tưởng này luôn! 😂 Nhưng tuyệt đối đừng làm thế nhé!**\n\n• Bụng của em chỉ bé bằng chiếc bình nước nhỏ, làm sao chứa hết cả hồ nước khổng lồ được!\n• Khi cố uống, nước sẽ tràn vào **đường thở (phổi)** làm em bị sặc, ho sặc sụa và ngạt thở ngay lập tức.\n👉 **Nhớ nè:** Khi bị chìm, hãy ngậm chặt miệng lại, ngửa cổ lên trời để mũi đón không khí và thả lỏng người để tự nổi lên nhé!"
  },
  {
    "id": "dip_feet_riverbank_safe",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "ngâm chân mép nước",
      "rửa chân mép sông",
      "rua chan mep song co sao ko",
      "chi ngoi ngam chan thoi",
      "thò chân xuống ao",
      "chỉ rửa chân thôi mà",
      "ngồi bờ ao rửa chân"
    ],
    "response": "**Tưởng chỉ rửa chân là an toàn nhưng lại cực kỳ nguy hiểm đấy em! ⚠️🦶**\n\n• Bờ ao, bờ sông phủ đầy rong rêu trơn như bôi mỡ. Rất nhiều bạn chỉ cúi xuống rửa chân là **trượt chân rơi tọt xuống vùng nước sâu**!\n• Ngoài ra mép bờ có thể bị sụt lún bất ngờ kéo em ngã nhào.\n👉 Nếu chân dính bẩn, hãy múc nước bằng gáo mang lên bãi đất bằng phẳng để rửa, không ngồi sát mép nước nhé!"
  },
  {
    "id": "hold_breath_contest_danger",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "thi nín thở dưới nước",
      "thi nin tho",
      "nín thở dưới bể bơi",
      "ai nín thở lâu hơn",
      "tro choi nin tho",
      "thi lặn xem ai lâu hơn"
    ],
    "response": "**Trò thi nín thở dưới nước nguy hiểm lắm, đừng bao giờ chơi nhé! 🛑⏱️**\n\n• Cố nhịn thở quá lâu sẽ làm não thiếu ô-xy đột ngột, khiến em **ngất xỉu trong tích tắc** mà chính em cũng không nhận ra.\n• Khi ngất dưới nước, cơ thể sẽ tự hít nước vào phổi và chìm nghỉm trong khi bạn bè tưởng em đang 'nhịn thở giỏi'.\n👉 Đi bơi là để khỏe mạnh và vui vẻ, không phải để thi nhịn thở đâu nha!"
  },
  {
    "id": "water_in_ear_deaf",
    "category": "health",
    "badge": "",
    "keywords": [
      "nước vào tai có bị điếc không",
      "nuoc vao tai",
      "nước chui vào lỗ tai",
      "bị nước vô tai làm sao",
      "nước vào tai có mọc nấm không"
    ],
    "response": "**Yên tâm nhé, nước vào tai không làm em bị điếc đâu! 👂💧**\n\n• Bên trong tai có một 'màng nhĩ' ngăn lại như cánh cửa, nước không thể chui tọt vào não được.\n• **Mẹo đuổi nước ra cực dễ:** Nghiêng đầu sang bên tai có nước, nhảy lò cò một chân vài cái nhẹ nhàng là nước tự chảy ra. Sau đó lấy khăn khô mềm lau sạch vành tai là xong!"
  },
  {
    "id": "jump_bridge_with_lifejacket",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "mặc áo phao nhảy cầu",
      "mac ao phao nhay tu tren cao",
      "nhảy từ cầu xuống nước có phao",
      "mặc phao nhảy từ trên cao",
      "nhảy cầu bơi"
    ],
    "response": "**Tuyệt đối KHÔNG ĐƯỢC làm trò mạo hiểm này nhé! 🌉🚫**\n\n• Khi nhảy từ trên cao xuống, mặt nước cứng đập vào người **mạnh như một bức tường bê tông**!\n• Cú va đập có thể làm chấn thương cổ, gãy xương hoặc cổ áo phao bị giật ngược siết nghẹn họng.\n👉 Áo phao chỉ dùng để bơi và giữ an toàn khi đi tàu thuyền, không bảo vệ được em khi nhảy từ trên cao xuống đâu!"
  },

  // --- NHÓM 2: CHÁY NỔ & THOÁT HIỂM ---
  {
    "id": "hide_under_bed_during_fire",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "trốn gầm giường khi cháy",
      "cháy trốn vào tủ quần áo",
      "chay tron gam giuong",
      "trốn vào tủ khi có cháy",
      "trốn trong phòng khi cháy",
      "cháy thì trốn ở đâu"
    ],
    "response": "**TUYỆT ĐỐI KHÔNG trốn vào gầm giường hay tủ quần áo khi có cháy! 🛏️🚪❌**\n\n• Khói độc bốc lên sẽ len lỏi vào gầm giường và tủ làm em ngạt thở rất nhanh.\n• Các chú lính cứu hỏa khi vào cứu cũng **không thể nhìn thấy em** giữa đám khói đen mịt mù.\n👉 **Cách làm đúng:** Lấy khăn ướt che mũi miệng, bò sát sàn nhà men theo tường chạy nhanh ra cửa thoát hiểm và hô to cầu cứu!"
  },
  {
    "id": "blow_fire_extinguish_myth",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "thổi vào đám cháy",
      "lửa nhỏ lấy miệng thổi",
      "thổi cho tắt lửa",
      "lửa cháy lấy quạt thổi",
      "thổi lửa như nến sinh nhật"
    ],
    "response": "**Đừng lấy miệng thổi vào đám lửa đang cháy nhé! 🎂🔥❌**\n\n• Thổi nến sinh nhật thì tắt, nhưng đám cháy lớn cần rất nhiều gió. Khi em thổi hoặc lấy quạt phẩy, em đang **cung cấp thêm khí giúp lửa bùng to hơn** và táp thẳng vào mặt gây bỏng nặng.\n👉 Khi thấy lửa cháy: Hô to báo người lớn ngay lập tức, không tự dùng miệng thổi nhé!"
  },
  {
    "id": "ice_cube_on_burn_myth",
    "category": "injury",
    "badge": "",
    "keywords": [
      "lấy đá lạnh chườm vết bỏng",
      "đắp đá vào vết bỏng",
      "bị bỏng chườm đá lạnh",
      "chườm đá vào chỗ bỏng",
      "đá lạnh xoa vết bỏng"
    ],
    "response": "**Không được đắp trực tiếp đá lạnh ngắt vào vết bỏng đâu nha! 🧊🚫**\n\n• Da vừa bị bỏng nhiệt đang rất yếu, gặp đá buốt đột ngột sẽ bị **'bỏng lạnh'**, làm các mô da bị tổn thương và hoại tử sâu hơn.\n👉 **Cách chuẩn nhất:** Xả nhẹ vùng bị bỏng dưới **vòi nước máy mát sạch** chảy từ từ trong 15-20 phút rồi bảo bố mẹ đưa đi trạm y tế nhé!"
  },
  {
    "id": "run_when_clothes_catch_fire",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "lửa bén vào quần áo chạy thật nhanh",
      "cháy áo thì chạy",
      "cháy quần áo chạy nhanh cho gió tắt",
      "lửa cháy trên người làm gì",
      "quần áo bắt lửa"
    ],
    "response": "**Lửa bén vào người mà chạy là lửa càng cháy to hơn đấy! 🏃‍♂️🔥❌**\n\n• Gió khi em chạy sẽ tiếp thêm ô-xy làm ngọn lửa bùng lên dữ dội hơn.\n👉 **Quy tắc vàng 3 bước:**\n1. **DỪNG LẠI (Stop):** Đứng yên, không chạy lung tung.\n2. **NẰM XUỐNG (Drop):** Nằm úp hoặc nằm nghiêng xuống đất, lấy hai tay che mặt.\n3. **LĂN QUA LĂN LẠI (Roll):** Lăn tròn thân mình liên tục xuống nền đất để đè tắt ngọn lửa!"
  },

  // --- NHÓM 3: ĐIỆN & THIẾT BỊ ĐIỆN ---
  {
    "id": "birds_on_wire_why_not_shocked",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "tại sao chim đậu dây điện không giật",
      "sao chim không bị điện giật",
      "chim dau day dien",
      "sao chim đậu trên dây điện được",
      "con chim đậu dây điện"
    ],
    "response": "**Một câu hỏi tò mò cực kỳ thú vị! 🐦⚡**\n\n• Chú chim đậu cả hai chân trên **cùng một sợi dây**, nên điện cứ thế chạy thẳng theo dây chứ không thèm chạy qua người chú chim.\n• Còn con người chúng ta đứng dưới đất hoặc chạm vào tường. Nếu chạm tay vào dây điện, dòng điện sẽ **chọn người em làm đường tắt phóng thẳng xuống đất** và gây giật rất nguy hiểm!\n👉 Vì vậy, tuyệt đối không được bắt chước chim sờ vào dây điện đâu nhé!"
  },
  {
    "id": "touch_socket_toy_battery",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "pin đồ chơi có giật chết người không",
      "pin tiểu có giật không",
      "chạm vào pin có giật không",
      "pin điều khiển có điện giật không",
      "pin đồng hồ giật không"
    ],
    "response": "**Pin tiểu, pin đồ chơi (1.5V - 9V) dòng điện rất nhỏ nên chạm tay vào không bị giật chết người! 🔋😊**\n\n• Nhưng em **tuyệt đối không được cắn, ngậm pin vào miệng hoặc ném vào lửa** vì hóa chất độc hại bên trong có thể phát nổ hoặc làm cháy bỏng lưỡi.\n• Khác hẳn với pin, ổ điện trên tường nhà em có dòng điện 220V cực mạnh - chạm vào là nguy hiểm tính mạng ngay!"
  },
  {
    "id": "poke_socket_with_plastic_pen",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "lấy bút bi chọc ổ điện",
      "chọc que nhựa vào ổ điện",
      "lấy đũa chọc ổ cắm",
      "chọc que gỗ vào ổ điện",
      "chọc bút chì vào ổ điện"
    ],
    "response": "**Tuyệt đối KHÔNG lấy bất cứ vật gì chọc vào ổ điện! ⚡🖊️❌**\n\n• Ruột bút chì làm từ than chì dẫn điện cực mạnh!\n• Đũa gỗ hoặc que nhựa có thể bị ẩm ướt hoặc dính mồ hôi tay, nguồn điện 220V vẫn có thể phóng tia lửa điện làm nổ tung và giật cháy bàn tay.\n👉 Ổ cắm điện là nơi cấm đùa của các bạn nhỏ thông minh nhé!"
  },

  // --- NHÓM 4: ĐỘNG VẬT & CÔN TRÙNG ---
  {
    "id": "family_dog_bite_rabies",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chó nhà cắn có sao không",
      "chó nuôi ở nhà cắn",
      "cho nha can co can tiem phong",
      "chó nhà ngoan cắn",
      "mèo nhà cào có cần tiêm không",
      "chó quen cắn"
    ],
    "response": "**Dù là chó mèo nhà mình nuôi rất ngoan thì bị cắn VẪN PHẢI tiêm phòng dại nhé! 🐶💉**\n\n• Mầm bệnh dại có thể ẩn sẵn trong nước bọt của thú cưng trước khi chúng phát bệnh mà mắt thường không thể thấy.\n• Bệnh dại khi đã phát cơn thì **không thể chữa khỏi**.\n👉 Nếu bị cắn hoặc cào chảy máu: Rửa ngay vết thương bằng xà phòng dưới vòi nước 15 phút, rồi nói ngay với bố mẹ để đi tiêm phòng vắc-xin kịp thời!"
  },
  {
    "id": "poke_beehive_for_honey",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chọc tổ ong lấy mật",
      "lấy que chọc tổ ong",
      "choc to ong",
      "ném đá vào tổ ong",
      "chọc tổ ong chơi",
      "phá tổ ong"
    ],
    "response": "**Đừng dại dột chọc phá tổ ong nha em ơi! 🐝😱🚫**\n\n• Một tổ ong có hàng trăm con ong thợ bảo vệ. Khi bị quấy rầy, cả đàn sẽ túa ra đốt kín mặt, mắt và đầu em.\n• Nọc ong vò vẽ, ong đất rất độc, đốt nhiều nốt có thể làm suy thở và đe dọa tính mạng!\n👉 Thấy tổ ong trên cây hoặc mái nhà: Tránh xa ra và báo người lớn xử lý an toàn!"
  },
  {
    "id": "suck_snake_venom_myth",
    "category": "injury",
    "badge": "",
    "keywords": [
      "hút nọc độc rắn bằng miệng",
      "bị rắn cắn lấy miệng hút",
      "hut noc doc ran",
      "rạch vết rắn cắn",
      "lấy miệng hút máu rắn cắn"
    ],
    "response": "**Hút nọc độc rắn bằng miệng chỉ có trên phim thôi, ngoài đời cấm làm theo nhé! 🐍❌**\n\n• Trong khoang miệng có rất nhiều vết xước nhỏ xíu. Khi hút, chất độc sẽ ngấm thẳng qua niêm mạc miệng vào tim của người hút còn nhanh hơn!\n👉 **Cách xử lý đúng:** Rửa sạch vết thương, giữ yên chân/tay bị cắn thấp hơn tim, không cử động mạnh và gọi ngay người lớn đưa đi bệnh viện cấp cứu!"
  },

  // --- NHÓM 5: GIAO THÔNG & ĐI LẠI ---
  {
    "id": "empty_street_red_light",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đèn đỏ vắng xe có được đi không",
      "đường vắng vượt đèn đỏ",
      "khong co ai co duoc vuot den do",
      "đèn đỏ không có công an",
      "đèn đỏ vắng tanh"
    ],
    "response": "**Đường có vắng tanh không một bóng người thì đèn đỏ VẪN PHẢI DỪNG LẠI! 🔴🚦**\n\n• Vì đường vắng nên các xe ở hướng cắt ngang thường chạy rất nhanh. Nếu em vượt qua, xe khác lao tới bất ngờ sẽ không phanh kịp và tông trúng em.\n• Dừng đúng đèn tín hiệu chứng minh em là một bạn nhỏ có ý thức tự giác bảo vệ chính mình đấy! 😊"
  },
  {
    "id": "head_out_car_window",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "thò đầu ra cửa sổ ô tô",
      "tho dau ra cua xe",
      "thò tay ra ngoài xe bus",
      "thò người ra cửa sổ xe",
      "ngó đầu ra ngoài ô tô"
    ],
    "response": "**Cực kỳ nguy hiểm! Tuyệt đối không được thò đầu hay tay ra ngoài cửa kính xe! 🚗💨❌**\n\n• Xe máy hoặc ô tô khác chạy vụt qua sát bên có thể va quẹt làm gãy tay hoặc chấn thương đầu trong tích tắc.\n• Cành cây ven đường hoặc đá dăm do bánh xe khác bắn lên cũng có thể bay thẳng vào mắt.\n• Em hãy ngồi ngay ngắn, thắt dây an toàn và ngắm cảnh qua cửa kính nhé!"
  },
  {
    "id": "headphones_while_biking",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "vừa đạp xe vừa đeo tai nghe",
      "deo tai nghe dap xe",
      "đeo tai nghe nghe nhạc khi đi xe",
      "vừa đi xe vừa nghe nhạc"
    ],
    "response": "**Đừng vừa đi xe đạp vừa đeo tai nghe nhé! 🚲🎧❌**\n\n• Tiếng nhạc sẽ bịt kín tai em, làm em **không nghe thấy tiếng còi xe ô tô bóp còi xin đường** hoặc tiếng phanh gấp phía sau.\n• Em cũng dễ bị phân tâm mải nghe nhạc mà không kịp nhận ra chướng ngại vật phía trước.\n👉 Muốn nghe nhạc, hãy về đến nhà rồi ngồi thưởng thức thật thư thả nhé!"
  },

  // --- NHÓM 6: TRÒ CHƠI NGUY HIỂM Ở NHÀ & TRƯỜNG ---
  {
    "id": "umbrella_parachute_myth",
    "category": "injury",
    "badge": "",
    "keywords": [
      "cầm ô nhảy từ trên cao",
      "nhảy dù bằng ô che mưa",
      "lấy dù nhảy từ trên cây",
      "nhay du bang cay du",
      "cầm ô nhảy cầu thang"
    ],
    "response": "**Cầm ô che mưa không thể biến thành chiếc dù bay được đâu em ơi! ☂️🪂❌**\n\n• Chiếc ô che mưa chỉ làm bằng vải mỏng và nan sắt yếu ớt. Khi nhảy từ trên cao xuống, sức cản của gió sẽ làm **chiếc ô bị lật ngược hoặc gãy vụn ngay lập tức**!\n• Em sẽ rơi thẳng xuống đất và bị gãy chân, gãy tay hoặc chấn thương cột sống.\n• Đừng bao giờ bắt chước phim hoạt hình nhảy từ bàn, cầu thang hay trên cây xuống nhé!"
  },
  {
    "id": "hide_in_fridge_washing_machine",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chui vào máy giặt trốn",
      "trốn vào tủ lạnh",
      "chui vào thùng máy giặt",
      "chơi trốn tìm trong máy giặt",
      "chui vào tủ đông"
    ],
    "response": "**Tuyệt đối KHÔNG chui vào máy giặt hoặc tủ lạnh để chơi trốn tìm! 🧺❄️🚫**\n\n• Cửa máy giặt và tủ lạnh một khi đã đóng sập vào thì **từ bên trong không thể tự mở ra được**.\n• Bên trong hoàn toàn kín khí, em sẽ bị ngạt thở chỉ sau ít phút mà không ai nghe thấy tiếng kêu cứu.\n👉 Chơi trốn tìm hãy chọn nơi thoáng mát, sáng sủa và dễ quan sát em nhé!"
  },
{
    "id": "fake_drowning_prank",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "giả vờ chết đuối trêu bạn",
      "gia vo chet duoi",
      "giả vờ chìm dọa bạn",
      "troll chìm dưới nước",
      "giả vờ đuối nước cho vui",
      "đùa giả vờ ngạt nước"
    ],
    "response": "**Tuyệt đối KHÔNG ĐƯỢC giả vờ đuối nước để trêu đùa nhé! 🛑🏊‍♂️**\n\n• Đây là trò đùa 'cậu bé chăn cừu' cực kỳ tai hại! Khi em đùa nhiều lần, mọi người sẽ tưởng em giỡn chơi nên không ai đến giúp.\n• Đến khi em **bị chuột rút hoặc sặc nước thật**, dù em có vẫy tay kêu cứu thì người trên bờ vẫn tưởng em đang đóng kịch!\n👉 Bể bơi và sông nước là nơi rèn luyện, không phải sân khấu diễn kịch nguy hiểm đâu nha!"
  },
  {
    "id": "swim_with_heavy_clothes",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "mặc quần bò đi bơi",
      "mặc nguyên quần áo nhảy xuống nước",
      "mac quan ao boi",
      "mặc áo khoác xuống hồ bơi",
      "mặc đồ đi học nhảy xuống tắm",
      "quần áo ướt có nặng không"
    ],
    "response": "**Đừng bao giờ mặc nguyên quần áo thường (nhất là quần bò, áo khoác) xuống bơi nhé! 👖💦❌**\n\n• Vải quần áo thường khi ngậm no nước sẽ **nặng như những bao cát** quấn chặt lấy chân tay em.\n• Nó làm em mất sức cực nhanh, chân không đạp nước được và cơ thể bị kéo chìm nghỉm xuống đáy.\n👉 Đi bơi bắt buộc phải mặc đồ bơi chuyên dụng gọn nhẹ, ôm sát để cơ thể dễ dàng nổi nhé!"
  },
  {
    "id": "swim_under_diving_board",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "bơi dưới cầu nhảy",
      "lặn dưới bục nhảy bể bơi",
      "boi duoi cau nhay",
      "bơi ngang qua chỗ người ta đang nhảy",
      "đứng dưới chỗ nhảy cầu"
    ],
    "response": "**Tránh xa khu vực chân cầu nhảy ra ngay lập tức em ơi! ⚠️🏊‍♂️**\n\n• Một người từ trên cao lao xuống nước có sức nặng và tốc độ như một quả đạn đại bác rơi trúng người em!\n• Cú va chạm có thể làm em gãy xương cổ, vỡ đầu hoặc ngất xỉu chìm ngay dưới đáy hồ.\n👉 Luôn quan sát trên đầu và chỉ bơi ở các làn bơi trống an toàn nhé!"
  },
  {
    "id": "drink_stream_river_water_raw",
    "category": "health",
    "badge": "",
    "keywords": [
      "uống nước suối trong rừng",
      "khat nuoc uong nuoc song",
      "nước suối trong veo uống được không",
      "uống nước ao khi khát",
      "uống nước suối mát lạnh"
    ],
    "response": "**Nước suối nhìn trong veo mát lạnh chưa chắc đã sạch đâu nha! 🏞️🦠❌**\n\n• Dù nước trong vắt nhưng bên trong có thể chứa hàng triệu con vi khuẩn, amip ăn não, trứng giun sán hoặc phân động vật từ đầu nguồn trôi xuống.\n• Uống vào em sẽ bị đau bụng dữ dội, tiêu chảy cấp hoặc ngộ độc nguy hiểm.\n👉 Đi chơi rừng, đi bơi luôn nhớ mang theo chai nước đun sôi để nguội của nhà mình nhé!"
  },

  // --- NHÓM 2: ĐIỆN & CÔNG NGHỆ ---
  {
    "id": "phone_charging_in_bathroom",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "vừa tắm vừa sạc điện thoại",
      "cam dien thoai trong nha tam",
      "sạc pin trong bồn tắm",
      "vừa ngâm bồn vừa bấm điện thoại cắm sạc",
      "mang cục sạc vào phòng tắm"
    ],
    "response": "**CỰC KỲ NGUY HIỂM TÍNH MẠNG! Tuyệt đối không mang sạc điện thoại vào nhà tắm! 🛁📱⚡**\n\n• Phòng tắm ngập đầy hơi nước và sàn nhà luôn ướt sũng. Hơi nước làm ẩm củ sạc, khiến điện 220V dễ dàng rò rỉ phóng ra ngoài.\n• Chỉ cần chiếc điện thoại đang cắm sạc tuột tay rơi vào bồn nước, em sẽ bị điện giật tử vong trong tích tắc!\n👉 Hãy sạc điện thoại ở bàn học khô ráo và chỉ dùng khi tay khô ráo thôi nhé!"
  },
  {
    "id": "pull_cord_unplug_appliance",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "cầm dây giật phích cắm",
      "giật dây điện cho tuột phích",
      "cam day rut dien",
      "kéo dây điện để rút phích",
      "rút điện bằng cách giật dây"
    ],
    "response": "**Đừng cầm sợi dây mà giật mạnh phích cắm ra khỏi ổ nhé! 🔌⚡❌**\n\n• Giật mạnh sợi dây sẽ làm đứt ngầm các sợi đồng bên trong hoặc làm toác vỏ cao su bảo vệ, khiến tia lửa điện tóe ra gây cháy nổ và giật vào tay em.\n👉 **Cách rút đúng:** Dùng các ngón tay cầm chắc vào **phần đầu cắm bằng nhựa cứng**, giữ chặt mặt ổ điện rồi nhẹ nhàng rút thẳng ra!"
  },
  {
    "id": "touch_hot_iron_test_heat",
    "category": "injury",
    "badge": "",
    "keywords": [
      "lấy tay sờ bàn là xem nóng chưa",
      "so vao ban ui",
      "chạm tay vào mặt bàn là",
      "sờ bếp từ xem có nóng không",
      "chạm ngón tay vào đĩa thức ăn nóng"
    ],
    "response": "**Ôi đừng lấy ngón tay chạm vào mặt bàn là để 'thử độ nóng' nha! 👕🔥🚫**\n\n• Mặt bàn là có thể nóng tới hơn 200 độ C! Chỉ cần chạm nhẹ 1 giây là da tay em dính chặt vào mặt sắt, phồng rộp và cháy xém thịt ngay lập tức.\n👉 Muốn biết bàn là nóng hay chưa, hãy nhìn đèn báo hiệu hoặc nhờ người lớn kiểm tra, trẻ con không tự ý thử bằng tay nhé!"
  },

  // --- NHÓM 3: TAI NẠN SINH HOẠT & HIỂU LẦM HOẠT HÌNH ---
  {
    "id": "elevator_jump_when_falling",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nhảy lên khi thang máy rơi",
      "thang máy rơi nhảy lên có thoát chết",
      "nhay len luc thang may roi",
      "thang máy đứt cáp nhảy lên",
      "mẹo nhảy khi thang máy rơi"
    ],
    "response": "**Mẹo 'nhảy lên khi thang máy rơi' chỉ có trong phim hoạt hình thôi, ngoài đời không có tác dụng đâu! 🏢❌**\n\n• Thang máy rơi với tốc độ cực nhanh, em không thể nào căn đúng tích tắc chạm sàn để nhảy lên được. Khi nhảy, đầu em còn bị va đập vỡ trần thang máy!\n👉 **Tư thế sống còn khi thang máy gặp sự cố:** Lập tức nằm ngửa áp sát lưng xuống giữa sàn thang máy, gập một cánh tay gối dưới đầu, tay kia che mặt để phân tán lực va đập!"
  },
  {
    "id": "stuck_head_in_railings",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chui đầu qua lan can cầu thang",
      "kẹt đầu ở song sắt",
      "chui dau qua hang rao",
      "thò đầu qua khe lan can",
      "nghịch chui đầu vào cửa sổ"
    ],
    "response": "**Đừng bao giờ nghịch dại chui đầu qua các khe song sắt lan can nhé! 🚪🤕🚫**\n\n• Đầu của em khi chui qua thì dễ, nhưng hai vành tai và xương quai hàm sẽ mở rộng ra khiến em **bị mắc kẹt cứng ngắc không rút ra được**.\n• Ở trên cao, nếu bị kẹt đầu mà trượt chân, thân người rơi xuống sẽ làm gãy cổ cực kỳ nguy hiểm!\n👉 Lan can là để bảo vệ em không ngã, không phải nơi để chui đầu chơi đùa đâu nè!"
  },
  {
    "id": "trapped_in_hot_car",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ở trong xe ô tô đóng kín",
      "chơi trốn tìm trong xe hơi",
      "ngủ quên trên xe ô tô",
      "kẹt trong xe ô tô làm gì",
      "bấm còi khi bị kẹt trong xe"
    ],
    "response": "**Nếu lỡ bị kẹt một mình trong xe ô tô đóng kín cửa, em hãy làm ngay các bước sau:** 🚗🚨\n\n1. **Trèo lên ghế lái:** Bấm liên tục vào **chính giữa vô-lăng** để còi xe kêu inh ỏi báo động cho người xung quanh.\n2. **Bật nút đèn khẩn cấp:** Nút có hình **tam giác màu đỏ** trên bảng điều khiển để đèn xe nhấp nháy liên tục.\n3. **Mở chốt cửa:** Tìm nút gạt khóa cửa hình ổ khóa bên cạnh tay nắm để tự mở cửa từ bên trong.\n4. Đập mạnh vào cửa kính vẫy tay kêu cứu, không trùm chăn ngủ vì trong xe sẽ rất nóng và thiếu khí!"
  },
  {
    "id": "run_with_lollipop_chopsticks",
    "category": "injury",
    "badge": "",
    "keywords": [
      "vừa ngậm kẹo mút vừa chạy",
      "ngậm đũa chạy nhảy",
      "ngam keo mut chay",
      "ngậm thìa chạy chơi",
      "vừa ngậm bút vừa đùa"
    ],
    "response": "**Đây là thói quen vô cùng nguy hiểm mà rất nhiều bạn nhỏ mắc phải! 🍭🥢⚠️**\n\n• Khi em đang ngậm que kẹo, đũa hoặc bút mà bị vấp ngã đập mặt xuống đất, que nhọn sẽ **chọc thẳng thủng vòm họng hoặc khí quản**, gây rách họng và chảy máu ồ ạt nguy kịch tính mạng!\n👉 Muốn ăn kẹo mút hay ăn cơm: Ngồi yên một chỗ ăn xong rồi mới đứng dậy đi chơi em nhé!"
  },
  {
    "id": "climb_balcony_fetch_toy",
    "category": "injury",
    "badge": "",
    "keywords": [
      "trèo lan can nhặt bóng",
      "trèo ban công lấy đồ chơi",
      "treo cua so nhat do",
      "với tay ra ngoài ban công lấy dép",
      "trèo qua rào chắn nhặt đồ"
    ],
    "response": "**Món đồ chơi có thể mua lại được, nhưng mạng sống thì KHÔNG! Tuyệt đối không trèo ra ngoài! 🏢🚫**\n\n• Chỉ cần nghiêng người quá mép lan can một chút, sức nặng của đầu sẽ kéo em mất thăng bằng lộn nhào từ trên cao xuống đất.\n👉 Nếu bóng, dép hay đồ chơi bị rơi ra gờ cửa sổ hay ban công: Hãy đứng yên bên trong và **nhờ người lớn dùng gậy dài khều vào** giúp em nhé!"
  },
  {
    "id": "swallow_watermelon_seed_harness",
    "category": "health",
    "badge": "",
    "keywords": [
      "nuốt hạt dưa hấu có mọc cây không",
      "nuot hat dua hau",
      "lỡ nuốt hạt cam có mọc cây trong bụng",
      "nuốt hạt táo có sao không",
      "hạt trái cây mọc trong bụng"
    ],
    "response": "**Hì hì, hạt dưa hấu không thể mọc mầm trong bụng em được đâu! 🍉🌱😄**\n\n• Trong dạ dày của em có dịch vị tiêu hóa và không có ánh sáng mặt trời, nên hạt cây không sống được và sẽ tự đào thải ra ngoài khi em đi vệ sinh.\n• Nhưng em **cần cẩn thận khi nhai hạt to (như hạt nhãn, hạt mận, hạt vải)** vì rất dễ trôi tuột vào cổ họng gây hóc nghẹn tắc thở nhé!"
  },
  {
    "id": "swallow_chewing_gum_belly",
    "category": "health",
    "badge": "",
    "keywords": [
      "lỡ nuốt kẹo cao su có dính ruột không",
      "nuot keo cao su",
      "nuốt kẹo gum có chết không",
      "kẹo cao su dính dạ dày",
      "nuốt kẹo cao su làm sao"
    ],
    "response": "**Yên tâm nhé, lỡ nuốt kẹo cao su không làm ruột em bị dính chặt lại đâu! 🍬😊**\n\n• Dù dạ dày không tiêu hóa được lớp kẹo cao su dẻo, nhưng đường ruột vẫn co bóp và đẩy bã kẹo ra ngoài theo đường tiêu hóa sau vài ngày.\n• Tuy nhiên, **tuyệt đối không được cố tình nuốt nhiều bã kẹo cao su**, vì nhiều bã kẹo vón lại sẽ tạo thành một cục to gây tắc nghẽn ruột phải đi mổ đấy!"
  },

  // --- NHÓM 4: ĐỘNG VẬT & MẮT/MŨI/MIỆNG ---
  {
    "id": "disturb_eating_sleeping_dog",
    "category": "injury",
    "badge": "",
    "keywords": [
      "trêu chó đang ăn",
      "ôm chó đang ngủ",
      "treu cho dang an",
      "giật xương của chó",
      "vuốt ve chó đang ngủ say",
      "đụng vào chó đang gặm xương"
    ],
    "response": "**Đừng bao giờ trêu chọc hay đụng vào khi chú chó đang ăn hoặc đang ngủ nhé! 🐶🍖🛑**\n\n• Khi đang ăn, chó có bản năng bảo vệ miếng mồi rất hung dữ. Nếu em thò tay vào, nó sẽ tưởng em cướp thức ăn và cắn nát bàn tay em!\n• Khi đang ngủ say mà bị giật mình ôm bất ngờ, chú chó sẽ giật thót và ngoạm cắn theo phản xạ tự vệ.\n👉 Hãy để các bạn cún ăn no, ngủ dậy tỉnh táo rồi mới chơi đùa cùng nhé!"
  },
  {
    "id": "laser_pointer_in_eyes",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chiếu đèn laser vào mắt",
      "bút laser có làm mù mắt không",
      "chieu laser vao mat ban",
      "đèn pin laser đồ chơi",
      "rọi đèn laser vào mắt"
    ],
    "response": "**Tuyệt đối KHÔNG ĐƯỢC chiếu tia laser vào mắt bạn hoặc mắt mình! 🔦👁️❌**\n\n• Tia laser là chùm ánh sáng mang năng lượng nhiệt cực mạnh. Chỉ cần chiếu vào mắt trong 1 giây là có thể **đốt cháy võng mạc, làm hỏng điểm vàng và gây mù lòa vĩnh viễn** không thể chữa được!\n👉 Đèn laser chỉ dùng để thuyết trình hoặc chỉ bảng, không phải đồ chơi chiếu vào mặt nhau đâu nhé!"
  },
  {
    "id": "stare_at_sun_with_sunglasses",
    "category": "injury",
    "badge": "",
    "keywords": [
      "đeo kính râm nhìn thẳng mặt trời",
      "nhìn thẳng vào mặt trời có mù không",
      "deo kinh den nhin mat troi",
      "nhìn nhật thực bằng kính râm",
      "nhìn mặt trời buổi trưa"
    ],
    "response": "**Dù có đeo kính râm đen kịt thì cũng KHÔNG ĐƯỢC nhìn thẳng vào mặt trời! 🕶️☀️🚫**\n\n• Kính râm thông thường chỉ làm giảm độ chói chứ không cản được các **tia tử ngoại (UV) vô hình cực độc**.\n• Nhìn thẳng vào mặt trời sẽ làm 'cháy xém' tế bào mắt của em giống như lấy kính lúp đốt cháy tờ giấy vậy!\n👉 Muốn ngắm nhật thực phải dùng kính quan sát chuyên dụng có màng lọc đạt chuẩn của nhà khoa học nhé!"
  },

  // --- NHÓM 5: CHẤT ĐỘC & LỬA NGHỊCH DẠI ---
  {
    "id": "drink_cleaning_chemical_syrup",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nước lau sàn có uống được không",
      "nước rửa bát nhìn giống nước ngọt",
      "uống nhầm nước rửa chén",
      "uong nuoc tay rua",
      "nước tẩy bồn cầu nhìn giống siro"
    ],
    "response": "**Cảnh báo cực nguy hiểm! Các chai lọ tẩy rửa KHÔNG PHẢI là nước ngọt hay siro! 🧴☠️🚫**\n\n• Nước lau sàn, nước xả vải hay nước tẩy bồn cầu thường có màu xanh, hồng rất thơm giống nước ngọt, nhưng chúng chứa toàn **hóa chất kiềm và axit cực độc**!\n• Uống vào sẽ làm cháy bỏng miệng, thủng thực quản và loét dạ dày.\n👉 **Quy tắc:** Thấy chai lọ lạ trong nhà tắm, gầm bếp tuyệt đối không được mở nắp ngửi hay nếm thử!"
  },
  {
    "id": "eat_wild_mushrooms_fruits",
    "category": "injury",
    "badge": "",
    "keywords": [
      "hái nấm dại ăn",
      "nấm sặc sỡ trong rừng ăn được không",
      "hai nam dai",
      "ăn quả dại bên đường",
      "hái nấm đẹp ăn thử",
      "nấm độc nhìn thế nào"
    ],
    "response": "**Nấm càng sặc sỡ, càng đẹp mắt thì lại CÀNG ĐỘC nhé em! 🍄☠️⚠️**\n\n• Rất nhiều cây nấm rừng chứa chất kịch độc giết người chỉ sau vài giờ ăn phải.\n• Cả những quả dại mọc bờ rào ven đường cũng có thể có độc tố hoặc bị phun thuốc sâu.\n👉 Chỉ ăn những loại nấm và hoa quả đã được bố mẹ rửa sạch, nấu chín trên mâm cơm thôi nhé!"
  },
  {
    "id": "play_with_matches_lighters",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "nghịch diêm trong phòng",
      "bật lửa chơi đốt giấy",
      "nghich bat lua",
      "chơi que diêm",
      "đốt giấy vụn chơi trong nhà",
      "thử quẹt diêm"
    ],
    "response": "**Que diêm hay bật lửa không phải là đồ chơi đâu em ơi! 🕯️🔥❌**\n\n• Một tàn lửa que diêm rơi vào rèm cửa, đệm giường hay đống quần áo có thể biến thành một **đám cháy khổng lồ thiêu rụi cả căn nhà chỉ sau 3 phút**!\n• Bật lửa ga nếu để gần nguồn nhiệt còn có thể phát nổ tung làm nát ngón tay em.\n👉 Thấy diêm hay bật lửa, hãy để yên ở chỗ cao cho người lớn sử dụng nhé!"
  },
{
    "id": "lick_phone_charging_cable",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "liếm đầu dây sạc điện thoại",
      "ngậm dây sạc đang cắm điện",
      "liem day sac",
      "ngậm đầu cắm sạc",
      "đầu dây sạc có giật không",
      "liếm chân sạc"
    ],
    "response": "**Tuyệt đối KHÔNG ĐƯỢC ngậm hay liếm đầu dây sạc đang cắm điện nhé! ⚡👅🚫**\n\n• Nước bọt trong miệng em dẫn điện cực kỳ tốt. Dù nguồn điện đầu ra chỉ 5V hay 9V, khi tiếp xúc trực tiếp với lưỡi ẩm ướt vẫn gây **cháy bỏng rát lưỡi, co giật cơ miệng và hoại tử niêm mạc**.\n• Nếu củ sạc bị lỗi rò điện 220V, nó sẽ phóng điện thẳng vào tim làm em ngất lịm ngay tức khắc!\n👉 Thấy dây sạc đang cắm vào ổ, hãy để yên trên bàn, tuyệt đối không cho vào miệng cắn hay liếm em nhé!"
  },
  {
    "id": "cut_live_electric_wire_scissors",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "lấy kéo cắt dây điện",
      "cắt dây quạt đang chạy",
      "lay keo cat day dien",
      "dùng dao chặt dây điện",
      "cắt dây điện xem có gì bên trong",
      "kéo bấm dây điện"
    ],
    "response": "**Trời ơi, chớ dại dột lấy dao kéo cắt dây điện đang cắm nhé! ✂️⚡😱**\n\n• Lưỡi dao, lưỡi kéo làm bằng kim loại dẫn điện tức thì. Khi em cắt qua vỏ nhựa chạm vào lõi đồng, một tiếng nổ lớn như quả pháo sẽ bùng lên, kèm tia lửa điện tóe ra thiêu cháy mắt và truyền thẳng luồng điện cực mạnh làm co giật bàn tay em.\n👉 Muốn cắt dây buộc đồ, hãy nhìn kỹ xem đó có phải dây điện không, và tuyệt đối không đụng vào dây nối với ổ điện nhé!"
  },
  {
    "id": "kite_stuck_power_lines",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "diều vướng vào dây điện",
      "dieu mac day dien",
      "trèo lên cột điện lấy diều",
      "lấy que chọc lấy diều vướng dây điện",
      "thả diều gần đường điện cao thế",
      "gỡ diều trên dây điện"
    ],
    "response": "**Diều bị vướng vào dây điện thì BỎ LUÔN, tuyệt đối không được trèo lên gỡ! 🪁⚡🛑**\n\n• Dây điện cao thế có thể **phóng tia lửa điện xuyên qua không khí** ngay cả khi em chưa kịp chạm tay vào!\n• Dùng que gỗ, sào trúc để chọc cũng nguy hiểm vì nếu cây ẩm ướt, điện sẽ truyền thẳng xuống đất giật cháy người em.\n👉 Mất một con diều có thể làm lại con khác, nhưng tính mạng thì chỉ có một. Hãy luôn thả diều ở bãi đất trống, xa đường dây điện nhé!"
  },
  {
    "id": "metal_spoon_in_microwave",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "để thìa kim loại vào lò vi sóng",
      "cho dĩa sắt vào lò vi sóng",
      "lo vi song no tung",
      "cho bát nhôm vào lò vi sóng",
      "kim loại trong lò vi sóng",
      "bọc giấy bạc quay lò vi sóng"
    ],
    "response": "**Tuyệt đối KHÔNG để thìa, dĩa, bát sắt, bát nhôm hay giấy bạc vào lò vi sóng! 🥣⚡💥**\n\n• Sóng vi ba trong lò gặp kim loại sẽ bị phản xạ dồn dập, tạo thành những **tia lửa điện nổ lách tách như sấm sét** bên trong khoang lò.\n• Lò vi sóng có thể bị chập mạch bốc cháy dữ dội và nổ tung cánh cửa kính bay vào người em!\n👉 Chỉ quay thức ăn bằng bát đĩa sứ, thủy tinh chịu nhiệt chuyên dụng thôi nhé!"
  },
  {
    "id": "touch_street_lamp_post_rain",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "ôm cột đèn đường trời mưa",
      "vịnh tay vào cột đèn đường",
      "cot dien bi ro dien",
      "sờ vào cột điện khi ngập nước",
      "dựa lưng vào cột đèn ngoài đường"
    ],
    "response": "**Khi trời mưa hoặc đường ngập, TUYỆT ĐỐI KHÔNG ôm hay chạm vào cột đèn đường! 🌧️💡⚠️**\n\n• Các hộp điện và mối nối dưới chân cột đèn lâu ngày ngoài trời có thể bị hở hoặc chuột cắn. Trời mưa làm nước dẫn luồng điện rò rỉ ra toàn bộ thân cột bằng kim loại!\n• Đã có nhiều bạn bị điện giật bất tỉnh chỉ vì vô tình vịn tay vào cột đèn khi chờ bố mẹ đón dưới mưa.\n👉 Trời mưa dông: Đi cách xa các cột điện, trạm biến áp và cột đèn chiếu sáng ít nhất 2 mét nhé!"
  },
  {
    "id": "overload_multi_plug_adapter",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "cắm kín các lỗ trên ổ điện",
      "cắm quá nhiều phích cắm một lúc",
      "o dien boc khoi",
      "ổ điện nóng ran",
      "cắm chồng ổ cắm lên nhau"
    ],
    "response": "**Cắm chồng chất quá nhiều thiết bị vào một ổ cắm sẽ làm bốc cháy đấy em! 🔌🔥⚠️**\n\n• Khi cắm nồi cơm, quạt, bếp từ, máy sấy tóc cùng một lúc vào một ổ chia nhỏ xíu, dòng điện quá tải sẽ làm dây dẫn **nóng rực lên như sợi dây may-so**.\n• Lớp vỏ nhựa xung quanh sẽ chảy mềm, bốc mùi khét lẹt và bùng lửa thành đám cháy lớn trong đêm.\n👉 Nếu thấy ổ cắm nóng ran hoặc có mùi khét, hãy nhờ người lớn rút bớt thiết bị ra ngay nhé!"
  },

  // ==========================================================================
  // CHỦ ĐỀ 2: AN TOÀN GIAO THÔNG (TRÒ NGHỊCH TRÊN ĐƯỜNG)
  // ==========================================================================
  {
    "id": "play_tag_football_on_street",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đá bóng dưới lòng đường",
      "chơi đuổi bắt ngoài ngõ",
      "chay choi duoi long duong",
      "đá cầu dưới đường phố",
      "đường trong xóm đá bóng được không"
    ],
    "response": "**Lòng đường là nơi dành riêng cho xe chạy, KHÔNG PHẢI sân chơi bóng! ⚽🚗🛑**\n\n• Khi mải tranh cướp bóng hoặc đuổi bắt bạn bè, em sẽ hoàn toàn mất tập trung và không nhìn thấy xe máy, ô tô đang lao tới.\n• Xe cộ qua khúc cua khuất tầm nhìn sẽ không kịp phanh gấp và đâm thẳng vào em.\n👉 Muốn đá bóng, đá cầu hay rượt đuổi: Hãy rủ các bạn vào công viên, sân trường hoặc sân thể thao có rào chắn an toàn nhé!"
  },
  {
    "id": "blind_spot_large_vehicles_hide",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đứng sát cạnh xe tải",
      "chơi trốn tìm cạnh xe buýt",
      "diem mu cua xe tai la gi",
      "đứng sau đuôi xe ô tô to",
      "chui gầm xe tải nhặt bóng"
    ],
    "response": "**Điểm mù của xe tải và xe buýt là 'chiếc bẫy tử thần' vô hình! 🚚🚌❌**\n\n• Xe tải rất to và cao, tài xế ngồi trên buồng lái **hoàn toàn KHÔNG NHÌN THẤY em** khi em đứng sát bên hông, ngay trước đầu xe hoặc sát đuôi xe!\n• Khi bác tài lùi xe hoặc đánh lái rẽ cua, bánh xe sau khổng lồ sẽ quét qua vùng điểm mù và chèn qua những ai đứng gần.\n👉 **Ghi nhớ:** Luôn đứng cách xa các xe ô tô to ít nhất 3-5 mét, và tuyệt đối không bao giờ chui gầm xe nhặt đồ!"
  },
  {
    "id": "no_hands_bike_stunt_trick",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "thả hai tay khi đi xe đạp",
      "đứng lên yên xe đạp",
      "bỏ tay lái xe đạp",
      "di xe dap buong tay",
      "bốc đầu xe đạp thể hiện",
      "lạng lách xe đạp"
    ],
    "response": "**Bỏ hai tay lái xe đạp không hề ngầu, mà là cực kỳ dại dột! 🚲🤕🚫**\n\n• Chỉ cần bánh trước vấp phải một viên sỏi nhỏ hoặc một gờ nắp cống, tay lái sẽ bị quặt ngoắt lại làm em **lộn nhào cắm đầu xuống đường**.\n• Răng cửa, cằm và trán em sẽ va thẳng vào mặt đường nhựa cứng gây gãy răng, chấn thương sọ não.\n👉 Người đi xe đạp thông minh luôn cầm chắc 2 tay lái và sẵn sàng ngón tay ở cần phanh nhé!"
  },
  {
    "id": "climb_over_median_barrier",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "trèo qua dải phân cách",
      "nhảy qua rào chắn giữa đường",
      "treo qua dai phan cach",
      "trèo hàng rào qua đường cho nhanh",
      "nhảy qua dải phân cách"
    ],
    "response": "**Tuyệt đối KHÔNG trèo qua dải phân cách hay rào chắn giữa đường! 🚧🏃‍♂️❌**\n\n• Làn đường sát dải phân cách là nơi ô tô chạy với tốc độ nhanh nhất (60-80 km/h). Khi em bất thình lình nhảy từ dải phân cách xuống, tài xế không tài nào phanh kịp!\n• Rào sắt nhọn cũng có thể móc rách quần áo, đâm thủng chân làm em mắc kẹt giữa làn xe lao vun vút.\n👉 Chịu khó đi thêm vài chục mét đến đúng **vạch kẻ đường cho người đi bộ hoặc cầu vượt** để qua đường an toàn nhé!"
  },
  {
    "id": "stand_on_motorbike_footrest",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đứng lên yên xe máy khi đang chạy",
      "đứng ở chỗ để chân xe tay ga",
      "dung tren xe may",
      "không ôm người lớn khi đi xe máy",
      "ngồi quay lưng lại trên xe máy"
    ],
    "response": "**Ngồi sau xe máy phải ngồi ngay ngắn và ôm chặt lấy người lớn! 🛵⚠️**\n\n• Đứng ở phần để chân phía trước của xe ga, nếu xe phanh gấp hoặc va quẹt, em sẽ bị **hất bay văng qua tay lái đập thẳng mặt xuống đất** hoặc bị tay lái dập vào ngực.\n• Đứng trên yên phía sau thì chỉ cần một cú xóc gà là em ngã ngửa ra sau đường.\n👉 Hãy đội mũ bảo hiểm vừa đầu, ngồi áp sát người lớn và hai tay ôm chắc eo bố mẹ suốt chuyến đi nhé!"
  },
  {
    "id": "cross_railway_when_barrier_down",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "chui qua rào chắn đường tàu",
      "vượt rào chắn tàu hỏa",
      "bang qua duong ray khi tau den",
      "chui qua thanh chắn đường ray",
      "tàu hỏa còn xa chạy qua kịp"
    ],
    "response": "**Thanh rào chắn đường tàu đã hạ xuống là TUYỆT ĐỐI CẤM BƯỚC QUA! 🚂🛑🚫**\n\n• Đoàn tàu hỏa nặng hàng ngàn tấn lao đi cực nhanh và **cần cả 1 cây số mới phanh dừng lại được**! Bác lái tàu dù nhìn thấy em cũng không thể dừng tàu gấp được đâu.\n• Bước chân em có thể bị vấp kẹt vào khe thanh ray kim loại không rút ra kịp.\n👉 Chuông reo, cần chắn hạ xuống: Hãy đứng kiên nhẫn sau vạch an toàn, ngắm đoàn tàu đi qua rồi mới đi tiếp nhé!"
  },
  {
    "id": "ride_wrong_way_short_distance",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đi ngược chiều một đoạn ngắn",
      "di nguoc chieu xe dap",
      "chạy ngược chiều có sao không",
      "đi ngược đường vì nhà gần",
      "xe đạp đi ngược chiều"
    ],
    "response": "**Dù chỉ đi 5 mét thì cũng KHÔNG ĐƯỢC đi ngược chiều nhé! 🚴‍♂️⚠️❌**\n\n• Các xe đi đúng chiều hoàn toàn không ngờ tới việc có một bạn nhỏ đang lao thẳng ngược lại phía mình, họ sẽ bị giật mình không kịp xử lý.\n• Rất nhiều vụ tai nạn xảy ra chỉ vì suy nghĩ chủ quan *'nhà cháu ngay đây nên cháu đi ngược chiều một tí cho tiện'*.\n👉 Luôn đi sát lề bên tay phải theo đúng chiều đường quy định để bảo vệ an toàn cho chính mình nhé!"
  },

  // ==========================================================================
  // CHỦ ĐỀ 3: TAI NẠN THƯƠNG TÍCH & TRÒ CHƠI HỌC ĐƯỜNG NGUY HIỂM
  // ==========================================================================
  {
    "id": "pull_chair_prank_friend",
    "category": "injury",
    "badge": "",
    "keywords": [
      "rút ghế trêu bạn ngã",
      "kéo ghế khi bạn ngồi",
      "rut ghe treu ban",
      "chơi khăm giật ghế",
      "bạn ngồi kéo ghế ra"
    ],
    "response": "**Trò rút ghế trêu bạn là trò đùa ÁC Ý và có thể làm bạn bị LIỆT đấy! 🪑💥❌**\n\n• Khi bị hụt ghế ngồi bất ngờ, toàn bộ sức nặng cơ thể bạn sẽ đập mạnh vùng xương cụt và cột sống xuống sàn nhà cứng ngắc.\n• Cú ngã này có thể làm **gãy đốt sống lưng, chấn thương tủy sống gây liệt hai chân vĩnh viễn** hoặc dập não nếu gáy đập vào cạnh bàn!\n👉 Đừng bao giờ chơi trò dại dột này và hãy nhắc nhở ngay nếu thấy bạn khác định làm nhé!"
  },
  {
    "id": "button_battery_swallowed_or_nose",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nuốt pin cúc áo tròn",
      "nhét pin đồng hồ vào lỗ mũi",
      "nuot pin cuc ao",
      "nhét viên pin tròn vào tai",
      "nuốt cục pin nhỏ xíu"
    ],
    "response": "**Viên pin cúc áo nhỏ xíu là 'sát thủ thầm lặng' cực kỳ nguy hiểm! ⚪⚠️☠️**\n\n• Khi bị nuốt hoặc kẹt trong mũi/tai, chất ẩm ướt trong cơ thể sẽ kích hoạt dòng điện của pin, tạo ra chất kiềm ăn mòn cực mạnh **làm thủng thực quản hoặc cháy thủng vách ngăn mũi chỉ sau 2 giờ đồng hồ**!\n👉 Tuyệt đối không ngậm pin hay nhét đồ chơi vào mũi, tai. Nếu lỡ nuốt phải, hãy báo ngay bố mẹ đưa đi bệnh viện cấp cứu mổ gắp ra khẩn cấp!"
  },
  {
    "id": "slide_down_stair_handrail",
    "category": "injury",
    "badge": "",
    "keywords": [
      "trượt tay vịn cầu thang",
      "truot lan can cau thang",
      "ngồi lên tay vịn trượt xuống",
      "trượt cầu thang xiếc",
      "trượt máng cầu thang trường"
    ],
    "response": "**Tay vịn cầu thang để vịn tay đi bộ, không phải cầu trượt công viên đâu nha! 🎢🤕🚫**\n\n• Khi trượt với tốc độ cao, chỉ cần mất thăng bằng nghiêng người một tí là em sẽ **rơi lộn nhào từ tầng trên xuống giếng trời cầu thang**.\n• Cú rơi tự do từ trên cao xuống nền gạch men sẽ gây vỡ sọ, gãy xương và đe dọa trực tiếp mạng sống!\n👉 Hãy đi bộ từng bậc thong thả, tay vịn chắc chắn để lên xuống lớp học an toàn nhé!"
  },
  {
    "id": "broken_mercury_thermometer_play",
    "category": "injury",
    "badge": "",
    "keywords": [
      "làm vỡ nhiệt kế thủy ngân",
      "nghịch viên bi thủy ngân",
      "can nhiet ke thuy ngan",
      "thủy ngân có độc không",
      "lỡ cắn vỡ nhiệt kế đo sốt"
    ],
    "response": "**Thủy ngân bên trong nhiệt kế là một chất kịch độc, tuyệt đối không được chạm vào! 🌡️☠️⚠️**\n\n• Những viên bi bạc lấp lánh lăn trên sàn trông rất vui mắt nhưng chúng bốc hơi độc vô hình. Hít phải hơi thủy ngân sẽ gây hỏng phổi, suy thận và ngộ độc não.\n👉 **Cách xử lý khi vỡ nhiệt kế:**\n1. Không chạy nhảy quanh đó, mở toang cửa sổ cho thoáng khí.\n2. Báo ngay người lớn vào quét dọn bằng bột lưu huỳnh hoặc giấy bìa hót cẩn thận, không dùng máy hút bụi hút nhé!"
  },
  {
    "id": "choking_game_fainting_prank",
    "category": "injury",
    "badge": "",
    "keywords": [
      "trò chơi bóp cổ cho ngất",
      "thử thách ngất xỉu 5 giây",
      "bop co nhau choi",
      "ép ngực cho ngất đi",
      "tro choi ngat tho tren mạng"
    ],
    "response": "**CẢNH BÁO TỬ VONG! Tuyệt đối không tham gia trò bóp cổ hay ép tim cho ngất xỉu! 🛑🫁💀**\n\n• Đây là thử thách mù quáng trên mạng đã cướp đi tính mạng của rất nhiều bạn học sinh trên thế giới!\n• Khi bóp cổ hoặc nén ngực, máu và ô-xy lên não bị cắt đứt đột ngột. Chỉ sau vài giây, các tế bào não bắt đầu chết hàng loạt, dẫn đến **đột quỵ não, co giật, sống thực vật hoặc ngừng tim tử vong ngay tại chỗ**!\n👉 Hãy kiên quyết từ chối và báo ngay thầy cô giáo nếu thấy nhóm bạn nào rủ rê trò chơi quỷ quái này nhé!"
  },
  {
    "id": "drink_gasoline_in_water_bottle",
    "category": "injury",
    "badge": "",
    "keywords": [
      "uống nhầm chai nước ngọt đựng xăng",
      "uống nhầm chai đựng cồn",
      "uong nham xang dau",
      "chai nước suối đựng dầu hỏa",
      "uống nhầm thuốc trừ sâu"
    ],
    "response": "**Thói quen ngửi và uống bừa bãi nước trong chai lạ rất nguy hiểm! 🥤⛽☠️**\n\n• Rất nhiều gia đình hay tận dụng chai trà xanh, chai nước khoáng cũ để đựng xăng, dầu hỏa hoặc cồn sát trùng.\n• Uống nhầm phải một ngụm xăng dầu sẽ làm bỏng loét thực quản, hít hơi xăng vào phổi gây **viêm phổi hoại tử cấp tính rất khó chữa**.\n👉 **Quy tắc vàng:** Luôn nhìn kỹ và hỏi người lớn trước khi uống bất kỳ chai nước nào để ở góc nhà, nhà kho hay bàn sửa xe nhé!"
  },
  {
    "id": "cotton_swab_deep_ear_cleaning",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chọc tăm bông thật sâu vào tai",
      "choc ngoay tai qua sau",
      "dùng que sắt ngoáy tai",
      "chọc tăm xỉa răng vào tai",
      "ngoáy tai bị chảy máu"
    ],
    "response": "**Đừng lấy tăm bông hay que cứng chọc thật sâu vào lỗ tai nhé! 👂🛑❌**\n\n• Màng nhĩ trong tai em mỏng manh như một tờ giấy lụa vậy. Chọc que sâu vào có thể **đâm rách thủng màng nhĩ, gây đau nhói chảy máu và điếc tai**!\n• Ngoài ra, tăm bông còn vô tình dồn cục ráy tai bết chặt lại sâu hơn gây viêm tai mưng mủ.\n👉 Chỉ dùng khăn bông mềm lau nhẹ xung quanh vành tai ngoài thôi, còn việc làm sạch tai hãy để bố mẹ hoặc bác sĩ giúp nhé!"
  },
{
    "id": "play_game_while_phone_charging",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "vừa sạc pin vừa chơi game có nổ không",
      "vua sac vua choi dien thoai",
      "sạc điện thoại chơi game có sao không",
      "vừa cắm sạc vừa xem youtube",
      "sao điện thoại vừa sạc vừa dùng lại nóng"
    ],
    "response": "**Vừa sạc vừa chơi game là 'kích hoạt quả bom mini' trên tay đấy em! 📱💥⚠️**\n\n• **Nguyên nhân:** Khi vừa nạp điện vừa bắt máy hoạt động hết công suất, pin sẽ bị 'tra tấn' 2 đầu làm nhiệt độ tăng vọt dữ dội.\n• **Tác hại:** Pin phồng rộp, chập mạch phát nổ tung làm toác nát bàn tay, mảnh kính vỡ găm thẳng vào mắt và mặt!\n👉 **Quy tắc vàng:** Đã sạc pin thì để máy yên trên bàn nghỉ ngơi. Muốn chơi thì rút sạc ra rồi mới chơi nhé!"
  },
  {
    "id": "paper_tape_wrap_frayed_wire",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "dùng băng dính giấy quấn dây điện",
      "lấy băng keo dán vở quấn dây điện rách",
      "quấn băng dính thường vào chỗ hở điện",
      "lay bang dinh dan day dien",
      "băng keo trong quấn điện được không"
    ],
    "response": "**Băng dính dán vở hay băng keo giấy KHÔNG THỂ cách điện được đâu nhé! 🩹⚡❌**\n\n• **Nguyên nhân:** Băng keo dán vở rất mỏng và dễ bắt lửa, không có khả năng chặn dòng điện 220V như băng dính cao su cách điện chuyên dụng.\n• **Tác hại:** Điện vẫn phóng xuyên qua lớp keo giật thẳng vào tay em, hoặc tia lửa làm cháy lớp giấy bùng lên ngọn lửa thiêu rụi đồ đạc xung quanh.\n👉 Thấy dây điện rách vỏ: Tránh xa và bảo bố mẹ dùng băng dính điện màu đen chuyên dụng quấn lại nhé!"
  },
  {
    "id": "water_on_lithium_battery_fire",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "dội nước vào cục pin đang bốc cháy",
      "pin xe điện cháy lấy nước dập",
      "cháy sạc dự phòng dội nước",
      "chay pin dien thoai do nuoc",
      "pin cháy có dập bằng nước được không"
    ],
    "response": "**Dội nước vào cục pin Lithium đang cháy sẽ làm nó nổ to hơn đấy! 🔋💥🌊**\n\n• **Nguyên nhân:** Kim loại Lithium trong pin điện thoại, xe đạp điện khi gặp nước sẽ phản ứng hóa học cực mạnh, giải phóng khí Hydro dễ cháy làm lửa bùng lên dữ dội hơn.\n• **Tác hại:** Cục pin sẽ nổ tung bắn các tia kim loại nóng hàng nghìn độ và xả ra khói độc làm bỏng phổi người đứng gần.\n👉 Gặp cháy pin/sạc dự phòng: Hô hoán mọi người chạy ra xa, lấy cát khô hoặc chăn chống cháy trùm lên và gọi ngay **114**!"
  },
  {
    "id": "mini_gas_canister_near_stove",
    "category": "fire",
    "badge": "",
    "keywords": [
      "để bình ga mini cạnh bếp lửa",
      "bình ga mini phát nổ vì sao",
      "choi binh xit son canh lua",
      "bình xịt muỗi ném vào đống lửa",
      "sao bình xịt lại nổ"
    ],
    "response": "**Bình ga mini hay bình xịt muỗi gặp lửa sẽ biến thành một 'quả lựu đạn'! 💣🔥🛑**\n\n• **Nguyên nhân:** Vỏ bình xịt bằng nhôm rất mỏng. Gặp hơi nóng, khí nén bên trong giãn nở cực nhanh tạo áp suất khủng khiếp xé toạc vỏ bình.\n• **Tác hại:** Bình phát nổ xé toạc ra hàng trăm mảnh kim loại sắc bén văng với tốc độ đạn bắn, gây rách da, mù mắt và chấn thương nặng nề.\n👉 Không bao giờ để bình ga mini hay bình xịt cạnh bếp nấu, và tuyệt đối cấm ném vỏ lon xịt vào đống lửa!"
  },

  // ==========================================================================
  // NHÓM 2: GIAO THÔNG (ẢO TƯỞNG & TÁC HẠI KHÔN LƯỜNG)
  // ==========================================================================
  {
    "id": "dark_clothes_night_walking",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "sao đi bộ trời tối phải mặc áo sáng",
      "mặc áo đen đi đêm có sao không",
      "sao tài xế không nhìn thấy em",
      "đi bộ ban đêm mặc đồ tối",
      "tại sao cấm mặc áo đen đi đường tối"
    ],
    "response": "**Vì mặc áo đen ban đêm biến em thành 'người vô hình' trước mũi xe ô tô! 🌑🚗⚠️**\n\n• **Nguyên nhân:** Đèn pha xe ô tô ban đêm chỉ soi rõ vật phản quang. Quần áo màu đen hoặc sẫm sẽ nuốt trọn ánh sáng, hòa lẫn hoàn toàn vào bóng tối.\n• **Tác hại:** Tài xế chỉ phát hiện ra em khi xe đã tiến sát cách 2-3 mét, khoảng cách quá ngắn không thể nào phanh kịp và sẽ đâm trực diện!\n👉 Đi bộ buổi tối: Hãy mặc áo trắng, áo vàng sáng màu hoặc đeo balo có dải phản quang phát sáng nhé!"
  },
  {
    "id": "legs_on_car_dashboard_airbag",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "gác chân lên táp lô ô tô",
      "ngồi xe ô tô gác chân lên kính",
      "gac chan tren o to",
      "sao không được gác chân ghế phụ",
      "túi khí ô tô nổ có gãy chân không"
    ],
    "response": "**Gác chân lên táp-lô ô tô là hành động nguy hiểm hàng đầu khi đi xe! 🚘🦵💥**\n\n• **Nguyên nhân:** Ngay dưới tấm bảng táp-lô trước mặt em là **túi khí cứu sinh**. Khi có va chạm nhẹ, túi khí sẽ phát nổ bung ra với tốc độ kinh hoàng lên tới 300 km/h!\n• **Tác hại:** Lực nổ như búa tạ sẽ đẩy gập đầu gối đập ngược vào mặt em, làm **bẻ gãy xương đùi, vỡ xương mặt và gãy vụn khung chậu vĩnh viễn**!\n👉 Ngồi xe ô tô: Hai chân luôn đặt bằng phẳng xuống sàn xe và thắt dây an toàn ngay ngắn nhé!"
  },
  {
    "id": "long_scarf_tangled_in_wheel",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "quàng khăn dài đi xe máy",
      "khăn quàng quấn vào bánh xe",
      "ao khoac bay vao nan hoa",
      "mặc áo mưa cánh dơi bị quấn bánh xe",
      "quần áo lòa xòa đi xe đạp"
    ],
    "response": "**Khăn quàng dài hay áo mưa bay lòa xòa có thể siết nghẹt cổ em trong tích tắc! 🧣🚲😱**\n\n• **Nguyên nhân:** Bánh xe đang quay tròn với lực kéo cực khỏe. Hai đầu khăn hoặc vạt áo bay phấp phới sẽ bị nan hoa bánh xe cuốn chặt vào trục quay.\n• **Tác hại:** Khăn bị giật ngược lại như một sợi thòng lọng **siết nghẹt khí quản làm gãy cổ hoặc kéo ngã lộn nhào cả người xuống đường nhựa**.\n👉 Đi xe máy/xe đạp: Cuộn gọn khăn quàng vào trong cổ áo, túm gọn vạt áo mưa ngồi đè lên, không để bay lòng thòng!"
  },
  {
    "id": "loose_strap_fake_helmet",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đội mũ bảo hiểm không cài quai",
      "cài quai mũ bảo hiểm lỏng lẻo",
      "sao phai cai chat quai mu",
      "đội mũ bảo hiểm thời trang",
      "mũ bảo hiểm rởm có sao không"
    ],
    "response": "**Đội mũ bảo hiểm mà không cài quai thì coi như KHÔNG ĐỘI! 🪖🛵❌**\n\n• **Nguyên nhân:** Khi xe gặp sự cố ngã, gió và lực quán tính sẽ hất chiếc mũ bảo hiểm bay mất trước khi người em chạm đất một phần trăm giây.\n• **Tác hại:** Đầu em sẽ đập thẳng trực tiếp vào lòng đường hoặc dải phân cách mà không có gì che chắn, gây chấn thương sọ não nguy kịch.\n👉 Luôn cài khóa quai chắc chắn, chỉnh quai vừa khít đút lọt 2 ngón tay dưới cằm để chiếc mũ ôm bảo vệ đầu em nhé!"
  },

  // ==========================================================================
  // NHÓM 3: SƠ CỨU SAI CÁCH & TRÒ NGHỊCH TẠI NHÀ
  // ==========================================================================
  {
    "id": "tilt_head_back_nosebleed_myth",
    "category": "injury",
    "badge": "",
    "keywords": [
      "chảy máu cam ngửa cổ ra sau",
      "ngửa mặt lên khi chảy máu mũi",
      "chay mau cam ngua co",
      "sao chảy máu cam lại cúi đầu",
      "ngửa cổ cho máu cam không chảy"
    ],
    "response": "**Chảy máu cam mà ngửa cổ ra sau là sai bét và rất nguy hiểm nha! 👃🩸❌**\n\n• **Nguyên nhân:** Ngửa cổ không làm máu ngừng chảy, mà chỉ làm dòng máu chảy ngược vào trong họng.\n• **Tác hại:** Máu trôi vào thực quản làm đau bụng nôn mửa, hoặc nghiêm trọng hơn là **chảy tràn vào khí quản gây nghẹt thở sặc máu**!\n👉 **Cách làm đúng:** Hơi cúi đầu nhẹ về phía trước, dùng ngón tay bóp chặt hai cánh mũi lại và thở bằng miệng trong 10 phút là máu sẽ tự cầm!"
  },
  {
    "id": "swallow_rice_for_fish_bone",
    "category": "injury",
    "badge": "",
    "keywords": [
      "hóc xương cá nuốt cơm to",
      "nuốt miếng cơm to chữa hóc xương",
      "uống nước chanh cho tan xương cá",
      "hoc xuong ca lam sao",
      "nuốt cơm cho trôi xương"
    ],
    "response": "**Nuốt cục cơm to khi hóc xương cá là 'tự hại mình' đấy em! 🐟🍚🚫**\n\n• **Nguyên nhân:** Cục cơm thô đặc khi trôi qua họng sẽ đè lên chiếc xương, bẻ cong và đẩy chiếc xương **cắm sâu ngập vào thành thực quản**.\n• **Tác hại:** Xương nhọn đâm thủng thực quản, rách mạch máu lớn gây chảy máu trong và nhiễm trùng mưng mủ cổ họng rất nguy hiểm.\n👉 Bị hóc xương: Dừng nhai nuốt ngay, ngậm miệng lại và báo bố mẹ đưa đến gặp bác sĩ gắp ra bằng nhíp y tế chỉ trong 1 phút!"
  },
  {
    "id": "rub_hot_balm_on_head_bump",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bị bươu đầu xoa dầu nóng",
      "đập đầu nổi cục u bôi cao sao vàng",
      "xoa dầu gió lên vết sưng đầu",
      "bươu đầu bôi gì",
      "té sưng u đầu xoa dầu"
    ],
    "response": "**Bị sưng u đầu mà xoa dầu nóng thì cục u càng to đùng hơn! 🤕🔥❌**\n\n• **Nguyên nhân:** Dầu nóng có tính nhiệt làm các mạch máu nhỏ dưới da giãn nở to ra, máu tụ ồ ạt chảy dồn về vết thương.\n• **Tác hại:** Cục bươu sẽ sưng vù to hơn, tím tái và đau nhức nhối gấp đôi!\n👉 **Cách xử lý đúng:** Lấy một chiếc khăn sạch bọc vài viên đá lạnh hoặc khăn mát chườm nhẹ nhàng lên cục u trong 15 phút để mạch máu co lại, vết sưng sẽ xẹp ngay!"
  },
  {
    "id": "do_not_pull_out_impaled_object",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bị dao cắm vào bụng rút ra ngay",
      "bị đinh găm rút ra",
      "thanh sắt đâm vào người có rút ra không",
      "rút mảnh kính cắm sâu vào tay",
      "vật nhọn cắm vào người làm gì"
    ],
    "response": "**Vật nhọn cắm sâu vào người: TUYỆT ĐỐI KHÔNG TỰ Ý RÚT RA! 🔪🪵🛑**\n\n• **Nguyên nhân:** Thanh sắt, mảnh kính hay dao nhọn đang đóng vai trò như một chiếc 'nút chai' bịt kín miệng vết thương và mạch máu bị rách.\n• **Tác hại:** Nếu rút phắt ra, mạch máu bị toác miệng làm **máu phun trào ồ ạt không thể cầm được**, nạn nhân sẽ mất máu tử vong chỉ sau ít phút!\n👉 **Cách xử lý:** Giữ nguyên vật cắm, dùng băng gạc chèn cố định quanh gốc vết thương và gọi ngay **115** đưa đi viện mổ cấp cứu!"
  },
  {
    "id": "stepped_on_used_syringe",
    "category": "injury",
    "badge": "",
    "keywords": [
      "dẫm phải kim tiêm ngoài đường",
      "bị kim tiêm đâm vào chân",
      "dẫm kim tiêm có bị hiv không",
      "kim tiêm vỉa hè cắm vào chân",
      "bị kim đâm chảy máu"
    ],
    "response": "**Dẫm phải kim tiêm vỉa hè: Bình tĩnh xử lý ngay theo các bước sau! 💉⚠️🦶**\n\n• **Tác hại:** Kim tiêm cũ có thể dính máu mang virus HIV hoặc viêm gan B lây nhiễm vào cơ thể.\n• **Các bước sơ cứu sống còn:**\n  1. **Tuyệt đối không nặn bóp:** Nặn bóp làm mạch máu tổn thương khiến virus chui sâu vào cơ thể nhanh hơn.\n  2. Để máu tự chảy nhẹ dưới **vòi nước sạch chảy liên tục cùng xà phòng trong 5 phút**.\n  3. Sát trùng bằng cồn đỏ, báo bố mẹ đưa đến trung tâm y tế tiêm thuốc phơi nhiễm trong **vòng 72 giờ vàng**!"
  },
  {
    "id": "swallow_magnetic_balls_toy",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nuốt viên bi nam châm xếp hình",
      "nuot bi nam cham buckyballs",
      "nuốt nhiều viên nam châm đồ chơi",
      "bi nam châm hút trong ruột",
      "nuốt nam châm có chết không"
    ],
    "response": "**Viên bi nam châm từ tính là món đồ chơi cực kỳ NGUY HIỂM nếu nuốt phải! 🧲☠️⚠️**\n\n• **Nguyên nhân:** Nam châm có lực hút cực khỏe. Khi em nuốt 2 viên trở lên vào bụng vào những thời điểm khác nhau, chúng sẽ nằm ở các khúc ruột khác nhau.\n• **Tác hại:** Chúng sẽ hút chặt lấy nhau xuyên qua thành ruột, **kẹp nghẹt và làm thủng hoại tử nhiều lỗ ruột**, gây nhiễm trùng màng bụng đe dọa tính mạng!\n👉 Đồ chơi nam châm chỉ để xếp hình trên bàn, tuyệt đối cấm ngậm vào miệng em nhé!"
  },

  // ==========================================================================
  // NHÓM 4: TRÒ CHƠI HỌC ĐƯỜNG & TÒ MÒ CƠ THỂ
  // ==========================================================================
  {
    "id": "throw_chalk_dust_sand_eyes",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ném bột phấn vào mặt bạn",
      "ném cát vào mắt nhau",
      "bột phấn bảng bay vào mắt",
      "thổi bụi phấn trêu bạn",
      "ném đất cát vào mắt"
    ],
    "response": "**Ném bụi phấn hay đất cát vào mặt bạn có thể làm mù mắt bạn đấy! 👁️🌪️❌**\n\n• **Nguyên nhân:** Bột phấn chứa thạch cao hút nước cực mạnh, còn hạt cát có cạnh sắc như những lưỡi dao hiển vi.\n• **Tác hại:** Khi bay vào mắt và bị dụi, hạt cát sẽ **cào xước rách giác mạc**, bụi phấn làm bỏng niêm mạc mắt dẫn đến viêm loét mù lòa!\n👉 Lỡ dính bụi vào mắt: Tuyệt đối không được dụi, hãy chớp mắt liên tục trong một bát nước sạch hoặc nhỏ nước muối sinh lý rửa trôi ra!"
  },
  {
    "id": "bug_crawl_into_ear_trap",
    "category": "injury",
    "badge": "",
    "keywords": [
      "con bọ chui vào lỗ tai",
      "kiến bò vào tai lấy tăm chọc",
      "con kien chui vao tai lam sao",
      "côn trùng bay vào tai",
      "bắt con bọ trong tai"
    ],
    "response": "**Kiến hay bọ chui vào tai: CẤM lấy tăm hay que ngoáy chọc vào đuổi nó! 🐜👂🛑**\n\n• **Nguyên nhân:** Bị chọc que nhọn, con bọ sẽ hoảng sợ giãy giụa và dùng càng cắn xé sâu hơn vào màng nhĩ em.\n• **Tác hại:** Làm rách màng nhĩ gây đau đớn dữ dội, chảy máu tai và giảm thính lực.\n👉 **Mẹo thần kỳ:** Nghiêng tai lên trên, nhỏ vài giọt **nước muối sinh lý hoặc dầu ăn sạch** vào tai. Con bọ bị ngạt nước sẽ nổi lên mặt hoặc em nghiêng đầu lại cho nước chảy ra kéo theo con bọ!"
  },
  {
    "id": "mouth_coins_marbles_hazard",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ngậm đồng xu trong miệng",
      "ngậm viên bi ve chơi",
      "ngam dong xu",
      "ngậm nắp chai trong miệng",
      "ngậm cúc áo chơi"
    ],
    "response": "**Đừng biến miệng mình thành chiếc 'ví đựng tiền xu' hay hũ bi ve nhé! 🪙🔴😱**\n\n• **Nguyên nhân:** Đồng xu và bi ve rất trơn láng. Chỉ cần bạn vỗ vai giật mình, hoặc em lỡ bật cười, nuốt nước bọt là viên bi tụt thẳng xuống họng.\n• **Tác hại:** Kích thước tròn xoe của nó sẽ **bít kín mít đường thở (khí quản)**, làm em tím tái ngạt thở tử vong chỉ sau 3-5 phút nếu không được sơ cứu kịp!\n👉 Đồ vật nhỏ bằng kim loại, nhựa: Để trên bàn, không cho vào miệng nếm thử!"
  },
  {
    "id": "climb_tree_rotten_branch",
    "category": "injury",
    "badge": "",
    "keywords": [
      "trèo cây đu cành khô",
      "đu cành cây chơi",
      "treo cay bi gay canh",
      "trèo cây hái quả ngã",
      "đu cành cây cao"
    ],
    "response": "**Đu cành cây khô là 'đánh cược mạng sống' với thần may mắn đấy! 🌳🐒🚫**\n\n• **Nguyên nhân:** Cành cây khô nhìn bên ngoài to khỏe nhưng bên trong đã bị mối mọt ăn rỗng ruột và giòn tan như bánh xốp.\n• **Tác hại:** Khi em đu cả người lên, cành cây sẽ gãy 'rắc' bất thình lình. Em rơi tự do từ trên cao đập lưng xuống rễ cây hoặc tảng đá, gây gãy cột sống, vỡ tạng và bại liệt suốt đời.\n👉 Không trèo cây cao, không đu bám cành cây mục để bảo vệ tấm lưng của mình nhé!"
  },
  {
    "id": "jump_off_moving_swing_midair",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nhảy khỏi xích đu khi đang bay cao",
      "bay từ xích đu xuống đất",
      "nhay khoi xich du",
      "nhảy xích đu tiếp đất",
      "trò chơi nhảy xích đu"
    ],
    "response": "**Trò nhảy khỏi xích đu giữa không trung cực kỳ nguy hiểm, đừng chơi nhé! 🎪🤕❌**\n\n• **Nguyên nhân:** Lực quán tính khi xích đu đang bay lên cực lớn, nó sẽ quăng văng người em đi xa hơn em tưởng và mất hoàn toàn khả năng giữ thăng bằng.\n• **Tác hại:** Em sẽ tiếp đất bằng mặt, gãy cổ chân, hoặc chiếc ghế xích đu bằng sắt sau khi thả ra sẽ **văng ngược trở lại đập vỡ sau gáy em**!\n👉 Muốn xuống xích đu: Hãy dùng chân rê nhẹ xuống cát cho xích đu dừng hẳn rồi mới bước xuống nhé!"
  },
  {
    "id": "cracking_neck_knuckles_danger",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bẻ khớp cổ rôm rốp",
      "vặn cổ kêu răng rắc",
      "be khop co co sao khong",
      "bẻ ngón tay kêu to",
      "vặn cổ như phim kiếm hiệp"
    ],
    "response": "**Bắt chước phim ảnh vặn cổ rôm rốp có thể dẫn đến đột quỵ đấy em! 🥋🦴⚠️**\n\n• **Nguyên nhân:** Cột sống cổ chứa rất nhiều dây thần kinh điều khiển toàn bộ cơ thể và hai mạch máu lớn dẫn máu nuôi não.\n• **Tác hại:** Vặn lắc cổ quá mạnh và đột ngột có thể làm **rách thành động mạch cảnh gây tai biến đột quỵ**, hoặc trật khớp đốt sống cổ chèn ép tủy gây liệt tứ chi tức khắc!\n👉 Mỏi cổ: Em chỉ cần xoay tròn đầu nhẹ nhàng, gập ngửa chậm rãi để thư giãn là tốt nhất nhé!"
  },
{
    "id": "barefoot_wet_open_refrigerator",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "chân ướt mở tủ lạnh có sao không",
      "chan tran mo tu lanh",
      "mở tủ lạnh bị tê tay",
      "chân dính nước sờ tủ lạnh",
      "tủ lạnh bị giật tê tê",
      "đi chân đất mở tủ lạnh"
    ],
    "response": "**Chân ướt đi chân đất mở tủ lạnh là 'nối dây dẫn điện' vào người đấy! ⚡❄️⚠️**\n\n• **Nguyên nhân:** Tủ lạnh dùng lâu ngày có thể bị rò rỉ một lượng điện nhỏ ra vỏ kim loại. Khi chân em ướt chạm thẳng xuống sàn nhà, cơ thể em trở thành một dây dẫn khép kín đưa dòng điện chạy thẳng xuống đất.\n• **Tác hại:** Em sẽ bị điện giật cứng cơ tay, dính chặt không buông tay nắm cửa ra được và ngừng tim nếu dòng điện quá mạnh!\n👉 **Quy tắc:** Luôn lau khô tay, đi dép xốp trong nhà trước khi mở tủ lạnh hoặc chạm vào các đồ điện lớn nhé!"
  },
  {
    "id": "unplug_while_appliance_still_on",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "máy đang chạy rút phích cắm",
      "bếp từ đang nấu giật phích cắm",
      "rút điện khi quạt đang quay",
      "rut phich cam khi chua tat may",
      "tia lửa xẹt khi rút điện"
    ],
    "response": "**Chưa tắt máy mà giật phích cắm sẽ làm bùng tia lửa điện đấy! 🔌💥🛑**\n\n• **Nguyên nhân:** Khi thiết bị công suất lớn đang hoạt động, dòng điện chạy qua phích cắm cực mạnh. Rút đột ngột sẽ sinh ra hiện tượng phóng 'hồ quang điện' xuyên qua không khí.\n• **Tác hại:** Tia lửa điện nổ xẹt kèm tiếng nổ 'đét' làm cháy xém đầu ngón tay em và làm hỏng chảy nhựa ổ cắm nhà mình.\n👉 Hãy luôn bấm nút TẮT (OFF) trên thiết bị trước, sau đó mới nhẹ nhàng rút phích cắm ra nhé!"
  },
  {
    "id": "climb_transformer_station_fence",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "trèo vào trạm biến áp nhặt bóng",
      "chui qua rào trạm biến áp",
      "tram bien ap co giat khong",
      "nhặt cầu trong trạm điện",
      "nghịch gần trạm biến thế"
    ],
    "response": "**Trạm biến áp có biển 'CẤM LẠI GẦN - CÓ ĐIỆN NGUY HIỂM CHẾT NGƯỜI' tuyệt đối không được chui vào! ⚡💀🚫**\n\n• **Nguyên nhân:** Điện áp trong trạm biến áp lên tới hàng nghìn Vôn (cực khủng khiếp). Em **không cần chạm vào dây**, luồng điện cao thế vẫn có thể phóng xuyên qua không khí đánh trúng em trong tầm 1-2 mét!\n• **Tác hại:** Cơ thể bị cháy thành than chỉ trong một cái chớp mắt, không ai có thể vào cứu kịp.\n👉 Đồ chơi rơi vào trạm điện: BỎ ĐI, không tiếc nuối và báo ngay chú bảo vệ xử lý!"
  },
  {
    "id": "pour_water_on_boiling_oil_fire",
    "category": "fire",
    "badge": "",
    "keywords": [
      "chảo dầu bốc cháy dội nước",
      "chao dau soi chay lay nuoc tat",
      "cháy chảo mỡ dập bằng nước",
      "chảo rán cháy dội nước vào",
      "dầu ăn bốc cháy làm gì"
    ],
    "response": "**Chảo dầu mỡ đang bốc cháy mà dội nước vào là bùng nổ như bom lửa! 🍳🔥💥**\n\n• **Nguyên nhân:** Nước nặng hơn dầu nên sẽ chìm xuống đáy chảo đang nóng bỏng. Tại đáy, nước sôi bốc hơi tức khắc, nổ tung và đẩy hàng triệu giọt dầu sôi rực lửa bắn tung tóe lên trần nhà.\n• **Tác hại:** Ngọn lửa bùng cao lên tận trần nhà, thiêu rụi cả gian bếp và tạt thẳng vào mặt người đứng cạnh gây bỏng nặng toàn thân!\n👉 **Cách tắt đúng:** Tuyệt đối không dùng nước! Hãy bình tĩnh tắt bếp, lấy **vung nồi đậy chặt lại** hoặc trùm khăn ướt lên miệng chảo để dập tắt không khí!"
  },

  // ==========================================================================
  // NHÓM 2: GIAO THÔNG (TRÒ ĐÙA NGUY CƠ CAO)
  // ==========================================================================
  {
    "id": "biking_shoulder_to_shoulder_pack",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đi xe đạp dàn hàng 3 hàng 4",
      "khoác vai nhau đi xe đạp",
      "di xe dap dan hang ngang",
      "vừa đi xe vừa nắm tay bạn bè",
      "dàn hàng ngang đi học về"
    ],
    "response": "**Dàn hàng 3, hàng 4 vừa đi vừa khoác vai nhau là 'bẫy ngã dây chuyền' cực nguy hiểm! 🚲👭⚠️**\n\n• **Nguyên nhân:** Khi đi sát nhau, chỉ cần tay lái của bạn này móc nhẹ vào tay phanh của bạn kia là cả hai xe đều bị khóa cứng tay lái.\n• **Tác hại:** Cả nhóm 3-4 bạn sẽ ngã đè lên nhau ngổn ngang ra giữa lòng đường, xe ô tô phía sau lao tới không kịp xử lý sẽ gây ra tai nạn thảm khốc!\n👉 Đi xe đạp theo hàng một nối đuôi nhau, giữ khoảng cách tối thiểu 2 mét với xe phía trước em nhé!"
  },
  {
    "id": "dart_across_street_between_parked_cars",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "chạy vụt qua đường giữa 2 xe ô tô",
      "chui qua khe hai xe ô tô qua đường",
      "lao ra đường từ đuôi xe tải",
      "chạy băng qua đường bất ngờ",
      "khuất tầm nhìn qua đường"
    ],
    "response": "**Lao vụt ra đường từ khe hở giữa 2 xe ô tô đang đỗ là hành động cực kỳ dại dột! 🚗🏃‍♂️💥**\n\n• **Nguyên nhân:** Thân xe ô tô to lớn che khuất hoàn toàn em. Xe cộ đang chạy trên đường bị 'mù tầm nhìn' và không biết có người sắp lao ra.\n• **Tác hại:** Khi em vừa thò đầu ra khỏi đuôi xe, xe máy hoặc ô tô đang chạy tới với tốc độ cao sẽ đâm trực diện vì không có lấy 1 giây để phản ứng!\n👉 Qua đường: Phải đi ra vị trí thông thoáng, dừng lại ngó nghiêng quan sát cả hai bên đường thật rõ ràng rồi mới bước qua!"
  },
  {
    "id": "open_car_door_without_looking",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "mở cửa ô tô không nhìn",
      "tự ý bật cửa xe ô tô",
      "mo cua xe o to bat ngo",
      "mở bung cửa xe hơi",
      "mở cửa ô tô bị xe máy đâm"
    ],
    "response": "**Mở cửa xe ô tô bất cẩn có thể cướp đi tính mạng của người đi đường! 🚪🚘⚠️**\n\n• **Nguyên nhân:** Cánh cửa ô tô mở bung ra tạo thành một bức tường sắt chặn đột ngột trên đường xe chạy.\n• **Tác hại:** Người đi xe máy từ phía sau lao tới sẽ đâm sầm vào cánh cửa xe, ngã văng ra giữa làn đường và bị các xe khác chèn qua vô cùng nguy kịch!\n👉 **Cách mở cửa an toàn kiểu Hà Lan:** Dùng **tay xa cửa** (ngồi bên phải dùng tay trái mở) để cả người tự động xoay lại nhìn gương chiếu hậu phía sau, thấy không có xe mới mở hé cửa từ từ!"
  },
  {
    "id": "heavy_backpack_on_one_shoulder_bike",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "đeo cặp nặng một bên vai đi xe đạp",
      "treo cặp nặng vào ghi đông xe đạp",
      "deo ba lo mot ben di xe",
      "treo đồ lỉnh kỉnh ở tay lái",
      "lệch tay lái xe đạp"
    ],
    "response": "**Treo cặp sách nặng vào một bên tay lái xe đạp rất dễ gây ngã gãy tay! 🎒🚲❌**\n\n• **Nguyên nhân:** Cặp sách nặng lắc lư qua lại sẽ làm mất trọng tâm, kéo ghì một bên tay lái xuống làm em không thể điều khiển thẳng hướng đi.\n• **Tác hại:** Khi gặp ổ gà hoặc phanh gấp, xe sẽ bị liệng quặt sang một bên, hất văng em ngã đập mặt xuống rãnh cống hoặc lòng đường.\n👉 Cặp sách nặng: Hãy đeo ngay ngắn trên hai vai hoặc chằng buộc thật chắc chắn trên giỏ xe/yên sau xe nhé!"
  },

  // ==========================================================================
  // NHÓM 3: TRÒ NGHỊCH DẠI TRONG LỚP HỌC & TRƯỜNG HỌC
  // ==========================================================================
  {
    "id": "poke_friend_with_compass_pencil",
    "category": "injury",
    "badge": "",
    "keywords": [
      "lấy compa chọc đùa bạn",
      "cầm bút chì nhọn chọc bạn",
      "choc compa treu ban",
      "lấy ngòi bút bi đâm bạn",
      "nghịch compa trong lớp"
    ],
    "response": "**Đầu nhọn compa hay bút chì KHÔNG PHẢI đồ chơi chọc ghẹo bạn bè! ✏️📐👁️🚫**\n\n• **Nguyên nhân:** Khi bị chọc bất ngờ, bạn sẽ giật thót mình quay phắt người lại theo phản xạ tự nhiên.\n• **Tác hại:** Đầu compa sắc nhọn cắm thẳng vào **mắt bạn làm vỡ nhãn cầu mù lòa**, hoặc đâm thủng tĩnh mạch ở cổ gây chảy máu ồ ạt nguy kịch!\n👉 Compa, kéo dùng xong phải đóng nắp hoặc cất ngay vào hộp bút, tuyệt đối cấm mang ra đùa nghịch!"
  },
  {
    "id": "shoot_paper_bullet_rubber_band",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bắn đạn giấy bằng dây nịt",
      "bắn dây chun vào người bạn",
      "ban dan giay",
      "gấp đạn giấy bắn nhau",
      "súng bắn đạn chun học sinh"
    ],
    "response": "**Bắn đạn giấy bằng dây chun có lực sát thương không khác gì súng cao su! 🏹📄👁️❌**\n\n• **Nguyên nhân:** Đạn giấy gấp chặt, cứng và góc nhọn, khi được bắn bằng lực co giãn của dây chun sẽ bay với vận tốc xé gió.\n• **Tác hại:** Bắn trúng mắt sẽ làm **rách giác mạc, xuất huyết tiền phòng mắt và làm hỏng thị lực vĩnh viễn**!\n👉 Đừng bao giờ tham gia trò bắn đạn giấy, và hãy báo ngay thầy cô nếu có bạn nào chơi trò này trong lớp nhé!"
  },
  {
    "id": "chew_swallow_pen_cap",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ngậm cắn nắp bút bi",
      "lỡ nuốt nắp bút bi",
      "sao nắp bút bi có lỗ nhỏ",
      "can nap but",
      "nuốt nắp bút bi có sao không"
    ],
    "response": "**Thói quen vừa học vừa ngậm nắp bút bi cực kỳ nguy hiểm cho đường thở! 🖊️🫁⚠️**\n\n• **Nguyên nhân:** Khi đang ngậm nắp bút mà em giật mình, cười đùa hoặc hít thở sâu, nắp bút trơn tuột sẽ bị hút thẳng vào thanh quản.\n• **Tác hại:** Chiếc nắp bút sẽ **kẹt cứng làm tắc đường thở**, khiến em tím tái ngạt thở nguy kịch tính mạng!\n👉 Lỗ nhỏ trên đỉnh nắp bút chính là thiết kế của nhà sản xuất để không khí lọt qua một chút cứu mạng người lỡ nuốt, nhưng tốt nhất là TUYỆT ĐỐI KHÔNG ngậm cắn nắp bút nhé!"
  },
  {
    "id": "wrestling_suplex_prank_school",
    "category": "injury",
    "badge": "",
    "keywords": [
      "đấu vật bắt chước phim",
      "vật ngã nhau trong lớp học",
      "bắt chước đô vật wwe",
      "bế bạn lên quật xuống sàn",
      "chơi trò đấu vật giờ ra chơi"
    ],
    "response": "**Bắt chước các đòn đấu vật trên tivi có thể làm bạn bị GÃY CỔ LIỆT NGƯỜI! 🤼‍♂️💥🛑**\n\n• **Nguyên nhân:** Các đô vật trên tivi là diễn viên xiếc chuyên nghiệp và sàn đấu của họ có đệm lò xo đàn hồi. Còn sàn lớp học là nền bê tông gạch men cứng như đá.\n• **Tác hại:** Khi bị quật ngã, đầu và gáy bạn đập thẳng xuống đất gây **vỡ hộp sọ, gãy đốt sống cổ liệt toàn thân hoặc tử vong tại chỗ**!\n👉 Giờ ra chơi chỉ nên chơi các trò nhẹ nhàng, văn minh, cấm đem các đòn đánh bạo lực ra nghịch nhé!"
  },
  {
    "id": "wrap_tug_of_war_rope_around_wrist",
    "category": "injury",
    "badge": "",
    "keywords": [
      "kéo co quấn dây vào cổ tay",
      "quấn dây thừng vào bàn tay kéo co",
      "keo co quan tay vao day",
      "buộc dây kéo co vào người",
      "kéo co bị đứt ngón tay"
    ],
    "response": "**Kéo co mà quấn dây quanh cổ tay là 'tự chặt đứt bàn tay mình' đấy! 🪢✋😱**\n\n• **Nguyên nhân:** Sức kéo của cả chục người phía bên kia tạo ra một lực giật cực lớn hàng trăm kilôgam. Khi đội em bị kéo ngã trượt, sợi dây thừng sẽ thít chặt lại như lưỡi dao cắt.\n• **Tác hại:** Sợi dây siết nghiến đứt lìa gân cơ, làm gãy nát xương cổ tay hoặc **cắt đứt lìa các ngón tay** trong chớp mắt!\n👉 Kéo co đúng cách: Chỉ dùng hai bàn tay nắm chặt thân dây, tuyệt đối KHÔNG quấn dây vòng quanh cổ tay hay quấn quanh hông!"
  },

  // ==========================================================================
  // NHÓM 4: NGHỊCH DẠI CƠ THỂ & ĐỒ DÙNG SINH HOẠT
  // ==========================================================================
  {
    "id": "bite_nails_rip_hangnails",
    "category": "injury",
    "badge": "",
    "keywords": [
      "cắn móng tay cụt lủn",
      "giật xước măng rô chảy máu",
      "can mong tay",
      "tự giật da mép móng tay",
      "ngón tay bị chín mé mưng mủ"
    ],
    "response": "**Cắn móng tay và giật xước măng-rô có thể làm nhiễm trùng ăn cụt ngón tay! 💅🦠⚠️**\n\n• **Nguyên nhân:** Răng xé toạc lớp da sát khóe móng tạo vết thương hở, vi khuẩn và nấm từ miệng cùng đất bẩn sẽ ồ ạt tấn công vào vết xước.\n• **Tác hại:** Gây bệnh 'chín mé', ngón tay sưng vù đỏ ửng như quả cà chua, mưng mủ thối rữa và có thể ăn sâu làm hoại tử xương ngón tay!\n👉 Thấy xước măng-rô: Lấy bấm móng tay cắt nhẹ sát gốc, tuyệt đối không dùng miệng cắn xé nhé!"
  },
  {
    "id": "poke_finger_through_fan_cage",
    "category": "injury",
    "badge": "",
    "keywords": [
      "thò ngón tay vào cánh quạt đang quay",
      "chọc que vào quạt máy",
      "tho tay vao quat dien",
      "sờ cánh quạt đang chạy",
      "chơi với lồng quạt máy"
    ],
    "response": "**Cánh quạt đang quay nhanh chém đứt ngón tay như dao thái đấy! 🌀🔪✋**\n\n• **Nguyên nhân:** Cánh quạt quay với tốc độ hàng nghìn vòng mỗi phút tạo ra lực chém cực mạnh và sắc bén.\n• **Tác hại:** Chỉ cần ngón tay thò qua kẽ lồng quạt chạm vào mép cánh, ngón tay em sẽ bị **chém gãy xương, đứt gân duỗi và dập nát thịt** phải khâu nối phẫu thuật phức tạp!\n👉 Khi quạt đang chạy: Ngồi cách xa, không chọc que hay thò ngón tay vào lồng quạt em nhé!"
  },
  {
    "id": "stuck_eraser_clay_in_nostril",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nhét mẩu đất nặn vào mũi",
      "nhét hạt cườm vào lỗ mũi",
      "nhet cuc tay vao mui",
      "hột hoa quả kẹt trong mũi",
      "làm sao khi có đồ vật kẹt trong mũi"
    ],
    "response": "**Nhét đồ chơi vào mũi có thể làm nghẹt thở rơi thẳng vào phổi! 👃🔴😱**\n\n• **Nguyên nhân:** Hốc mũi rất trơn và nối thẳng xuống cuống họng. Càng lấy tay móc khều, vật lạ càng bị đẩy tụt sâu vào bên trong.\n• **Tác hại:** Đồ vật rơi tọt vào phế quản gây tắc thở cấp tính, hoặc nằm lâu ngày gây thối rữa, chảy mủ hôi tanh và viêm loét xoang mũi nặng nề.\n👉 **Cách xử lý:** Bịt bên mũi lành, xì mạnh bên mũi bị kẹt xem vật có văng ra không. Nếu không ra, đứng yên không hít mạnh và đến bác sĩ gắp ra ngay!"
  },
  {
    "id": "swallow_toothpick_accidental",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ngậm tăm xỉa răng chạy chơi",
      "lỡ nuốt que tăm",
      "ngam tam trong mieng",
      "tăm đâm thủng ruột",
      "nuốt phải que tăm nhọn"
    ],
    "response": "**Ngậm tăm xỉa răng chạy nhảy là trò nguy hiểm vô cùng! 🥢🩺☠️**\n\n• **Nguyên nhân:** Que tăm hai đầu nhọn hoắt làm bằng tre rất cứng. Khi em cười đùa hay trượt ngã, tăm sẽ trôi tuột xuống bụng mà không bị dịch dạ dày tiêu hóa.\n• **Tác hại:** Hai đầu nhọn của tăm sẽ như cây kim **chọc thủng dạ dày, đâm thủng thành ruột non** gây chảy máu trong và viêm màng bụng cấp phải mổ phanh cứu mạng!\n👉 Xỉa răng xong phải vứt tăm vào thùng rác ngay, tuyệt đối không vừa ngậm tăm vừa đi lại em nhé!"
  },
  {
    "id": "throw_rocks_clods_at_friends",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ném đá chọi nhau",
      "ném gạch ném đất vào bạn",
      "choi nem da",
      "chọi bùn đất trêu nhau",
      "ném đá vỡ đầu"
    ],
    "response": "**Trò chọi đá là trò chơi bạo lực làm vỡ đầu bạn bè! 🪨🤕❌**\n\n• **Nguyên nhân:** Hòn đá hay cục đất cứng bay trong không khí với lực ném mạnh có sức sát thương lớn như một viên đạn.\n• **Tác hại:** Bay trúng thái dương hoặc mắt sẽ làm **lún vỡ hộp sọ, chấn thương sọ não, mù mắt** hoặc để lại di chứng thần kinh suốt đời cho bạn!\n👉 Tuyệt đối không nhặt đá chọi nhau, thấy bạn nào ném đá phải tránh xa và báo ngay thầy cô giáo!"
  },
  {
    "id": "slide_down_stairs_cardboard_box",
    "category": "injury",
    "badge": "",
    "keywords": [
      "ngồi thùng các tông trượt cầu thang",
      "lấy đệm mút trượt cầu thang",
      "truot cau thang bang thung giay",
      "trượt cầu thang mạo hiểm",
      "chơi máng trượt cầu thang nhà"
    ],
    "response": "**Ngồi thùng giấy trượt cầu thang là trò nghịch dại dẫn tới chấn thương nặng! 📦🪜💥**\n\n• **Nguyên nhân:** Cầu thang dốc đứng và có nhiều bậc gấp khúc. Chiếc thùng giấy trượt xuống không hề có phanh, tốc độ tăng vọt em không thể dừng lại được.\n• **Tác hại:** Thùng bị lật úp hất em bay thẳng đầu vào tường hoặc đâm sầm qua cửa kính chân cầu thang, gây gãy cổ và chấn thương cột sống tử vong!\n👉 Cầu thang chỉ dùng để bước từng bậc, không biến cầu thang thành máng trượt cảm giác mạnh em nhé!"
  },
  {
    "id": "skating_without_knee_elbow_pads",
    "category": "injury",
    "badge": "",
    "keywords": [
      "trượt patin không đeo bảo hộ",
      "trượt ván không đội mũ bảo hiểm",
      "truot patin khong can do bao ho",
      "ngã khi trượt patin",
      "đồ bảo hộ đầu gối patin có cần không"
    ],
    "response": "**Trượt Patin hay trượt ván mà không đeo bảo vệ khớp là 'tự hại xương' mình! 🛼🛹🦵⚠️**\n\n• **Nguyên nhân:** Giày trượt patin có bánh xe lăn rất trơn. Khi mất thăng bằng ngã, phản xạ tự nhiên của em là chống hai lòng bàn tay và đập hai đầu gối xuống đường bê tông.\n• **Tác hại:** Lực đập cực mạnh làm vỡ vụn xương bánh chè đầu gối và **gãy gập xương cổ tay**, khiến em phải bó bột đau đớn hàng tháng trời không đi lại được!\n👉 Trượt patin/ván trượt bắt buộc phải trang bị đủ 4 món: Mũ bảo hiểm, bọc bảo vệ cổ tay, bọc khuỷu tay và bọc đầu gối em nhé!"
  },
{
    "id": "breaststroke_dry_land_practice",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "sao phải tập bơi trên cạn",
      "tập bơi trên bờ có tác dụng gì",
      "chưa xuống nước tập bơi làm gì",
      "tap boi ech tren can",
      "tại sao phải tập tay chân trên cạn trước"
    ],
    "response": "**Tập thuần thục trên cạn là bí quyết vàng để xuống nước không bị chìm đấy! 🏊‍♂️🧘‍♂️✨**\n\n• **Nguyên nhân:** Khi mới xuống nước, em sẽ vừa sợ, vừa lạnh, vừa lo sặc nước nên não bộ không thể nhớ nổi tay chân phải quạt đạp ra sao.\n• **Tác hại nếu không tập trên cạn:** Vừa nhảy xuống hồ là tay chân quẫy đạp loạn xạ, mất sức cực nhanh, uống nước hồ và hoảng loạn chìm nghỉm.\n👉 **Cách tập đúng:** Đứng trên bờ tập quạt tay, ngồi mép bờ tập co bẻ đạp chân cho thật nhuần nhuyễn thành phản xạ tự nhiên rồi mới tự tin bước xuống hồ nhé!"
  },
  {
    "id": "breaststroke_overview_for_kids",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "bơi ếch là gì",
      "boi ech la nhu the nao",
      "tại sao bơi ếch lại dễ học nhất",
      "bơi ếch có lợi ích gì",
      "bơi ếch có đứng nước được không"
    ],
    "response": "**Bơi ếch là kiểu bơi mô phỏng động tác bơi lội nhẹ nhàng của chú ếch ộp! 🐸💦**\n\n• **Tại sao ai cũng nên học bơi ếch đầu tiên?**\n  1. **Dễ thở nhất:** Động tác quạt tay tự nhiên sẽ nâng đầu em lên khỏi mặt nước để lấy hơi rất dễ dàng.\n  2. **Có thời gian nghỉ ngơi:** Sau mỗi nhịp đạp chân, em được nằm duỗi thẳng lướt đi êm ái trên mặt nước để lấy lại sức.\n  3. **Làm nền tảng tự cứu:** Biết bơi ếch sẽ giúp em biết đứng nước nổi một chỗ dễ dàng khi mệt mà không sợ chìm!"
  },

  // 2. KỸ THUẬT QUẠT TAY VÀ LỖI CẢN NƯỚC
  {
    "id": "breaststroke_arm_movement_4_steps",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "kỹ thuật quạt tay bơi ếch",
      "4 bước quạt tay bơi ếch",
      "quat tay boi ech the nao",
      "tỳ nước kéo nước đẩy nước là gì",
      "cách quạt tay bơi ếch đúng cách"
    ],
    "response": "**Kỹ thuật quạt tay bơi ếch hiện đại chuẩn 4 bước lướt như tên bắn:** 👐💨🏊\n\n1. **TỲ NƯỚC:** Hai tay duỗi thẳng phía trước, úp lòng bàn tay xuống và hơi nghiêng nhẹ ra ngoài để 'bắt' lấy làn nước.\n2. **KÉO NƯỚC:** Quạt hai tay vòng sang hai bên và hơi chếch xuống dưới (không quạt tay quá rộng ra sau lưng).\n3. **ĐẨY NƯỚC (ÔM NƯỚC):** Nhanh chóng khép hai khuỷu tay sát vào mạn sườn, chụm hai bàn tay trước ngực như đang ôm một quả bóng nước để nâng đầu nhô lên thở.\n4. **TRẢ TAY (VƯƠN TAY):** Phóng thẳng hai tay ra phía trước thật mũi nhọn để xuyên nước lướt đi!"
  },
  {
    "id": "breaststroke_recover_arms_water_resistance",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "lỗi trả tay cản nước khi bơi ếch",
      "sao vươn tay bơi ếch lại bị khựng lại",
      "tra tay boi ech bi can nuoc",
      "vươn tay bơi ếch bị chậm",
      "cách duỗi tay bơi ếch không cản nước"
    ],
    "response": "**Tại sao vươn tay ra trước mà người lại bị 'phanh gấp' khựng lại? 🛑✋⚠️**\n\n• **Nguyên nhân:** Khi trả tay về phía trước, nhiều bạn mở xòe lòng bàn tay chắn ngang dòng nước như một chiếc mái chèo cản ngược chiều bơi!\n• **Tác hại:** Lực cản của nước sẽ triệt tiêu toàn bộ tốc độ em vừa tạo ra, làm em bơi rất nặng nhọc và nhanh mỏi cơ vai.\n👉 **Cách khắc phục:** Khi thu tay trước ngực, hãy chụm các ngón tay lại thành hình mũi tên nhọn, lòng bàn tay úp hoặc hướng vào nhau rồi phóng thẳng xuyên mượt qua nước!"
  },

  // 3. KỸ THUẬT ĐẠP CHÂN HIỆN ĐẠI & SỬA LỖI ĐÙI CẢN NƯỚC
  {
    "id": "breaststroke_knees_too_wide_mistake",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "mở rộng đầu gối khi bơi ếch có sao không",
      "sao không được mở toè đầu gối khi đạp chân ếch",
      "loi mo rong dau goi boi ech",
      "bơi ếch đầu gối bè ra hai bên",
      "tại sao bơi ếch bị nặng đùi"
    ],
    "response": "**Mở bè hai đầu gối quá rộng là 'chiếc phanh hãm' tai hại nhất khi bơi ếch! 🦵🚫⚠️**\n\n• **Nguyên nhân:** Khi co chân mà mở toè hai đầu gối sang hai bên mép bể, hai chiếc bắp đùi to lớn của em sẽ biến thành một tấm chắn khổng lồ hứng trọn lực cản của nước.\n• **Tác hại:** Nước cản cực mạnh kéo tụt người em lại phía sau, bơi vừa mệt vừa xấu dáng và không thể tiến xa được.\n👉 **Kỹ thuật hiện đại:** Giữ hai đầu gối khép gọn gàng (chỉ mở rộng bằng bề ngang của vai), giấu đùi sau thân người và chỉ mở cẳng chân sang hai bên thôi nhé!"
  },
  {
    "id": "breaststroke_heels_to_butt",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "co chân bơi ếch thế nào cho đúng",
      "kéo gót chân sát mông bơi ếch",
      "co chan boi ech dung cach",
      "động tác co chân trong bơi ếch",
      "cách co chân không bị cản nước"
    ],
    "response": "**Bí quyết co chân bơi ếch lướt mượt: Kéo gót chân chạm sát về mông! 🍑🦵✨**\n\n• **Kỹ thuật chuẩn:** Từ tư thế duỗi thẳng, từ từ gập đầu gối và kéo hai gót chân thu sát về phía mông của mình.\n• **Lợi ích tuyệt vời:**\n  1. Giúp giấu hoàn toàn bắp đùi phía sau thân người, triệt tiêu tối đa lực cản của nước.\n  2. Tạo ra một góc đòn bẩy hoàn hảo để hai bàn chân đạp bung nước ra phía sau với lực đẩy mạnh nhất!"
  },
  {
    "id": "breaststroke_kick_foot_angle_mistake",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "tại sao đạp chân ếch không tiến",
      "đạp chân ếch mãi người vẫn đứng yên",
      "sao đạp chân ếch không đi xa",
      "lỗi chúc mũi chân khi bơi ếch",
      "quên bẻ cổ chân bơi ếch"
    ],
    "response": "**Tại sao đạp chân ếch cật lực mà người vẫn đứng yên một chỗ? 🐸🦶❓**\n\n• **Nguyên nhân:** Do em **quên bẻ gập cổ chân** hoặc để mũi chân chúc thẳng xuống đáy bể, khiến mu bàn chân bị trượt nước tuồn tuột không có điểm tựa!\n• **Cách sửa đúng ngay lập tức:**\n  1. Khi co gót chân về mông, phải **bẻ gập cổ chân vuông góc** và xòe hai mũi chân hướng sang hai bên như bàn chân vịt.\n  2. Dùng toàn bộ **lòng bàn chân** đạp miết mạnh vòng cung ra phía sau để đẩy nước lùi lại, cơ thể em sẽ tự khắc phóng vọt về phía trước!"
  },
  {
    "id": "breaststroke_glide_phase_relax",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "pha lướt nước trong bơi ếch là gì",
      "tại sao đạp chân xong phải duỗi thẳng người",
      "pha lướt nước bơi ếch",
      "bơi ếch sao cho không mệt",
      "thời gian nghỉ khi bơi ếch"
    ],
    "response": "**Pha lướt nước - 'Thời gian vàng' để cơ thể nghỉ ngơi thư giãn khi bơi ếch! 🧘‍♂️🌊💨**\n\n• **Nguyên nhân nhiều bạn nhanh kiệt sức:** Đạp chân xong là vội vàng quạt tay đạp chân tiếp liên tục mà không chịu lướt nước, làm cơ bắp không có lấy 1 giây phục hồi!\n• **Kỹ thuật chuẩn:** Ngay sau khi khép chân kết thúc cú đạp, hãy **duỗi thẳng toàn thân từ đầu ngón tay tới ngón chân như một mũi tên tên lửa** và thả lỏng trôi lướt đi trong 2 - 3 giây.\n• Đây chính là bí quyết giúp các vận động viên bơi hàng cây số mà không hề biết mệt!"
  },

  // 4. KỸ THUẬT THỞ & SỬA LỖI THỞ SAI KHI BƠI
  {
    "id": "breaststroke_holding_breath_mistake",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "lỗi nín thở khi bơi ếch",
      "tại sao nín thở bơi ếch lại mau mệt",
      "sao ngoi lên thở không kịp",
      "hết hơi khi bơi ếch",
      "thở không đúng cách khi bơi ếch"
    ],
    "response": "**Nín thở dưới nước rồi ngoi lên mới thở là sai lầm làm em chìm nghỉm! 😮‍💨🫧❌**\n\n• **Nguyên nhân:** Khi nín thở suốt dưới nước, phổi em bị đầy khí cũ (CO2). Khi ngoi lên, em phải mất thời gian thở phì ra rồi mới kịp hít vào, làm đầu bị chìm xuống nước trước khi kịp lấy hơi!\n• **Cách thở đúng nhịp nhàng:**\n  1. **Ở dưới nước:** Dùng mũi từ từ thở nhẹ nhàng tạo bong bóng xả hết hơi cũ ra.\n  2. **Vừa nhô đầu lên:** Phổi đã rỗng sẵn, em chỉ việc há miệng 'đớp' ngay một ngụm không khí trong lành chỉ mất 0.5 giây rồi úp mặt xuống lướt tiếp!"
  },
  {
    "id": "breaststroke_blow_water_from_mouth",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "cách nhổ nước trong miệng khi bơi",
      "ngoi lên bị nước vào mồm khi bơi ếch",
      "thổi nước trong miệng khi lấy hơi",
      "phồng má thổi nước khi bơi",
      "không nuốt nước hồ bơi khi thở"
    ],
    "response": "**Mẹo 'Phồng má xả nước' để không bao giờ bị nuốt nước hồ vào bụng: 🐡💦✨**\n\n• **Vấn đề:** Khi ngoi đầu lên lấy hơi, sóng nước thường tràn vào khoang miệng làm em sợ hãi nuốt ực phải nước bẩn.\n• **Bí kíp tài liệu Dayboish hướng dẫn:**\n  1. Ngay khoảnh khắc miệng vừa nhô qua mặt nước, hãy **phồng nhẹ má và khép môi thổi phù một hơi thật dứt khoát** để tống sạch giọt nước đọng trên môi văng ra ngoài.\n  2. Ngay sau tiếng phù đó, miệng em lập tức há to hít trọn không khí sạch mà không dính một giọt nước nào!"
  },
  {
    "id": "breaststroke_stiff_body_tired",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "tại sao gồng cứng người khi bơi lại chìm",
      "gồng người bơi ếch bị mệt",
      "bơi ếch không thả lỏng",
      "cách cảm nhận nước khi bơi",
      "làm sao để bơi ếch thả lỏng"
    ],
    "response": "**Gồng cứng cơ bắp sẽ biến em thành 'tảng đá nặng trịch' dưới nước! 🗿💧⚠️**\n\n• **Nguyên nhân:** Khi sợ hãi, em gồng cứng ngắc cơ cổ, cơ lưng và đùi. Cơ bắp co cứng làm tăng tỷ trọng cơ thể và khiến em không cảm nhận được lực nâng của nước.\n• **Tác hại:** Nhanh đuối sức chỉ sau 10 mét, người nặng trịch cắm đầu xuống đáy và rất dễ bị chuột rút bẻ cong ngón chân.\n👉 **Bí quyết cảm nhận nước:** Hãy thả lỏng mềm mại như một cây rong biển. Nước sẽ tự nâng em nổi bồng bềnh, em chỉ cần dùng lực nhẹ nhàng đẩy nước để trôi đi thôi!"
  },

  // 5. NHỊP ĐIỆU PHỐI HỢP TOÀN THÂN
  {
    "id": "breaststroke_rhythm_timing",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "nhịp phối hợp bơi ếch",
      "câu thần chú bơi ếch",
      "tay chân kết hợp bơi ếch thế nào",
      "thứ tự động tác bơi ếch",
      "tay trước hay chân trước khi bơi ếch"
    ],
    "response": "**Học thuộc 'Câu thần chú 3 nhịp' để tay chân phối hợp nhịp nhàng như vũ công:** 🎶🏊‍♂️\n\n👉 **Nhịp 1 (TAY QUẠT - ĐẦU LÊN - THỞ):** Hai tay quạt nước sang bên, ép khuỷu tay nâng cằm lên mặt nước và há miệng hít một hơi sâu.\n👉 **Nhịp 2 (TAY VƯƠN - CHÂN CO):** Úp mặt xuống nước, phóng hai tay thẳng ra phía trước đồng thời co gót chân về sát mông và bẻ cổ chân sẵn sàng.\n👉 **Nhịp 3 (CHÂN ĐẠP - NGƯỜI LƯỚT):** Đạp mạnh hai chân khép thẳng tắp lại, giữ người thẳng như mũi tên lướt vùn vụt trên mặt nước!\n\n*(Nhớ khẩu quyết: **TAY KÉO THỞ - TAY VƯƠN CHÂN CO - CHÂN ĐẠP LƯỚT NƯỚC** nhé!)*"
  },
 {
    "id": "help_position_cold_water",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "tư thế HELP giữ ấm dưới nước",
      "tu the help duoi nuoc lanh",
      "cách chống hạ thân nhiệt khi rơi xuống nước",
      "tư thế cuộn người giữ nhiệt khi có áo phao",
      "làm sao không bị cóng khi chờ cứu hộ"
    ],
    "response": "**Tư thế H.E.L.P - 'Áo giáp giữ ấm' khi bị rơi xuống nước lạnh chờ cứu hộ! 🥶🛡️🦺**\n\n• **Tác dụng:** Giúp cơ thể không bị mất nhiệt qua nách, ngực và bẹn, kéo dài thời gian sống sót gấp 3 lần khi mặc áo phao giữa dòng nước lạnh.\n• **Cách làm:**\n  1. Hai tay ôm chặt lấy phần ngực hoặc ôm chặt lấy thân áo phao.\n  2. Co hai đầu gối ép sát lên ngực, hai đùi khép chặt lại với nhau.\n  3. Giữ yên tư thế, đầu ngửa thở đều, không bơi lội lung tung để tránh bị mất nhiệt!"
  },

  // ==========================================================================
  // NHÓM 2: MỨC ĐỘ NGUY HIỂM & Ý NGHĨA CÁC BIỂN BÁO - CỜ CẢNH BÁO
  // ==========================================================================
  {
    "id": "beach_red_flag_meaning",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "cờ đỏ cắm ở bãi biển là gì",
      "y nghia co do o bien",
      "thấy cờ đỏ ở biển có được tắm không",
      "cờ đỏ cảnh báo gì",
      "bãi biển cắm cờ đỏ"
    ],
    "response": "**CỜ ĐỎ Ở BIỂN: CẤM TẮM TUYỆT ĐỐI - NGUY HIỂM CHẾT NGƯỜI! 🚩🛑💀**\n\n• **Mức độ nguy hiểm: CỰC KỲ CAO.**\n• **Nguyên nhân cắm cờ đỏ:** Biển đang có sóng thần, sóng dữ cao vút, xuất hiện dòng chảy xa bờ (rip current) ngầm cực mạnh hoặc thời tiết chuẩn bị có bão to giông lốc.\n• **Tác hại:** Bất kỳ ai bước chân xuống nước dù bơi giỏi đến đâu cũng sẽ bị sóng dìm và cuốn phăng ra đại dương mất tích ngay lập tức!\n👉 Thấy cờ đỏ: Ở yên trên bãi cát, tuyệt đối không thò chân xuống mép nước!"
  },
  {
    "id": "beach_yellow_flag_meaning",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "cờ vàng cắm ở bãi biển là gì",
      "y nghia co vang bai bien",
      "cờ vàng có được bơi không",
      "cờ vàng nguy hiểm thế nào",
      "biển cắm cờ màu vàng"
    ],
    "response": "**CỜ VÀNG Ở BIỂN: CẢNH BÁO NGUY HIỂM TRUNG BÌNH - PHẢI CỰC KỲ CẨN TRỌNG! 🟨⚠️🏊**\n\n• **Mức độ nguy hiểm: TRUNG BÌNH.**\n• **Ý nghĩa:** Biển có sóng vừa, gió bắt đầu mạnh hoặc có dòng nước ngầm tiềm ẩn. Không phù hợp cho trẻ em hoặc người bơi yếu.\n👉 **Quy tắc an toàn:** Học sinh chỉ được tắm khi có bố mẹ ôm phao giữ chặt bên cạnh, không bơi ra xa và phải bơi ngay trong tầm quan sát của nhân viên cứu hộ!"
  },
  {
    "id": "beach_red_yellow_flag_lifeguard",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "cờ nửa đỏ nửa vàng ở biển",
      "co soc do vang",
      "tắm ở đâu trên bãi biển an toàn nhất",
      "khu vực có cứu hộ ở biển",
      "cờ đỏ vàng có ý nghĩa gì"
    ],
    "response": "**CỜ SỌC ĐỎ - VÀNG: KHU VỰC AN TOÀN NHẤT CÓ CỨU HỘ TUẦN TRA! 🏖️🛟✅**\n\n• **Ý nghĩa:** Khoảng bờ biển nằm giữa hai lá cờ sọc đỏ-vàng là nơi an toàn đã được các chú nhân viên cứu hộ kiểm tra đáy cát không có hố sụt và luôn có người túc trực canh gác.\n👉 **Lời khuyên của Thỏ ngọc:** Đi biển, cả nhà em hãy chọn đúng bãi cát nằm trong phạm vi hai lá cờ đỏ-vàng này để vui chơi an tâm nhất nhé!"
  },
  {
    "id": "water_depth_colors_pool",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "chữ số ghi trên thành bể bơi là gì",
      "so 1m2 tren ho boi nghia la gi",
      "độ sâu 1m4 1m8 ở hồ bơi",
      "vạch chia màu xanh đỏ ở bể bơi",
      "nhìn độ sâu hồ bơi thế nào"
    ],
    "response": "**Các con số ghi trên thành bể bơi chính là THƯỚC ĐO MỨC ĐỘ NGUY HIỂM đấy! 🏊‍♂️📏⚠️**\n\n• **Số 0.8m - 1.0m:** Nước cạn (ngang ngực trẻ em), dành cho các bạn tập bơi.\n• **Số 1.4m - 2.0m:** Nước sâu vượt quá đầu em! Nếu chưa biết bơi mà nhảy vào đây sẽ bị hụt chân chìm xuống đáy ngay lập tức.\n👉 Trước khi xuống bể bơi, hãy nhìn con số dưới chân: Chỉ xuống khu vực có độ sâu thấp hơn chiều cao của em nhé!"
  },
  {
    "id": "hypothermia_blue_lips_shivering",
    "category": "health",
    "badge": "",
    "keywords": [
      "bơi bị tím môi run rẩy",
      "sao bơi lâu môi lại bị thâm tím",
      "run bần bật răng đập vào nhau khi tắm hồ",
      "bị hạ thân nhiệt khi bơi",
      "tắm nước lạnh nổi da gà"
    ],
    "response": "**Môi tím ngắt và răng đập vào nhau là tín hiệu cơ thể đang KÊU CỨU KHẨN CẤP! 🥶👄🛑**\n\n• **Nguyên nhân:** Nước truyền nhiệt nhanh gấp 25 lần không khí. Ngâm nước quá lâu làm thân nhiệt tụt dốc không phanh (hạ thân nhiệt).\n• **Tác hại:** Máu bị dồn về nuôi tim phổi làm chân tay tê cóng mất cảm giác, cơ bắp co cứng chuột rút toàn thân và chìm nghỉm!\n👉 Thấy bạn môi thâm tím hoặc run rẩy: Bắt bạn **lên bờ ngay lập tức**, quấn khăn ấm, uống cốc nước gừng/nước đường ấm và lau khô người nhé!"
  },

  // ==========================================================================
  // NHÓM 3: BỘ QUY TẮC PHÒNG TRÁNH KINH ĐIỂN DỄ NHỚ
  // ==========================================================================
  {
    "id": "rule_3_no_water_safety",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "quy tắc 3 không phòng đuối nước",
      "3 khong phong chong duoi nuoc la gi",
      "ba điều không khi đi bơi",
      "quy tac 3 khong cho hoc sinh",
      "3 điều cấm kỵ gần sông hồ"
    ],
    "response": "**Quy tắc '3 KHÔNG' sống còn mà học sinh nào cũng phải thuộc lòng:** 🛡️🚫\n\n1. **KHÔNG tự ý xuống nước:** Khi không có sự đồng ý và giám sát trực tiếp của bố mẹ, thầy cô.\n2. **KHÔNG chơi đùa sát mép nguy hiểm:** Không đá bóng, bắt cá, chạy nhảy bên bờ ao, hồ, sông, suối, hố công trình.\n3. **KHÔNG nhảy xuống cứu bạn:** Khi thấy người đuối nước, tuyệt đối không nhảy theo mà phải **HÔ TO - GỌI NGƯỜI LỚN - NÉM VẬT NỔI**!"
  },
  {
    "id": "rule_4_must_water_safety",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "quy tắc 4 phải khi đi bơi",
      "4 điều phải làm trước khi xuống nước",
      "quy tac 4 phai phong duoi nuoc",
      "trước khi bơi phải làm gì",
      "4 có khi đi bơi"
    ],
    "response": "**Quy tắc '4 PHẢI' chuẩn hiệp sĩ để luôn an toàn dưới nước:** 🛡️✅\n\n1. **PHẢI khởi động kỹ 10 - 15 phút:** Xoay tròn các khớp cổ chân, cổ tay, khớp gối và lườn để chống chuột rút.\n2. **PHẢI mặc áo phao:** Khi đi đò, tàu thuyền hoặc khi chưa bơi thành thạo.\n3. **PHẢI bơi ở nơi an toàn:** Nơi có nhân viên cứu hộ và có cờ báo cho phép tắm.\n4. **PHẢI lên bờ ngay:** Khi thấy trời chuyển mây đen dông bão hoặc cơ thể bắt đầu thấy lạnh, mệt mỏi!"
  },
  {
    "id": "buddy_system_swimming",
    "category": "swimming",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "nguyên tắc đôi bạn đồng hành khi bơi",
      "buddy system là gì",
      "bơi theo cặp có tác dụng gì",
      "tại sao phải bơi cùng bạn",
      "quy tắc hai người đi bơi"
    ],
    "response": "**Quy tắc Buddy System (Đôi bạn cùng tiến) - Không bao giờ bơi đơn độc! 👬🛟**\n\n• **Cách thực hiện:** Khi xuống nước, em và bạn được phân công thành một cặp luôn để mắt tới nhau trong khoảng cách nhìn thấy.\n• **Tác dụng cứu mạng:** Đuối nước diễn ra trong im lặng cực nhanh. Nếu một bạn bị hụt chân hay chuột rút chìm xuống, người bạn đồng hành sẽ lập tức phát hiện và hét to báo cứu hộ ứng cứu kịp thời chỉ trong 5 giây vàng!"
  },
  {
    "id": "test_water_depth_with_stick",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "cách lấy cành cây đo độ sâu nước",
      "dùng gậy thăm dò mực nước",
      "lam sao biet nuoc sau hay nong khi di duong ngap",
      "cầm que dò đường nước ngập",
      "thử độ sâu của vũng nước"
    ],
    "response": "**Mẹo 'Gậy dò đường' của hiệp sĩ Thỏ ngọc khi bắt buộc phải qua chỗ ngập nước:** 🦯🌊⚠️\n\n• **Cách làm:** Tìm một cành cây hoặc khúc gỗ dài, chắc chắn. Trước mỗi bước chân đi tới, hãy dùng gậy chọc mạnh thẳng đứng xuống nước phía trước để thăm dò.\n• **Tác dụng:** Cây gậy sẽ báo cho em biết phía trước là mặt đường cứng bằng phẳng hay là một chiếc **hố ga mất nắp, rãnh cống sâu hút** để em kịp thời dừng bước né tránh!"
  },

  // ==========================================================================
  // NHÓM 4: HIỂU LẦM TAI HẠI VỀ NƯỚC BẨN & CHÁY NẮNG
  // ==========================================================================
  {
    "id": "drink_pool_chlorine_water_harm",
    "category": "health",
    "badge": "",
    "keywords": [
      "uống nước hồ bơi có sao không",
      "uống nhầm nước hồ bơi có mùi thuốc tẩy",
      "nuốt nước hồ bơi bị đau bụng",
      "nuoc ho boi co doc khong",
      "lo uong nuoc be boi"
    ],
    "response": "**Nước bể bơi chứa hóa chất Clo và rất nhiều vi khuẩn, đừng uống nhé! 🏊‍♂️🧪🤢**\n\n• **Nguyên nhân:** Để giữ nước trong, người ta dùng hóa chất Clo khử trùng. Ngoài ra trong nước hồ còn có mồ hôi, bụi bẩn và vi khuẩn của hàng trăm người cùng tắm.\n• **Tác hại:** Nuốt phải một ngụm lớn sẽ làm bỏng rát họng, đau bụng tiêu chảy dữ dội hoặc nhiễm khuẩn đường ruột.\n👉 Nếu lỡ nuốt phải một ngụm nhỏ: Hãy nhổ bã ra ngay, súc miệng lại bằng nước sạch và uống bù một cốc nước lọc ấm nhé!"
  },
  {
    "id": "sunburn_blister_swimming",
    "category": "health",
    "badge": "",
    "keywords": [
      "tắm biển bị cháy nắng lột da",
      "rát da sau khi đi bơi buổi trưa",
      "cháy nắng phồng rộp da",
      "tai sao di boi ve bi den da",
      "chữa rát da cháy nắng"
    ],
    "response": "**Cháy nắng lột da không chỉ đen da mà là một dạng BỎNG NHIỆT đấy em! ☀️🏖️🧴**\n\n• **Nguyên nhân:** Tia cực tím (UV) gay gắt của mặt trời buổi trưa (10h - 15h) chiếu xuyên qua mặt nước đốt cháy lớp tế bào ngoài cùng của da.\n• **Tác hại:** Da bị đỏ rát như tôm luộc, phồng rộp bọng nước đau đớn và làm tăng nguy cơ ung thư da khi lớn lên.\n👉 **Bảo vệ da:** Thoa kem chống nắng trước khi bơi 20 phút, mặc áo bơi dài tay và tuyệt đối không tắm vào giữa trưa nắng gắt nhé!"
  },
{
    "id": "swimsuit_rule_body_boundary",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "quy tắc đồ bơi là gì",
      "vùng kín trên cơ thể là gì",
      "ai được chạm vào đồ lót của em",
      "quy tac do boi phong xam hai",
      "vùng đồ lót cấm chạm",
      "chạm vào người làm em khó chịu"
    ],
    "response": "**Quy tắc đồ bơi: Cơ thể em là của riêng em, bất khả xâm phạm! 🩱🩲🛡️**\n\n• **Vùng đồ bơi gồm 4 chỗ:** Miệng, ngực, vùng giữa 2 đùi (vùng kín) và mông.\n• **Quy tắc sống còn:** Tuyệt đối **KHÔNG AI** được phép nhìn, chạm vào hoặc bắt em chạm vào vùng đồ bơi của họ!\n• **Ngoại lệ duy nhất:** Bố mẹ tắm rửa/vệ sinh khi em còn nhỏ, hoặc bác sĩ khám bệnh nhưng **bắt buộc phải có bố mẹ đứng cạnh giám sát**.\n👉 Nếu ai cố tình đụng chạm: Hét to **'CẤM ĐỤNG VÀO TÔI'**, chạy ngay đến chỗ đông người và báo bố mẹ hoặc gọi **111**!"
  },
  {
    "id": "five_fingers_rule_touch",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "quy tắc 5 ngón tay là gì",
      "quy tac 5 ngon tay phong xam hai",
      "5 ngón tay phòng chống xâm hại",
      "ai được ôm em",
      "ai phải xua tay không cho chạm"
    ],
    "response": "**Quy tắc 5 ngón tay thần kỳ giúp em nhận diện ai được chạm vào mình:** 🖐️🛡️\n\n1. **Ngón cái (Gần nhất - Ôm hôn):** Bố mẹ, ông bà, anh chị em ruột trong nhà.\n2. **Ngón trỏ (Khoác tay, nắm tay):** Thầy cô giáo, bạn bè, họ hàng thân thiết.\n3. **Ngón giữa (Bắt tay):** Người quen biết (hàng xóm, bạn của bố mẹ).\n4. **Ngón áp út (Vẫy tay chào):** Người mới gặp lần đầu, người lạ thoáng qua.\n5. **Ngón út (Xua tay, hét to, bỏ chạy):** Người lạ mặt tiến sát, người làm em thấy sợ hãi hoặc cố tình đụng chạm vào cơ thể em!"
  },
  {
    "id": "bad_secret_threat_silence",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "bí mật xấu là gì",
      "bị người lớn đe dọa cấm kể bố mẹ",
      "người ta bảo đây là bí mật của hai chú cháu",
      "kể ra tao sẽ đánh",
      "sợ không dám kể với mẹ"
    ],
    "response": "**Bí mật làm em sợ hãi là BÍ MẬT XẤU, phải kể ngay với bố mẹ! 🤐🚫🗣️**\n\n• **Thủ đoạn của kẻ xấu:** Kẻ xấu hay làm điều sai trái với cơ thể em rồi đe dọa: *'Cấm kể cho ai, kể ra tao đánh chết hoặc làm hại bố mẹ mày'*, làm em sợ hãi im lặng.\n• **Sự thật:** Kẻ xấu đang rất sợ hãi bị lộ tẩy nên mới đe dọa em. Em không hề có lỗi, em là nạn nhân được pháp luật bảo vệ!\n👉 **Hành động ngay:** Bất kể ai dọa nạt, hãy dũng cảm kể hết với bố mẹ, thầy cô hoặc gọi ngay tổng đài **111**. Mọi người sẽ bảo vệ em an toàn 100%!"
  },
  {
    "id": "stranger_candy_toy_bribe",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "người lạ cho kẹo trước cổng trường",
      "người lạ cho tiền có lấy không",
      "nguoi la cho keo bim bim",
      "cho trà sữa đi nhờ xe",
      "người lạ tặng đồ chơi bảo đi theo"
    ],
    "response": "**Một viên kẹo ngọt có thể giấu 'cái bẫy bắt cóc' cực kỳ nguy hiểm! 🍬🍭🚗❌**\n\n• **Nguyên nhân:** Kẻ xấu thường lợi dụng lòng tin và sở thích ăn vặt của học sinh để tẩm thuốc mê vào kẹo/nước ngọt hoặc dụ dỗ em lên xe đi theo.\n• **Tác hại:** Em sẽ bị mất ý thức, bị bắt cóc tống tiền hoặc bán ra nước ngoài không bao giờ được gặp lại bố mẹ nữa!\n👉 **Quy tắc:** Lắc đầu dứt khoát: *'Cháu cảm ơn, bố mẹ cháu không cho nhận đồ lạ'*, lùi xa 3 bước và đi ngay vào trong phòng bác bảo vệ trường!"
  },
  {
    "id": "stranger_says_parents_in_hospital",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "người lạ bảo bố mẹ bị tai nạn nhờ đón",
      "có chú bảo mẹ gửi quà đến đón em",
      "người lạ nói bố mẹ nằm viện",
      "bảo bố mẹ bận nhờ chú đón",
      "người lạ nhận là bạn của bố"
    ],
    "response": "**Đây là cái cớ bắt cóc kinh điển nhất, TUYỆT ĐỐI KHÔNG LÊN XE! 🏥🚗🛑**\n\n• **Kẻ xấu đánh vào tâm lý:** Biết em lo cho bố mẹ, kẻ xấu sẽ nói dối: *'Mẹ cháu bị xe đâm đang cấp cứu, chú là bạn mẹ đưa cháu đến viện gấp!'*.\n• **Cách vạch trần kẻ xấu:**\n  1. Đứng yên trong sân trường, hỏi ngay: **'MẬT MÃ BÍ MẬT của gia đình cháu là gì?'** (hãy quy ước 1 từ bí mật với bố mẹ ở nhà).\n  2. Chạy ngay đến phòng giám thị hoặc nhờ bác bảo vệ gọi điện thoại trực tiếp cho bố mẹ để kiểm tra!"
  },
  {
    "id": "screaming_technique_stranger_grab",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "bị người lạ lôi kéo đi",
      "bị bế thốc lên xe lôi đi",
      "người lạ túm tay giật đi",
      "bị bắt cóc hét câu gì",
      "kêu cứu khi bị bắt cóc"
    ],
    "response": "**Khi bị kẻ lạ mặt túm kéo, phải hét thật to câu này để được cứu sống:** 🗣️🚨\n\n• **Câu hét cứu mạng:** **'CỨU CHÁU VỚI! ĐÂY KHÔNG PHẢI BỐ MẸ CHÁU! CỨU VỚI BẮT CÓC!'**\n• **Tại sao phải hét như vậy?** Nếu chỉ gào khóc *'Thả cháu ra, buông ra'*, người đi đường sẽ tưởng em đang hờn dỗi bố mẹ và không can thiệp!\n• **Động tác phối hợp:** Cắn mạnh vào tay kẻ xấu, ngồi thụt thụp xuống đất làm người nặng trịch, dùng hai chân đạp mạnh và giãy giụa hết sức!"
  },
  {
    "id": "alone_at_home_stranger_knocks",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "ở nhà một mình có người lạ gõ cửa",
      "người lạ xưng là thợ sửa ống nước",
      "người giao hàng bấm chuông khi ở nhà một mình",
      "o nha mot minh co nguoi go cua",
      "người lạ bảo mở cửa cho chú vào"
    ],
    "response": "**Ở nhà một mình: KHÓA CHẶT CỬA VÀ TUYỆT ĐỐI KHÔNG MỞ CỬA! 🚪🔒🛑**\n\n• Dù người ngoài cửa xưng là thợ sửa điện, giao bưu phẩm hay bạn của bố mẹ, em cũng **không được mở then cài cửa**.\n• Nói to từ trong nhà: *'Bố mẹ cháu đang bận trong phòng ngủ, chú quay lại sau nhé!'* (để kẻ xấu tưởng trong nhà có người lớn).\n• Lập tức gọi điện thoại cho bố mẹ báo có người đang đứng trước cửa nhà mình!"
  },

  // ==========================================================================
  // NHÓM 2: AN TOÀN TRÊN KHÔNG GIAN MẠNG (GAME & INTERNET)
  // ==========================================================================
  {
    "id": "free_fire_roblox_diamonds_scam",
    "category": "cyber_safety",
    "badge": "",
    "keywords": [
      "đổi ảnh cởi đồ lấy kim cương game",
      "chụp ảnh vùng kín nhận robux",
      "bạn trên mạng bảo gửi ảnh không mặc đồ",
      "tặng kim cương free fire bảo gửi ảnh cơ thể",
      "gửi ảnh nhạy cảm nhận quà game"
    ],
    "response": "**BẪY TỐI NGUY HIỂM: Tuyệt đối không bao giờ chụp ảnh thân thể gửi lên mạng! 🎮💎☠️🚫**\n\n• **Thủ đoạn của kẻ biến thái:** Dụ dỗ tặng thẻ nạp, kim cương game, Robux để lừa em gửi ảnh khỏa thân hoặc video vùng nhạy cảm.\n• **Tác hại kinh hoàng:** Sau khi nhận ảnh, kẻ xấu sẽ đe dọa tung ảnh lên mạng xã hội, gửi cho bạn bè thầy cô để ép em làm những điều tồi tệ hơn!\n👉 Khi bị gạ gẫm: Không gửi, chụp màn hình tin nhắn lại, chặn nick kẻ đó và đưa cho bố mẹ/thầy cô xem ngay!"
  },
  {
    "id": "click_strange_link_win_iphone",
    "category": "cyber_safety",
    "badge": "",
    "keywords": [
      "bấm vào link trúng thưởng iphone trên mạng",
      "đường link nhận xe đạp miễn phí",
      "bam vao link la",
      "link nhận kim cương game miễn phí",
      "nhập tài khoản vào trang web lạ"
    ],
    "response": "**Không có bữa trưa nào miễn phí! Đừng bấm vào link trúng thưởng lạ! 🔗📱🎣❌**\n\n• **Nguyên nhân:** Đó là các trang web giả mạo gắn mã độc gián điệp (phishing) của tin tặc.\n• **Tác hại:** Chỉ cần bấm vào hoặc nhập số điện thoại, máy tính/điện thoại của em sẽ bị nhiễm virus, cướp sạch tài khoản Zalo, Facebook của bố mẹ và đánh cắp tiền trong tài khoản ngân hàng!\n👉 Thấy link lạ được gửi qua tin nhắn: Xóa ngay lập tức, không tò mò bấm vào!"
  },
  {
    "id": "online_friend_meet_in_person",
    "category": "cyber_safety",
    "badge": "",
    "keywords": [
      "bạn quen trên mạng rủ đi chơi riêng",
      "gặp bạn trên game ngoài đời",
      "bạn trên facebook rủ đi trà sữa",
      "gap ban qua mang",
      "bạn qua mạng hẹn gặp ở công viên"
    ],
    "response": "**Bạn quen qua mạng: Người trên ảnh có thể là một 'ác quỷ đội lốt'! 💻👥⚠️**\n\n• **Nguyên nhân:** Trên mạng ai cũng có thể lấy ảnh một bạn học sinh xinh xắn, dễ thương làm ảnh đại diện để làm quen, nhưng ngoài đời thực họ có thể là một kẻ bắt cóc hoặc buôn người lớn tuổi!\n• **Tác hại:** Đi gặp riêng một mình ở quán vắng hay công viên, em sẽ bị lừa đưa lên xe chở đi mất tích.\n👉 Tuyệt đối không đi gặp riêng bạn trên mạng. Nếu thật sự muốn gặp, phải hỏi ý kiến và **có bố mẹ đi cùng 100%**!"
  },
  {
    "id": "cyberbullying_hate_group",
    "category": "cyber_safety",
    "badge": "",
    "keywords": [
      "bị bạn lập nhóm nói xấu trên mạng",
      "bị đăng ảnh dìm bôi nhọ trên facebook",
      "bi bat nat tren mang",
      "bạn bè tẩy chay xúc phạm trên tin nhắn",
      "bị dọa đánh trên mạng xã hội"
    ],
    "response": "**Bắt nạt trên mạng (Cyberbullying): Đừng chịu đựng một mình, hãy làm 3 bước! 💻🛑🛡️**\n\n• **Tác hại:** Đọc những lời lăng mạ bôi nhọ độc hại sẽ làm em hoảng sợ, stress, mất ngủ và trầm cảm kéo dài.\n• **3 Bước hiệp sĩ Thỏ ngọc hướng dẫn:**\n  1. **Không đôi co cãi nhau:** Càng đáp trả kẻ bắt nạt càng hả hê trêu chọc.\n  2. **Chụp ảnh màn hình làm bằng chứng:** Lưu lại tất cả tin nhắn và bài đăng xúc phạm.\n  3. **Chặn nick (Block) và báo cáo:** Chia sẻ ngay bằng chứng với bố mẹ, thầy cô chủ nhiệm để nhà trường can thiệp xử lý kỷ luật bạn kia!"
  },
  {
    "id": "share_house_address_online",
    "category": "cyber_safety",
    "badge": "",
    "keywords": [
      "đăng địa chỉ nhà lên mạng xã hội",
      "chụp ảnh khoe vé máy bay thời khóa biểu",
      "chia sẻ vị trí nhà trên tiktok",
      "đăng số điện thoại lên facebook",
      "khoe nhà vắng người lên mạng"
    ],
    "response": "**Khoe địa chỉ nhà và lịch trình lên mạng là 'mời trộm vào nhà' đấy! 🏠📍⚠️**\n\n• **Nguyên nhân:** Kẻ trộm, kẻ bắt cóc thường theo dõi các bài đăng công khai của học sinh để biết địa chỉ nhà, trường học và giờ giấc bố mẹ em vắng nhà.\n• **Tác hại:** Em có thể bị kẻ xấu phục kích bắt cóc trên đường đi học hoặc đột nhập vào nhà ăn trộm tài sản khi nhà vắng người!\n👉 Giữ bí mật thông tin cá nhân: Không bao giờ đăng số nhà, số điện thoại, tên trường lớp hay vé máy bay lên mạng!"
  },

  // ==========================================================================
  // NHÓM 3: ĐỘC CHẤT CỔNG TRƯỜNG & THÓI QUEN ĐỘC HẠI
  // ==========================================================================
  {
    "id": "vape_electronic_cigarette_fruit",
    "category": "health",
    "badge": "",
    "keywords": [
      "thuốc lá điện tử có hại không",
      "hút thử pod vị dâu",
      "vape hương hoa quả có nghiện không",
      "hut thu thuoc la dien tu cho ngau",
      "bạn rủ hút pod chill"
    ],
    "response": "**Thuốc lá điện tử núp bóng kẹo ngọt là 'cơn ác mộng đầu độc phổi'! 🍓💨☠️🚫**\n\n• **Nguyên nhân:** Dù có mùi thơm như kẹo hoa quả, tinh dầu thuốc lá điện tử chứa chất Nicotine cực độc gây nghiện não bộ và hàng trăm kim loại nặng (chì, niken).\n• **Tác hại:** Làm teo tế bào não học sinh, gây tổn thương phổi cấp tính (hội chứng EVALI) ho khạc ra máu, suy hô hấp khó thở và suy tim sớm!\n👉 Hãy dũng cảm từ chối: Hút khói độc không hề ngầu, giữ cho lá phổi trong lành mới là người thông minh!"
  },
  {
    "id": "laughing_gas_balloon_danger",
    "category": "health",
    "badge": "",
    "keywords": [
      "hít bóng cười có sao không",
      "hít bóng cười cho vui",
      "bóng cười có độc không",
      "bóng cười làm liệt chân",
      "bạn rủ thổi bóng cười"
    ],
    "response": "**Bóng cười không hề vui, nó giết chết dây thần kinh của em từng giây! 🎈😵💀**\n\n• **Nguyên nhân:** Khí trong bóng cười là Dinitơ oxit (N2O) - khí gây mê y tế. Hít vào sẽ cắt đứt tức khắc ô-xy lên não, tạo ảo giác đờ đẫn bật cười mất kiểm soát.\n• **Tác hại:** Khí này phá hủy tủy sống làm **tê liệt 2 chân vĩnh viễn không đi lại được**, teo não, mất trí nhớ và có thể ngừng tim đột tử ngay khi đang ôm quả bóng!\n👉 Tuyệt đối không thử dù chỉ một hơi, tránh xa những nơi tụ tập hút bóng cười!"
  },
  {
    "id": "street_food_coloring_stomach",
    "category": "health",
    "badge": "",
    "keywords": [
      "ăn đồ ăn vặt xanh đỏ cổng trường",
      "ăn que cay cổng trường bị đau bụng",
      "thịt bò khô giá rẻ cổng trường",
      "ăn vặt không rõ nguồn gốc",
      "bị ngộ độc đồ ăn cổng trường"
    ],
    "response": "**Đồ ăn vặt cay nồng xanh đỏ không rõ nguồn gốc là 'kho hóa chất' độc hại! 🌶️🤢⚠️**\n\n• **Nguyên nhân:** Các que cay, thịt hổ, xúc xích siêu rẻ ở gánh hàng rong thường làm từ mỡ ôi thiu, tẩm phẩm màu công nghiệp và đường hóa học vượt ngưỡng hàng trăm lần.\n• **Tác hại:** Phá hủy niêm mạc dạ dày gây viêm loét, tiêu chảy cấp mất nước nhập viện và tích tụ hóa chất gây ung thư gan thận.\n👉 Đói bụng: Hãy ăn bánh mì, sữa tươi có nhãn mác rõ ràng được bố mẹ chuẩn bị từ nhà nhé!"
  },
  {
    "id": "pearl_milk_tea_choking",
    "category": "health",
    "badge": "",
    "keywords": [
      "hút trân châu trà sữa bị sặc",
      "hóc hạt trân châu",
      "hut manh tran chau sac vao phoi",
      "uống trà sữa bị nghẹn hạt",
      "sặc hạt trà sữa nghẹt thở"
    ],
    "response": "**Hút ống hút trà sữa thật mạnh có thể làm hạt trân châu bắn thẳng vào phổi! 🧋🫁😱**\n\n• **Nguyên nhân:** Dùng ống hút to hút rột một hơi thật mạnh, lực hút không khí quá đà sẽ làm viên trân châu dẻo quánh bay thẳng qua nắp thanh quản rơi tọt vào khí quản.\n• **Tác hại:** Viên trân châu dính chặt làm tắc hoàn toàn đường thở, nạn nhân nghẹt thở tím tái và ngừng thở tử vong chỉ sau 3 phút!\n👉 **Cách uống an toàn:** Cắn nhỏ nhai kỹ từng hạt, không vừa chạy nhảy vừa hút trà sữa, không đùa giỡn cười to khi đang ngậm trân châu trong miệng!"
  },

  // ==========================================================================
  // NHÓM 4: THIÊN TAI TRƯỜNG HỌC & SƠ CỨU THƯỜNG GẶP
  // ==========================================================================
  {
    "id": "earthquake_at_school_desk",
    "category": "injury",
    "badge": "",
    "keywords": [
      "động đất ở trường học trốn ở đâu",
      "lớp học bị rung lắc chạy đi đâu",
      "dong dat trong lop hoc",
      "quy tắc tam giác sự sống động đất",
      "cách trốn khi có động đất"
    ],
    "response": "**Động đất rung lắc: Tuyệt đối không chạy ùa ra cầu thang chen lấn! 🏫💥🪑**\n\n• **Nguyên nhân:** Chen lấn xô đẩy ở cầu thang sẽ làm giẫm đạp lên nhau chết ngạt, và gạch đá trên trần nhà sẽ rơi thẳng trúng đầu em.\n• **Quy tắc vàng D.C.H (Drop - Cover - Hold on):**\n  1. **DROP (Hạ thấp):** Ngồi xổm ngay dưới gầm bàn học vững chắc.\n  2. **COVER (Che chắn):** Lấy cặp sách hoặc hai cánh tay ôm che kín đầu và gáy.\n  3. **HOLD ON (Giữ chặt):** Nắm chặt chân bàn học cho đến khi mặt đất hết rung lắc rồi mới theo sự hướng dẫn của thầy cô sơ tán ra sân trường trống!"
  },
  {
    "id": "heatstroke_fainting_hot_sun",
    "category": "health",
    "badge": "",
    "keywords": [
      "đá bóng giữa trưa nắng bị ngất",
      "chơi thể thao nắng gắt say nắng",
      "bị say nắng làm sao",
      "tại sao say nắng nguy hiểm",
      "triệu chứng sốc nhiệt say nắng"
    ],
    "response": "**Đá bóng giữa trưa nắng 40 độ có thể làm 'nấu chín' tế bào não (Sốc nhiệt)! ☀️⚽🥵**\n\n• **Nguyên nhân:** Vận động mạnh dưới nắng gắt khiến cơ thể mất nước quá nhanh qua mồ hôi, bộ phận điều hòa nhiệt của não bị tê liệt, thân nhiệt vọt lên trên 40 độ C.\n• **Tác hại:** Mặt đỏ bừng, co giật, hôn mê ngất xỉu và có thể tử vong do tổn thương đa tạng nếu không hạ sốt kịp thời.\n👉 Thấy bạn hoa mắt ngất xỉu vì nắng: Kéo bạn vào ngay **bóng râm mát**, nới lỏng cổ áo, chườm khăn mát vào trán, nách, bẹn và cho uống từng ngụm nước mát pha chút muối!"
  },
  {
    "id": "finger_caught_in_door_crack",
    "category": "injury",
    "badge": "",
    "keywords": [
      "kẹt ngón tay vào khe cửa bản lề",
      "bị dập móng tay do cửa kẹp",
      "ket tay vao cua lop hoc",
      "cửa gió thổi kẹp tay chảy máu",
      "sơ cứu khi bị kẹp cửa dập tay"
    ],
    "response": "**Kẹt tay vào khe bản lề cửa có lực nghiến nát vụn đốt ngón tay! 🚪🩸✋**\n\n• **Nguyên nhân:** Khe bản lề cửa hoạt động như một chiếc đòn bẩy kìm cộng lực. Gió thổi mạnh đóng sập cửa lại sẽ nghiến với lực hàng trăm kilôgam vào ngón tay em.\n• **Tác hại:** Dập nát thịt, bong bật móng tay và gãy vụn xương đốt ngón tay.\n👉 **Cách sơ cứu ngay lập tức:**\n  1. Chườm ngay đá lạnh bọc khăn lên vết thương để giảm phù nề và cầm máu.\n  2. Giơ ngón tay cao hơn tim để bớt sưng đau.\n  3. Báo thầy cô hoặc bố mẹ đưa đi chụp X-quang kiểm tra xương ngay!"
  },
{
    "id": "play_fun_and_stay_safe_rule",
    "category": "quick",
    "badge": "",
    "keywords": [
      "làm sao để chơi vui mà vẫn an toàn",
      "lam sao de choi vui ma van an toan",
      "chơi thế nào cho an toàn",
      "bí quyết chơi vui không bị thương",
      "quy tắc chơi an toàn cho học sinh",
      "vui chơi an toàn nhớ gì"
    ],
    "response": "**Bí kíp 3 chữ VÀNG của Hiệp sĩ Thỏ ngọc để 'Chơi cực vui mà vẫn siêu an toàn': 🛡️✨🎮**\n\n1. **QUAN SÁT TRƯỚC (Nhìn quanh 5 giây):** Trước khi chơi, hãy ngó xem có hố sâu, dây điện hở, mảnh kính vỡ hay xe cộ đang lao tới không.\n2. **CHỌN CHỖ ĐÚNG:** Chơi thể thao vào sân bóng; bơi lội vào bể bơi có cứu hộ; chạy nhảy ở sân bằng phẳng, tránh xa mép sông, mép ao, ban công!\n3. **BIẾT ĐIỂM DỪNG:** Đang chơi mà thấy mệt, trời chuyển dông sét, hoặc bạn bè rủ chơi trò mạo hiểm thì kiên quyết **NÓI KHÔNG** và rủ bạn chơi trò khác an toàn hơn nhé!"
  },
  {
    "id": "boiling_water_spilled_on_clothes",
    "category": "injury",
    "badge": "",
    "keywords": [
      "nước sôi đổ vào quần áo phải làm sao",
      "em phải làm gì khi bị đổ nước nóng vào người",
      "bị bỏng nước canh vào áo",
      "do nuoc soi vao quan ao",
      "nước sôi dính vào quần áo cởi ra hay để nguyên"
    ],
    "response": "**Khi bị nước sôi đổ ướt sũng quần áo, em hãy làm ngay 3 bước sau:** 💧🩹⚠️\n\n1. **XẢ NƯỚC MÁT LÊN CẢ QUẦN ÁO NGAY LẬP TỨC:** Xả nhẹ vòi nước mát sạch trực tiếp lên chỗ vải đang ướt nước sôi để hạ nhiệt cấp tốc.\n2. **TUYỆT ĐỐI KHÔNG GIẬT PHẮNG ÁO RA:** Giật áo vội vàng sẽ lột phăng luôn cả mảng da thịt đang dính chặt vào vải! Hãy dùng kéo nhẹ nhàng cắt rời phần vải xung quanh vết bỏng.\n3. Ngâm tiếp vùng da bỏng trong nước mát 15 - 20 phút rồi nhờ bố mẹ đưa ngay đến cơ sở y tế!"
  },
  {
    "id": "rescue_friend_electric_shock_safe",
    "category": "electric",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "thấy bạn bị điện giật em phải làm gì",
      "bạn bị dính vào dây điện cứu thế nào",
      "thay ban bi dien giat lam sao",
      "cách cứu người bị điện giật",
      "có được chạm vào người bị điện giật không"
    ],
    "response": "**TUYỆT ĐỐI KHÔNG ĐƯỢC CHẠM TAY VÀO BẠN ĐANG BỊ ĐIỆN GIẬT! ⚡🚫🛑**\n\n• Cơ thể bạn lúc này đang mang điện, em chạm vào là bị giật dính theo ngay lập tức!\n• **3 Bước cứu bạn chuẩn xác:**\n  1. **Hô to báo người lớn:** Hét thật to *'Có người bị điện giật, ngắt cầu dao ngay!'*.\n  2. **Ngắt nguồn điện:** Nếu ở gần cầu dao/aptomat an toàn, lập tức gạt cầu dao xuống.\n  3. **Tách nguồn điện bằng vật KHÔ:** Dùng một cây gậy gỗ khô, chổi nhựa khô gạt mạnh sợi dây điện ra khỏi người bạn (tuyệt đối không dùng gậy kim loại hay que ướt) rồi gọi ngay **115**!"
  },
  {
    "id": "how_to_swim_without_cramps",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "làm sao để bơi không bị chuột rút",
      "lam sao de boi khong bi chuot rut",
      "cách phòng tránh chuột rút khi đi bơi",
      "bơi thế nào để không bị co chân",
      "chuẩn bị gì trước khi bơi để không chuột rút"
    ],
    "response": "**Để thỏa sức bơi lội mà không sợ bị 'con chuột rút' ghé thăm:** 🏊‍♂️🛡️💪\n\n1. **Khởi động kỹ 10 - 15 phút trên cạn:** Xoay tròn các khớp cổ chân, cổ tay, khớp gối và kéo căng cơ bắp chuối đùi trước khi xuống nước.\n2. **Uống một cốc nước lọc:** Uống nước trước khi bơi để cơ bắp không bị thiếu nước và khoáng chất.\n3. **Tưới nước làm quen:** Trước khi nhảy xuống, hãy vục nước xoa lên ngực, gáy và chân tay để cơ thể không bị sốc nhiệt trước nước lạnh.\n4. **Không bơi khi đang quá đói, quá no hoặc vừa chạy nhảy kiệt sức!**"
  },

  // ==========================================================================
  // NHÓM 2: TAI NẠN THƯƠNG TÍCH & SƠ CỨU HỌC ĐƯỜNG
  // ==========================================================================
  {
    "id": "cut_finger_heavy_bleeding_action",
    "category": "injury",
    "badge": "",
    "keywords": [
      "em phải làm gì khi bị đứt tay chảy nhiều máu",
      "bị đứt tay chảy máu đầm đìa",
      "dut tay chay mau phai lam sao",
      "cách cầm máu khi bị đứt tay",
      "chảy máu tay lấy gì bịt"
    ],
    "response": "**Khi bị đứt tay chảy nhiều máu, bình tĩnh làm đúng 3 bước:** 🩸🩹✋\n\n1. **ÉP CHẶT TRỰC TIẾP:** Lấy một miếng gạc sạch, khăn tay sạch hoặc vạt áo sạch ấn đè thật chặt trực tiếp lên miệng vết thương trong 5 - 10 phút (không mở ra xem liên tục).\n2. **GIƠ TAY CAO HƠN TIM:** Giơ bàn tay bị đứt lên cao hơn ngực để giảm áp lực máu chảy về vết thương.\n3. Nếu máu thấm ướt khăn: Không gỡ khăn cũ ra mà đặt thêm một lớp khăn sạch khác đè chặt lên tiếp và báo ngay thầy cô, bố mẹ đưa đi băng bó!"
  },
  {
    "id": "friend_broken_bone_fall_action",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bạn bị ngã gãy tay em phải làm sao",
      "thấy bạn ngã không đứng dậy được",
      "bạn ngã gãy chân làm gì",
      "sơ cứu bạn bị gãy xương",
      "có được bế bạn bị gãy chân không"
    ],
    "response": "**Khi thấy bạn ngã từ trên cao xuống nghi bị gãy xương: TUYỆT ĐỐI KHÔNG BẾ HAY KÉO BẠN DẬY! 🦴🤕🛑**\n\n1. **Bảo bạn nằm yên:** Động viên bạn nằm nguyên vị trí, không cử động cánh tay hoặc cẳng chân đang đau nhức.\n2. **Không nắn bóp:** Không tự ý bẻ, kéo nắn hay xoa dầu nóng vì sẽ làm xương gãy đâm rách mạch máu và cơ bắp bên trong.\n3. **Hô to gọi thầy cô giáo y tế học đường:** Để người lớn dùng nẹp cố định cánh tay/chân bị gãy trước khi di chuyển bạn đến bệnh viện!"
  },
  {
    "id": "nosebleed_in_classroom_action",
    "category": "injury",
    "badge": "",
    "keywords": [
      "em phải làm gì khi bị chảy máu cam trong lớp",
      "đang học bị chảy máu mũi làm sao",
      "chay mau cam trong gio hoc",
      "bị chảy máu cam ở trường",
      "cách xử lý chảy máu cam nhanh"
    ],
    "response": "**Đang ngồi học mà bị chảy máu cam bất ngờ, em hãy làm ngay:** 👃🩸🎒\n\n1. **Hơi cúi đầu về phía trước:** (Tuyệt đối không ngửa cổ ra sau kẻo máu chảy ngược vào họng gây sặc nôn mửa).\n2. **Bóp chặt hai cánh mũi:** Dùng ngón cái và ngón trỏ bóp chặt hai bên cánh mũi mềm lại, thở đều bằng miệng trong 10 phút.\n3. Giơ tay xin phép thầy cô ra phòng y tế để được các cô y tá chườm khăn mát lên sống mũi giúp cầm máu hoàn toàn nhé!"
  },
  {
    "id": "friend_head_injury_unconscious",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bạn ngã đập đầu bất tỉnh em phải làm sao",
      "thấy bạn ngã đập đầu ngất xỉu",
      "bạn đập đầu nằm im gọi không thưa",
      "so cuu ban dap dau ngat",
      "bạn bị ngất ở sân trường"
    ],
    "response": "**Khi thấy bạn đập đầu xuống đất và nằm im bất tỉnh nhân sự:** 🚑🤕⚠️\n\n1. **Hô thật to:** *'Có bạn bị ngất, các bạn gọi thầy cô và phòng y tế nhanh lên!'*.\n2. **Không lắc mạnh hay đỡ bạn ngồi dậy:** Nếu cổ bạn bị tổn thương, việc xốc bế bạn có thể làm liệt tủy sống cổ!\n3. Quan sát xem bạn còn thở không. Nếu bạn nôn ói, nhẹ nhàng nghiêng cả người bạn sang một bên (tư thế nằm nghiêng an toàn) để đờm nhớt không làm tắc đường thở của bạn!"
  },
  {
    "id": "broken_glass_cup_on_floor_action",
    "category": "injury",
    "badge": "",
    "keywords": [
      "lỡ làm vỡ cốc thủy tinh trên sàn phải làm sao",
      "em làm vỡ bát đĩa làm gì",
      "vo coc thuy tinh tren san nha",
      "dọn mảnh chai vỡ thế nào cho an toàn",
      "cốc vỡ có lấy tay nhặt không"
    ],
    "response": "**Lỡ tay làm rơi vỡ cốc thủy tinh, bình tĩnh xử lý siêu an toàn theo các bước:** 🥛💥🧹\n\n1. **Đứng yên và hô to:** Nhắc các bạn xung quanh: *'Cẩn thận có thủy tinh vỡ, đừng ai chạy lại đây!'*.\n2. **Đi dép vào chân ngay:** Tuyệt đối không đi chân đất quanh khu vực có mảnh vỡ.\n3. **Không lấy tay nhặt mảnh vụn nhỏ:** Nhờ người lớn hoặc dùng chổi quét gom vào hót rác, sau đó dùng khăn ướt hoặc băng dính chấm lên sàn để hút sạch các vụn thủy tinh li ti tàng hình nhé!"
  },

  // ==========================================================================
  // NHÓM 3: KHẨN CẤP CHÁY NỔ, KHÍ ĐỘC & Ở NHÀ MỘT MÌNH
  // ==========================================================================
  {
    "id": "smell_gas_leak_in_kitchen",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "ngửi thấy mùi gas nồng nặc phải làm sao",
      "ngui thay mui ga trong nha lam gi",
      "nhà bị rò rỉ gas phải làm gì",
      "mùi ga bốc lên có được bật điện không",
      "rò rỉ khí gas trong bếp"
    ],
    "response": "**Ngửi thấy mùi gas nồng nặc: TUYỆT ĐỐI CẤM BẬT CÔNG TẮC ĐIỆN HAY BẬT LỬA! 🛑🦨💥**\n\n• Chỉ một tia lửa điện nhỏ xíu từ công tắc đèn cũng có thể kích nổ cả căn nhà!\n• **4 Bước sống còn:**\n  1. Lấy khăn che kín mũi miệng, không bật/tắt bất kỳ thiết bị điện nào.\n  2. Nhẹ nhàng mở toang tất cả các cửa sổ, cửa ra vào để gió lùa khí gas ra ngoài.\n  3. Nếu biết vị trí van bình gas, nhanh tay khóa van lại.\n  4. Chạy ra ngoài đường thoáng khí và gọi ngay người lớn hoặc số **114**!"
  },
  {
    "id": "spot_black_smoke_in_house",
    "category": "fire",
    "badge": "assets/illust_electric.png",
    "keywords": [
      "thấy khói đen bốc lên trong nhà em phải làm sao",
      "nhìn thấy khói đen làm gì",
      "thay khoi den trong nha",
      "phát hiện đám cháy trong nhà làm gì",
      "khói bốc lên từ phòng bên cạnh"
    ],
    "response": "**Thấy khói đen bốc lên trong nhà: Thoát hiểm ngay, không tiếc đồ đạc! 🏃‍♂️💨🧯**\n\n1. **Hô to báo động:** Hét thật lớn: *'CHÁY RỒI! CHÁY RỒI! BÀ CON ƠI CHÁY!'* để cả nhà cùng biết.\n2. **Che mũi miệng:** Lấy ngay chiếc khăn, khẩu trang hoặc vạt áo nhúng đẫm nước bịt chặt mũi miệng.\n3. **Hạ thấp người bò sát sàn nhà:** Men theo chân tường di chuyển nhanh nhất ra phía cửa chính thoát hiểm.\n4. Ra đến nơi an toàn lập tức nhờ người lớn bấm số **114** gọi các chú lính cứu hỏa!"
  },
  {
    "id": "stay_safe_home_alone_rules",
    "category": "quick",
    "badge": "",
    "keywords": [
      "làm sao để an toàn khi ở nhà một mình",
      "lam sao de an toan khi o nha mot minh",
      "bố mẹ vắng nhà em cần nhớ gì",
      "ở nhà một mình không sợ hãi",
      "quy tắc an toàn khi ở nhà một mình"
    ],
    "response": "**Bí kíp hiệp sĩ để luôn an toàn và tự tin khi ở nhà một mình: 🏠🛡️✨**\n\n1. **Khóa chặt cửa chính và cửa sổ:** Luôn gài chốt an toàn ngay sau khi bố mẹ ra ngoài.\n2. **Quy tắc 'Cửa đóng then cài':** Tuyệt đối không mở cửa cho bất kỳ người lạ nào (thợ sửa máy, người giao hàng, người xưng quen bố mẹ).\n3. **Không nghịch đồ nguy hiểm:** Không tự ý bật bếp gas, không nghịch dao kéo, không trèo lan can cửa sổ.\n4. **Ghi nhớ số điện thoại:** Thuộc lòng số của bố mẹ, người thân gần nhà và số khẩn cấp **111, 113, 114, 115**!"
  },
  {
    "id": "trapped_in_dark_stalled_elevator",
    "category": "injury",
    "badge": "",
    "keywords": [
      "thang máy đột ngột dừng lại mất điện em phải làm sao",
      "bị kẹt trong thang máy tối om làm gì",
      "ket thang may toi om phai lam sao",
      "thang máy bị kẹt có ngạt thở không",
      "làm sao khi thang máy đứng im"
    ],
    "response": "**Bị kẹt trong thang máy mất điện: ĐỪNG HOẢNG SỢ, không bị ngạt thở đâu! 🏢🛗⚠️**\n\n• Thang máy luôn có các khe thông khí vô hình, em hoàn toàn không lo bị thiếu ô-xy!\n• **Các bước thoát hiểm bình tĩnh:**\n  1. **Không cạy cửa hay nhảy nhót:** Cạy cửa rất nguy hiểm vì thang có thể nằm giữa 2 tầng lầu.\n  2. **Bấm nút gọi khẩn cấp:** Tìm nút có hình **chiếc chuông 🔔 hoặc chiếc điện thoại 📞** trên bảng điều khiển và bấm giữ liên tục để báo cho bảo vệ.\n  3. Đập nhẹ vào cửa và hô to: *'Có người kẹt trong thang máy, giúp cháu với!'*, sau đó ngồi tựa lưng vào vách chờ người đến cứu!"
  },

  // ==========================================================================
  // NHÓM 4: GIAO THÔNG, ĐƯỜNG PHỐ & LẠC ĐƯỜNG
  // ==========================================================================
  {
    "id": "lost_in_crowd_supermarket_action",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "em phải làm gì khi bị lạc bố mẹ ở siêu thị",
      "bị lạc ở chỗ đông người làm sao",
      "bi lac bo me o sieu thi",
      "bị lạc đường tìm ai giúp",
      "lạc ở công viên tìm ai"
    ],
    "response": "**Bị lạc bố mẹ ở siêu thị hay chỗ đông người: DỪNG LẠI và tìm đúng 3 người này! 🏬👨‍👩‍👧🛑**\n\n1. **ĐỨNG YÊN TẠI CHỖ:** Tuyệt đối không chạy lung tung tìm kiếm vì sẽ càng lạc xa hơn.\n2. **Tìm người giúp đỡ đáng tin cậy nhất:**\n   • **Chú công an / Cảnh sát giao thông** mặc quân phục.\n   • **Cô thu ngân / Chú bảo vệ siêu thị** mặc đồng phục và đeo bảng tên.\n   • **Một người mẹ đang dắt theo các bạn nhỏ** đi cùng.\n3. Đọc to số điện thoại của bố mẹ để nhờ gọi điện hoặc nhờ phát loa thông báo toàn siêu thị nhé!"
  },
  {
    "id": "stranger_stalking_following_home",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "có người lạ bám theo em trên đường phải làm sao",
      "thấy có người đi theo sau em",
      "người lạ theo dõi trên đường đi học",
      "bi nguoi la bam theo phai lam gi",
      "người lạ đi sau lưng em"
    ],
    "response": "**Phát hiện có người lạ đi theo bám đuôi em: Lập tức làm 3 bước này! 🚶‍♂️👀🚨**\n\n1. **KHÔNG ĐI VÀO NGÕ VẮNG HOẶC ĐI THẲNG VỀ NHÀ:** (Nếu về nhà kẻ xấu sẽ biết nhà em đang vắng người).\n2. **BƯỚC NHANH VÀO NƠI ĐÔNG NGƯỜI NHẤT:** Rẽ ngay vào một cửa hàng tạp hóa, đồn công an, hiệu thuốc hoặc trường học gần nhất.\n3. Nói to với bác chủ quán: *'Bác ơi giúp cháu với, có người lạ mặt đang bám theo cháu từ nãy đến giờ!'* và nhờ bác gọi bố mẹ đến đón!"
  },
  {
    "id": "cross_busy_intersection_safely",
    "category": "traffic",
    "badge": "assets/illust_traffic.png",
    "keywords": [
      "làm sao để qua đường ở ngã tư đông xe",
      "qua đường ngã tư thế nào cho an toàn",
      "di qua duong o nga tu dong duc",
      "cách qua đường an toàn khi có nhiều ô tô",
      "qua đường đông xe không có đèn giao thông"
    ],
    "response": "**Cách qua đường ở ngã tư đông xe an toàn như một hiệp sĩ tí hon: 🚦🚶‍♂️🚗**\n\n1. **Tìm vạch kẻ đường:** Chỉ qua đường tại đúng vạch kẻ sọc trắng dành cho người đi bộ.\n2. **Quan sát 3 hướng: NHÌN TRÁI - NHÌN PHẢI - NHÌN TRÁI LẦN NỮA:** Đảm bảo xe cộ từ xa đã giảm tốc độ nhường đường.\n3. **GIƠ CAO TAY LÊN TRỜI:** Giơ một cánh tay lên cao ngang đầu suốt quá trình bước đi để các bác tài xế ô tô to dễ dàng nhìn thấy em từ xa.\n4. **Bước đi dứt khoát, không chạy vụt:** Không vừa qua đường vừa cúi gập bấm điện thoại hay đùa giỡn nhé!"
  },

  // ==========================================================================
  // NHÓM 5: ĐỘNG VẬT & MÔI TRƯỜNG NƯỚC NGOÀI TRỜI
  // ==========================================================================
  {
    "id": "chased_by_swarm_of_bees",
    "category": "injury",
    "badge": "",
    "keywords": [
      "bị đàn ong đuổi theo em phải làm gì",
      "bị ong đuổi có nhảy xuống nước không",
      "bi ong duoi phai chay the nao",
      "cách trốn khi bị ong đốt",
      "đàn ong bay theo đốt"
    ],
    "response": "**Bị đàn ong đuổi theo: TUYỆT ĐỐI KHÔNG NHẢY XUỐNG AO HỒ TRỐN! 🐝🏃‍♂️❌**\n\n• **Tại sao không nhảy xuống nước?** Đàn ong sẽ bay lượn ngay trên mặt nước chờ em. Khi em ngoi đầu lên thở, chúng sẽ chích túi bụi vào đầu và mặt làm em ngạt nước chìm luôn!\n• **Cách thoát thân đúng chuẩn:**\n  1. Lấy áo, khăn trùm kín mặt, mắt, mũi và cổ.\n  2. Chạy nhanh theo đường zíc-zắc xuôi theo chiều gió tới chui vào một ngôi nhà kiên cố đóng chặt cửa sổ lại!"
  },
  {
    "id": "action_when_seeing_unfenced_pond",
    "category": "drowning",
    "badge": "assets/illust_drowning.png",
    "keywords": [
      "thấy ao hồ không có rào chắn em phải làm gì",
      "thấy hố nước sâu nguy hiểm phải làm sao",
      "thay ho nuoc sau khong co bien bao",
      "báo cho ai khi thấy ao nguy hiểm",
      "phát hiện chỗ nước sâu gần trường"
    ],
    "response": "**Khi phát hiện ao, hồ, hố công trình sâu hoắm không có rào chắn hay biển báo: 🌊⚠️🚧**\n\n1. **Lùi xa mép nước ít nhất 5 mét:** Tuyệt đối không đứng sát mép bờ chụp ảnh hay ngó nhìn.\n2. **Nhắc nhở bạn bè:** Hét to cảnh báo các bạn nhỏ khác: *'Chỗ này sâu và trơn lắm, không được lại gần chơi đâu nhé!'*.\n3. **Báo cáo ngay cho người lớn:** Kể ngay với bố mẹ, thầy cô giáo hoặc bác tổ trưởng dân phố để người lớn cắm biển cảnh báo và dựng rào chắn bảo vệ mọi người!"
  },
  {
    "id": "protect_eyes_screen_time_online",
    "category": "health",
    "badge": "",
    "keywords": [
      "làm sao để không bị cận khi xem điện thoại",
      "bảo vệ mắt khi học online thế nào",
      "xem ipad nhiều mỏi mắt phải làm sao",
      "quy tắc 20 20 20 bảo vệ mắt",
      "làm sao cho mắt sáng khi dùng máy tính"
    ],
    "response": "**Bí kíp '20 - 20 - 20' của hiệp sĩ Thỏ ngọc để đôi mắt luôn sáng long lanh khi dùng điện thoại, máy tính: 📱👀✨**\n\n• Cứ sau **20 phút** nhìn màn hình học tập hoặc giải trí:\n• Hãy rời mắt nhìn xa ra khoảng cách **20 feet (khoảng 6 mét)**.\n• Giữ tầm nhìn thư giãn trong vòng **20 giây** và chớp mắt nhẹ nhàng vài cái.\n👉 Ngồi học thẳng lưng, giữ màn hình cách mắt tối thiểu 50 cm và tuyệt đối cấm trùm chăn tắt đèn xem điện thoại ban đêm em nhé!"
  },
  {
    "id": "bullied_extorted_money_at_school",
    "category": "body_safety",
    "badge": "",
    "keywords": [
      "em phải làm gì khi bị bạn trấn lột tiền",
      "bị bạn đe dọa đánh ở trường làm sao",
      "bi bat nat o truong phai lam gi",
      "bạn chặn đường đòi tiền ăn vặt",
      "làm sao khi bị bạo lực học đường"
    ],
    "response": "**Khi bị bạn bè bắt nạt, đe dọa hoặc trấn lột tiền: DŨNG CẢM LÊN TIẾNG, không sợ hãi! 🎒🛑🗣️**\n\n1. **Ưu tiên an toàn tính mạng:** Nếu bị bao vây đòi tiền, hãy đưa tiền để bảo vệ thân thể mình không bị đánh, sau đó chạy ngay đến phòng giám thị.\n2. **Không che giấu:** Đừng sợ lời đe dọa *'kể ra tao đánh tiếp'*. Kẻ bắt nạt chỉ bắt nạt được khi em chịu im lặng.\n3. Kể ngay mọi chuyện với thầy cô chủ nhiệm, bố mẹ hoặc gọi đường dây nóng **111**. Thầy cô và nhà trường luôn có biện pháp xử lý kỷ luật và bảo vệ em tuyệt đối an toàn!"
  },

    ];
const keywordAliases = {

    // 1. KHÁI NIỆM ĐUỐI NƯỚC
    drowning_definition: [
        'duoi nuoc la gi',
        'đuối nc là gì',
        'duoi nc la gi',
        'đuối nước là sao',
        'duoi nuoc la sao',
        'thế nào là đuối nc',
        'tn la duoi nuoc'
    ],

    drowning_can_happen_anywhere: [
        'duoi nuoc o dau',
        'đuối nc ở đâu',
        'o dau cung duoi dc a',
        'đuối nước ở nhà được không',
        'duoi o nha dc k'
    ],

    drowning_is_silent: [
        'duoi nuoc co keu dc k',
        'đuối nc có kêu ko',
        'sao duoi nuoc im',
        'đuối nước có la không',
        'duoi co la dc ko'
    ],


    // 2. ĐỊA ĐIỂM NGUY HIỂM
    dangerous_water_places: [
        'cho nao de duoi nuoc',
        'nơi nào nguy hiểm',
        'cho nuoc nguy hiem',
        'khu nao de duoi',
        'ở đâu dễ đuối nc'
    ],

    pond_river_risk: [
        'ao song co nguy hiem k',
        'tắm ao dc k',
        'xuong song dc ko',
        'sông có nguy hiểm ko',
        'ao có sâu ko'
    ],

    well_risk: [
        'gieng co nguy hiem k',
        'ngã giếng',
        'roi xuong gieng',
        'giếng có đuối ko',
        'choi gan gieng'
    ],

    water_container_risk: [
        'chum nuoc co nguy hiem k',
        'xô nước có đuối ko',
        'chau nuoc co sao k',
        'lu nuoc nguy hiem',
        'ít nước có sao ko'
    ],

    construction_water_hole: [
        'ho cong trinh',
        'hố nước công trình',
        'ho dao co nuoc',
        'hố sâu có nước',
        'choi gan ho cong trinh'
    ],


    // 3. ĐI BƠI / TẮM
    three_no_drowning_rule: [
        '3 khong la gi',
        'ba khong duoi nuoc',
        '3 ko phong duoi nuoc',
        'quy tac 3 khong',
        '3 không gồm gì'
    ],

    only_swim_with_adult: [
        'di boi can nguoi lon k',
        'bơi với ai',
        'boi mot minh dc k',
        'ko co nguoi lon boi dc k',
        'tự đi bơi được ko'
    ],

    safe_place_to_swim: [
        'boi o dau an toan',
        'chỗ nào bơi dc',
        'noi boi an toan',
        'bơi chỗ nào',
        'tam o dau an toan'
    ],

    unsafe_place_to_swim: [
        'cho nao ko dc boi',
        'bơi đâu nguy hiểm',
        'noi nao cam boi',
        'chỗ nào ko dc tắm',
        'tam dau nguy hiem'
    ],

    stop_swimming_when_tired: [
        'dang boi bi met',
        'boi met lam sao',
        'mệt có bơi tiếp ko',
        'het suc khi boi',
        'đuối sức khi bơi'
    ],


    // 4. TRẺ BIẾT BƠI NHƯNG CHỦ QUAN
    known_swimmer_overconfidence: [
        'biet boi roi lo gi',
        'bơi giỏi có đuối ko',
        'biet boi co chet duoi k',
        'bơi giỏi có sao ko',
        'em boi gioi'
    ],

    known_swimmer_can_swim_anywhere: [
        'biet boi xuong dau cung dc k',
        'boi gioi xuong song dc k',
        'biết bơi tắm đâu cũng dc à',
        'boi gioi tam ao dc ko',
        'biết bơi xuống hồ được ko'
    ],


    // 5. ĐI BƠI MỘT MÌNH / ĐI VỚI BẠN
    swimming_alone_danger: [
        'boi mot minh co sao k',
        'đi bơi 1 mình',
        'tam song mot minh',
        'tự bơi một mình',
        'mot minh xuong nuoc'
    ],

    swim_with_good_friend_no_adult: [
        'ban boi gioi di cung dc k',
        'đi với bạn biết bơi',
        'ko co nguoi lon co ban dc k',
        'bạn giỏi bơi trông dc ko',
        'di boi voi ban'
    ],


    // 6. KHỞI ĐỘNG - ĂN UỐNG - MỆT
    no_warmup_before_swimming: [
        'ko khoi dong boi dc k',
        'không khởi động có sao ko',
        'boi luon dc k',
        'xuong nuoc luon',
        'bơi ko khởi động'
    ],

    swimming_after_full_meal: [
        'an no boi dc k',
        'ăn xong đi bơi',
        'vua an xong boi',
        'ăn no tắm được ko',
        'ăn rồi xuống nước'
    ],

    eating_while_swimming: [
        'vua boi vua an',
        'ăn khi đang bơi',
        'an duoi ho boi',
        'bơi ăn đồ ăn dc k',
        'uống khi bơi'
    ],


    // 7. MƯA - GIÔNG - SÉT
    swimming_in_rain: [
        'mua co boi dc k',
        'trời mưa bơi dc ko',
        'mua boi dc ko',
        'đang mưa tắm được không',
        'mưa nhỏ bơi dc k'
    ],

    swimming_when_lightning: [
        'set co boi dc k',
        'sấm sét bơi dc ko',
        'co set boi dc k',
        'trời sét xuống nước',
        'sét có xuống hồ dc k'
    ],

    weather_changes_while_swimming: [
        'dang boi troi mua',
        'bơi gặp mưa',
        'dang boi co sam',
        'đang bơi giông tới',
        'mưa giữa lúc bơi'
    ],

    storm_on_way_home: [
        'di hoc ve gap mua',
        'tan hoc gap giong',
        'đường về bị ngập',
        'mưa ko về dc',
        'đi học về gặp lũ'
    ],


    // 8. NƯỚC LŨ - ĐƯỜNG NGẬP
    do_not_enter_flood_water: [
        'loi nuoc lu dc k',
        'đi qua nước ngập dc ko',
        'nuoc ngap di dc k',
        'lội đường ngập',
        'đi vào nước lũ'
    ],

    open_manhole_flood_risk: [
        'ho ga ngap',
        'cống mất nắp',
        'ho ga mat nap',
        'hố ga dưới nước',
        'đường ngập có cống'
    ],

    electric_shock_flood_water: [
        'nuoc ngap co dien k',
        'điện trong nước',
        'dien giat nuoc ngap',
        'dây điện rơi xuống nước',
        'nước lũ có điện ko'
    ],


    // 9. ÁO PHAO
    life_jacket_on_boat: [
        'di thuyen co can ao phao k',
        'đi tàu mặc phao ko',
        'len ghe co mac phao',
        'đi xuồng cần áo phao',
        'tàu có phải mặc phao'
    ],

    life_jacket_correct_size: [
        'ao phao vua ko',
        'phao rộng có sao',
        'ao phao rong',
        'phao nhỏ dc k',
        'áo phao đúng cỡ'
    ],

    life_jacket_allows_anywhere: [
        'co ao phao xuong dau cung dc k',
        'có phao khỏi sợ à',
        'mac phao boi song dc k',
        'phao là an toàn tuyệt đối à',
        'có phao đi một mình dc ko'
    ],


    // 10. GIAO THÔNG ĐƯỜNG THỦY
    water_transport_safety_general: [
        'di thuyen sao an toan',
        'đi ghe cần nhớ gì',
        'di tau tren song',
        'đi đò an toàn',
        'đi xuồng cần làm gì'
    ],

    overloaded_boat_risk: [
        'thuyen dong nguoi',
        'ghe qua tai',
        'tàu chở đông có sao',
        'thuyền quá tải',
        'đò đông người'
    ],

    do_not_play_on_boat: [
        'choi tren thuyen dc k',
        'đùa trên tàu',
        'chạy trên ghe',
        'nghịch trên thuyền',
        'đi tàu chơi đùa'
    ],

    boat_accident_what_to_do: [
        'thuyen gap nan lam sao',
        'tàu gặp sự cố',
        'ghe bi lat lam gi',
        'đò gặp nạn',
        'tai nạn tàu làm sao'
    ],


    // 11. CHUỘT RÚT
    swimming_cramp_definition: [
        'chuot rut la gi',
        'chuột rút khi bơi',
        'bi co rut',
        'đang bơi bị chuột rút',
        'co chan khi boi'
    ],

    cramp_while_swimming_first_action: [
        'chuot rut lam sao',
        'bi chuot rut khi boi',
        'co rut duoi nuoc',
        'đang bơi co chân',
        'chuột rút xử lý sao'
    ],

    do_not_struggle_cramp: [
        'chuot rut co vung vay k',
        'co rut co dap manh k',
        'chuột rút có quẫy ko',
        'bị co chân có cố bơi ko'
    ],


    // 12. DÒNG CHẢY XA BỜ
    rip_current_definition: [
        'dong rut la gi',
        'dong chay xa bo',
        'rip current la gi',
        'nước kéo ra biển',
        'dòng rút xa bờ'
    ],

    rip_current_signs: [
        'nhan biet dong rut',
        'dấu hiệu dòng rút',
        'lam sao biet dong rut',
        'chỗ biển nào có dòng rút',
        'nước biển kéo ra'
    ],

    rip_current_caught_first_action: [
        'bi dong rut lam sao',
        'bị kéo ra xa bờ',
        'nuoc keo ra bien',
        'bị dòng biển cuốn',
        'dòng rút xử lý sao'
    ],

    rip_current_do_not_swim_against: [
        'boi nguoc dong dc k',
        'bơi thẳng vào bờ dc ko',
        'dòng rút có bơi ngược ko',
        'cố bơi vào bờ',
        'bơi chống dòng'
    ],


    // 13. NƯỚC XOÁY - NƯỚC XIẾT
    water_whirlpool_definition: [
        'nuoc xoay la gi',
        'xoay nuoc la sao',
        'vong xoay nuoc',
        'nước xoáy',
        'dòng xoáy'
    ],

    whirlpool_first_action: [
        'bi nuoc xoay lam sao',
        'gap xoay nuoc',
        'nước xoáy xử lý sao',
        'bi xoay hut',
        'rơi vào xoáy'
    ],

    fast_current_definition: [
        'nuoc xiet la gi',
        'dong xiet',
        'nước chảy mạnh',
        'dòng chảy xiết',
        'nước xiết'
    ],

    do_not_swim_fast_current: [
        'nuoc xiet boi dc k',
        'bơi dòng xiết',
        'nước chảy mạnh tắm dc ko',
        'xuong nuoc xiet',
        'bơi chỗ nước mạnh'
    ],


    // 14. BẤT NGỜ RƠI XUỐNG NƯỚC - TỰ CỨU
    fall_into_water_general: [
        'roi xuong nuoc',
        'rơi xuống nc',
        'nga xuong nuoc',
        'ngã hồ',
        'roi song',
        'lỡ rơi xuống nước'
    ],

    first_thing_when_falling_water: [
        'roi nuoc lam gi',
        'ngã xuống nước làm sao',
        'roi xuong ho lam gi',
        'bị rơi nước phải làm gì',
        'rớt nước làm sao'
    ],

    back_float_self_rescue: [
        'noi ngua sao',
        'nổi ngửa tự cứu',
        'nam ngua duoi nuoc',
        'nổi ngửa khi rơi',
        'cach noi ngua'
    ],

    tread_water_self_rescue: [
        'dung nuoc sao',
        'đứng nước là gì',
        'cach dung nuoc',
        'đứng nước tự cứu',
        'đạp nước sao'
    ],

    call_for_help_falling_water: [
        'roi nuoc keu sao',
        'keu cuu the nao',
        'rơi xuống nước gọi ai',
        'bị rơi hồ kêu cứu',
        'cứu với'
    ],


    // 15. THẤY BẠN BỊ ĐUỐI
    see_drowning_person_general: [
        'ban bi duoi',
        'thấy bạn chìm',
        'ban roi xuong nuoc',
        'nguoi bi duoi lam sao',
        'thấy người đuối'
    ],

    do_not_jump_rescue: [
        'nhay xuong cuu dc k',
        'có nên nhảy cứu bạn',
        'boi ra cuu ban',
        'lao xuong cuu',
        'xuống nước cứu được ko'
    ],

    rescue_from_shore_general: [
        'cuu ban tren bo',
        'cứu người ko xuống nước',
        'cach cuu an toan',
        'cứu từ bờ',
        'giúp bạn bị đuối sao'
    ],

    rescue_with_stick: [
        'dung gay cuu ban',
        'cứu bằng cây',
        'dua sao cuu',
        'gậy cứu người',
        'cành cây cứu bạn'
    ],

    rescue_with_rope: [
        'dung day cuu',
        'ném dây cứu',
        'quang day',
        'dây cứu người',
        'kéo bạn bằng dây'
    ],

    throw_lifebuoy: [
        'nem phao cuu',
        'quăng phao',
        'ném áo phao',
        'phao cứu bạn',
        'ném phao xuống'
    ],

    throw_floating_object: [
        'nem vat noi',
        'can nhua cuu nguoi',
        'thùng nhựa cứu bạn',
        'bóng cứu người',
        'ném chai cứu'
    ],


    // 16. SƠ CẤP CỨU
    after_drowning_rescue_general: [
        'cuu len bo roi sao',
        'vớt lên rồi làm gì',
        'len bo lam gi',
        'sau khi cứu người',
        'người đuối lên bờ'
    ],

    drowning_person_not_breathing: [
        'cuu len ko tho',
        'người đuối không thở',
        'nan nhan ngung tho',
        'ko thấy thở',
        'bất tỉnh không thở'
    ],

    call_115_drowning: [
        'goi 115 luc nao',
        'duoi nuoc goi so may',
        'cấp cứu đuối nước số mấy',
        'goi cap cuu',
        '115 duoi nuoc'
    ],

    cpr_definition_simple: [
        'cpr la gi',
        'CPR là sao',
        'hoi suc tim phoi',
        'hồi sức là gì',
        'ep tim la gi'
    ],

    do_not_upend_drowning_victim: [
        'soc nuoc dc k',
        'xốc nước',
        'doc nguoc nguoi',
        'vác người chạy',
        'dốc cho nước ra'
    ],


    // 17. HỒ BƠI - BIỂN BÁO
    pool_rules_general: [
        'noi quy ho boi',
        'đi bể bơi cần nhớ gì',
        'quy tac be boi',
        'hồ bơi làm gì',
        'luật ở hồ bơi'
    ],

    non_swimmer_pool_area: [
        'ko biet boi o dau',
        'chưa biết bơi xuống đâu',
        'khu ko biet boi',
        'bể nông cho người chưa biết bơi',
        'mới học bơi ở đâu'
    ],

    no_diving_sign: [
        'cam nhay dau',
        'biển cấm nhảy',
        'cam cam dau',
        'không được lao đầu',
        'chỗ cấm nhảy'
    ],

    pool_entry_using_ladder: [
        'xuong be sao',
        'xuống hồ bằng thang',
        'cach xuong be',
        'bám thang xuống hồ',
        'xuống hồ thế nào'
    ],


    // 18. BIẾT BƠI AN TOÀN
    safe_swimming_definition: [
        'biet boi an toan la gi',
        'bơi an toàn là sao',
        'tn la biet boi',
        'bơi sao mới gọi an toàn',
        'biết bơi an toàn'
    ],

    swimming_25m_meaning: [
        'boi 25m la biet boi chua',
        '25m co biet boi k',
        'bơi 25 mét',
        'bơi được 25m',
        '25m là đủ chưa'
    ],

    back_float_90_seconds: [
        'noi 90 giay',
        'nổi ngửa bao lâu',
        '90s noi ngua',
        'nổi 1p30',
        'nổi ngửa 90s'
    ],

    tread_water_90_seconds: [
        'dung nuoc 90s',
        'đứng nước bao lâu',
        '90 giay dung nuoc',
        'đứng nước 1p30',
        'đạp nước 90 giây'
    ],


    // 19. ĐỒ RƠI XUỐNG NƯỚC
    ball_falls_into_water: [
        'bong roi xuong song',
        'bóng rơi xuống nc',
        'bóng xuống hồ',
        'xuong lay bong dc k',
        'bóng rơi xuống ao'
    ],

    toy_falls_into_water: [
        'do roi xuong nuoc',
        'đồ chơi rơi xuống ao',
        'lay do duoi song',
        'điện thoại rơi xuống nước',
        'đồ rơi hồ làm sao'
    ],

    catching_fish_near_water: [
        'bat ca dc k',
        'xuong ao bat ca',
        'đi bắt cá',
        'bắt cá ngoài sông',
        'lội mương bắt cá'
    ],


    // 20. CÁC CÂU HỎI SIÊU NGẮN
    water_safety_quick_true_false: [
        'dung hay sai',
        'đúng sai',
        'do em di',
        'quiz duoi nuoc',
        'cau hoi duoi nuoc',
        'test an toan'
    ]
};
    // Logic xử lý thông minh
    function generateSmartResponse(userQuery) {
        const query = userQuery.toLowerCase().trim();

        // 1. Chống các câu hỏi nguy hiểm
        if (query.includes('nghịch lửa') || query.includes('chế tạo pháo') || query.includes('nhảy cầu')) {
            return "Những hành vi này vô cùng nguy hiểm đến tính mạng của em và mọi người xung quanh, tuyệt đối không được làm theo nhé!";
        }

        // 2. Thuật toán tìm kiếm theo trọng số từ đơn
        const userWords = query.split(/\s+/).filter(w => w.length > 1); // Tách câu hỏi thành các từ
        let bestMatch = null;
        let highestScore = 0;

        KB.forEach(item => {
            let score = 0;
            item.keywords.forEach(kw => {
                const kwLower = kw.toLowerCase();
                
                // CỘNG ĐIỂM: Nếu khớp cả cụm (Ưu tiên cao nhất)
                if (query === kwLower) {
                    score += 150;
                } else if (query.includes(kwLower) || kwLower.includes(query)) {
                    score += 60; 
                }

                // CỘNG ĐIỂM: Nếu khớp từng từ đơn lẻ trong từ khóa
                userWords.forEach(word => {
                    if (kwLower.includes(word)) {
                        score += 10;
                    }
                });
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        // 3. Trả về kết quả nếu tìm thấy mục có điểm cao
        if (bestMatch && highestScore >= 18) {
            return bestMatch.response;
        }

        // 4. Nếu hỏi quá ngắn hoặc không tìm thấy (Fallback)
        return "Xin lỗi em, Thỏ Ngọc chưa hiểu rõ câu hỏi này lắm do hơi vắn tắt. Em có thể hỏi chuyên gia về **bơi lội an toàn**, **cứu bạn đuối nước**, **cháy nổ và thoát hiểm**, **an toàn giao thông**, **tai nạn thương tích** hoặc các số khẩn cấp (111, 114, 115) nhé! 😊";
    }

    // GIAO DIỆN CHATBOT XANH LÁ MÁT MẮT (#059669) VỚI HIỆU ỨNG PHẬP PHỒNG (PULSE)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse-green {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1.08); box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        #ai-chatbot-launcher {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            width: 62px;
            height: 62px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
            border: 2px solid #ffffff;
            transition: transform 0.3s;
            animation: pulse-green 2.2s infinite ease-in-out;
        }
        #ai-chatbot-launcher:hover {
            transform: scale(1.12);
        }

        #ai-chatbot-container {
            position: fixed;
            bottom: 92px;
            right: 20px;
            z-index: 10000;
            width: 410px;
            max-width: 90vw;
            height: 560px;
            max-height: 82vh;
            background: #ffffff;
            border-radius: 18px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #a7f3d0;
            font-family: 'Segoe UI', Arial, sans-serif;
            animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes popIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ai-header {
            background: linear-gradient(135deg, #059669, #047857);
            color: #ffffff;
            padding: 14px 18px;
            font-weight: bold;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .ai-body {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f0fdf4;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
        }
        .ai-msg {
            padding: 12px 15px;
            border-radius: 16px;
            font-size: 13.5px;
            line-height: 1.6;
            max-width: 86%;
            word-wrap: break-word;
        }
        .ai-msg.bot {
            background: #ffffff;
            color: #1f2937;
            align-self: flex-start;
            border-bottom-left-radius: 3px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04);
            border: 1px solid #dcfce7;
            white-space: pre-wrap;
        }
        .ai-msg.user {
            background: #10b981;
            color: #ffffff;
            align-self: flex-end;
            border-bottom-right-radius: 3px;
            box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
        .ai-footer {
            padding: 12px;
            background: #ffffff;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
        }
        .ai-input {
            flex: 1;
            border: 1px solid #a7f3d0;
            border-radius: 22px;
            padding: 10px 16px;
            outline: none;
            font-size: 13.5px;
            transition: border-color 0.2s;
        }
        .ai-input:focus {
            border-color: #059669;
        }
        .ai-send {
            background: #059669;
            color: #ffffff;
            border: none;
            padding: 0 20px;
            border-radius: 22px;
            cursor: pointer;
            font-weight: bold;
            font-size: 13.5px;
            transition: background 0.2s;
        }
        .ai-send:hover {
            background: #047857;
        }
    `;
    document.head.appendChild(style);

    // TẠO GIAO DIỆN DOM
    const launcher = document.createElement('div');
    launcher.id = 'ai-chatbot-launcher';
    launcher.title = 'Mở Trợ lý AI';
    launcher.innerHTML = `<span style="font-size:32px">🤖</span>`;

    const container = document.createElement('div');
    container.id = 'ai-chatbot-container';
    container.innerHTML = `
        <div class="ai-header">
            <div style="display:flex; align-items:center; gap:10px">
                <span style="font-size:22px">🤖</span>
                <span>${ASSISTANT_NAME}</span>
            </div>
            <span id="ai-close" style="cursor:pointer; font-size:24px; opacity:0.9">&times;</span>
        </div>
        <div class="ai-body" id="ai-body">
            <div class="ai-msg bot">Chào em! 👋 Mình là <b>Thỏ Ngọc - Chuyên gia an toàn cho trẻ em 🐰🛡️</b>.<br><br>Mình sẽ đồng hành cùng em tìm hiểu về <b>phòng chống đuối nước, an toàn giao thông, phòng cháy chữa cháy và xử lý tai nạn thương tích</b>. Em muốn hỏi Chuyên gia Thỏ Ngọc điều gì nào? 😊</div>
        </div>
        <div class="ai-footer">
            <input type="text" class="ai-input" id="ai-input" placeholder="Gõ câu hỏi của bạn..." />
            <button class="ai-send" id="ai-send">Gửi</button>
        </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(container);

    const body = container.querySelector('#ai-body');
    const input = container.querySelector('#ai-input');
    const send = container.querySelector('#ai-send');

    launcher.onclick = () => {
        const isOpening = container.style.display !== 'flex';
        container.style.display = isOpening ? 'flex' : 'none';
        if (isOpening) {
            input.focus();
            playTingSound(); // Phát âm thanh Ting Teng phập phồng nhẹ khi mở
        }
    };

    container.querySelector('#ai-close').onclick = () => container.style.display = 'none';

    function addMessage(role, text) {
        const msg = document.createElement('div');
        msg.className = `ai-msg ${role}`;
        msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMessage('user', text);
        input.value = '';
        setTimeout(() => { addMessage('bot', generateSmartResponse(text)); }, 250);
    }

    send.onclick = handleSend;
    input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

    // Phát âm thanh ting teng khởi tạo nhẹ khi tải xong bài học sau 1.5s
    setTimeout(() => {
        playTingSound();
    }, 1500);
})();