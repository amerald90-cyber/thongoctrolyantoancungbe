const fs = require('fs');

const origCode = fs.readFileSync('chatbot.js', 'utf8');

// Extract original KB
const kbMatch = origCode.match(/const KB = (\[[\s\S]*?\]);\s*const keywordAliases/);
const aliasMatch = origCode.match(/const keywordAliases = (\{[\s\S]*?\});\s*\/\/ Logic/);

if (!kbMatch || !aliasMatch) {
    console.error('Extraction failed!');
    process.exit(1);
}

const kb = eval(kbMatch[1]);
const aliases = eval('(' + aliasMatch[1] + ')');

console.log('Original items count:', kb.length);

// Merge aliases into KB items
const kbMap = new Map();
kb.forEach(item => kbMap.set(item.id, item));

let aliasMergedCount = 0;
for (let key in aliases) {
    if (kbMap.has(key)) {
        let item = kbMap.get(key);
        let existingKws = new Set(item.keywords.map(k => k.toLowerCase().trim()));
        aliases[key].forEach(akw => {
            let clean = akw.toLowerCase().trim();
            if (!existingKws.has(clean)) {
                item.keywords.push(akw);
                existingKws.add(clean);
                aliasMergedCount++;
            }
        });
    }
}
console.log('Total alias keywords merged:', aliasMergedCount);

// Category follow-ups map
const CATEGORY_FOLLOWUPS = {
    drowning: [
        'Gọi không được ai thì sao?',
        'Không có phao thì ném gì?',
        'Bị chuột rút khi bơi làm sao?'
    ],
    electric: [
        'Dùng que gỗ gạt dây điện được không?',
        'Ngắt cầu dao ở đâu?',
        'Cháy điện dội nước được không?'
    ],
    fire: [
        'Không có khăn ướt thì làm gì?',
        'Tay nắm cửa nóng thì làm sao?',
        'Thoát hiểm nhà cao tầng khi cháy'
    ],
    traffic: [
        'Không có vạch kẻ đường thì qua thế nào?',
        'Đi xe đạp trời mưa thế nào?',
        'Đèn giao thông màu vàng có được đi không?'
    ],
    burn: [
        'Bôi kem đánh răng lên vết bỏng được không?',
        'Bị bỏng nước sôi phải làm sao?',
        'Các số điện thoại khẩn cấp'
    ],
    choking: [
        'Bị hóc nuốt cơm to được không?',
        'Thủ thuật Heimlich cấp cứu hóc dị vật',
        'Số điện thoại 115 là gì?'
    ],
    injury: [
        'Chó xông vào cắn thì làm gì?',
        'Chảy máu cam cúi hay ngửa đầu?',
        'An toàn với dao kéo sắc nhọn'
    ],
    abuse: [
        'Quy tắc 5 ngón tay phòng xâm hại',
        'Quy tắc đồ lót là gì?',
        'Số điện thoại 111 là gì?'
    ],
    stranger: [
        'Người lạ cho kẹo rủ đi theo thì làm sao?',
        'Ở nhà một mình người lạ gõ cửa',
        'Số điện thoại 113 là gì?'
    ],
    school: [
        'Bị bạn bắt nạt ở trường làm sao?',
        'Làm sao để hòa đồng với bạn bè?',
        'Tổng đài bảo vệ trẻ em 111'
    ],
    quick: [
        'Bốn số điện thoại cứu hộ khẩn cấp',
        'Thấy người đuối nước có nên nhảy xuống cứu không?',
        'Cháy do điện có được dội nước không?'
    ]
};

// New safety items to add for all suggestions, hotlines & smart contextual follow-ups
const newItems = [
    {
        id: 'cramp_swimming_what_to_do',
        category: 'drowning',
        badge: 'assets/illust_drowning.png',
        keywords: [
            'bị chuột rút khi bơi làm sao',
            'bi chuot rut khi boi lam sao',
            'bị chuột rút khi bơi',
            'chuột rút khi bơi',
            'bơi bị chuột rút làm gì',
            'đang bơi bị chuột rút',
            'xử lý chuột rút khi bơi',
            'bị chuột rút dưới nước',
            'chuột rút khi đang bơi làm gì',
            'cách xử lý khi bị chuột rút'
        ],
        response: '**Khi bị chuột rút dưới nước, em hãy bình tĩnh xử lý theo 4 bước an toàn sau:** 🏊⚠️\n\n1. **Giữ bình tĩnh tối đa:** Tuyệt đối không hoảng loạn hay vùng vẫy mạnh vì càng vùng vẫy sẽ càng nhanh chìm và đau đớn hơn.\n2. **Thả lỏng cơ thể & chuyển sang tư thế nổi ngửa:** Ngửa đầu ra sau, hít một hơi sâu và thả lỏng chân tay để cơ thể tự nổi trên mặt nước.\n3. **Hô to hoặc giơ tay kêu cứu:** Hướng về phía bờ hoặc người lớn cứu hộ xung quanh.\n4. **Duỗi nhẹ cơ bị chuột rút:** Nếu chuột rút ở bắp chân, hãy dùng tay kéo nhẹ các đầu ngón chân gập ngược về phía đầu gối để giãn cơ.\n5. Từ từ bơi bằng hai tay hoặc chờ người hỗ trợ đưa vào bờ!',
        followups: [
            'Gọi không được ai thì sao?',
            'Không có phao thì ném gì?',
            'Nếu thấy bạn rơi xuống nước có nên nhảy xuống cứu không?'
        ]
    },
    {
        id: 'electrical_fire_water_forbidden',
        category: 'fire',
        badge: 'assets/illust_electric.png',
        keywords: [
            'cháy điện có được dội nước không',
            'chay dien co duoc doi nuoc khong',
            'cháy điện dội nước được không',
            'cháy điện có dập bằng nước không',
            'dội nước vào đám cháy điện',
            'cháy điện chữa thế nào',
            'cháy ổ điện làm sao',
            'cháy đồ điện dập nước',
            'cháy do điện dội nước được không',
            'cháy điện',
            'cháy quạt điện'
        ],
        response: '**Không được dội nước vào đám cháy do điện nhé!** ⚠️⚡\n\nVì nước có thể dẫn điện, làm nguy hiểm hơn và người xung quanh có nguy cơ bị điện giật tử vong.\n\n**Em hãy nhớ các bước xử lý:**\n1. Bình tĩnh và **ngắt ngay nguồn điện** (cầu dao aptomat) nếu ở vị trí an toàn.\n2. **Hô to báo người lớn** xung quanh.\n3. Chỉ dùng bình chữa cháy CO2 hoặc bình bột (tuyệt đối không dùng nước hay chăn ướt khi chưa ngắt điện).\n4. Nhanh chóng di chuyển ra ngoài và gọi số **114** để được đội cứu hỏa giúp đỡ.',
        followups: [
            'Ngắt cầu dao ở đâu?',
            'Dùng que gỗ gạt dây điện được không?',
            'Không có khăn ướt thì làm gì?'
        ]
    },
    {
        id: 'pedestrian_crosswalk_safety',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'đi qua đường thế nào cho an toàn',
            'di qua duong the nao cho an toan',
            'cách qua đường',
            'qua đường an toàn',
            'đi bộ qua đường',
            'sang đường',
            'vạch kẻ đường',
            'khi nào qua đường',
            'đi qua đường',
            'an toàn khi qua đường',
            'đi qua đường an toàn'
        ],
        response: '**Khi đi qua đường, em hãy:** 🚶‍♂️🚦\n\n• **Đi ở vạch kẻ đường** dành cho người đi bộ.\n• **Nhìn trái - phải - trái**, quan sát xe thật cẩn thận trước khi bước xuống lòng đường.\n• **Chỉ đi khi đèn dành cho người đi bộ bật xanh** và khi đường thật an toàn.\n• Giơ cao một tay lên khi qua đường để tài xế dễ dàng quan sát thấy em.\n• **Luôn đi cùng người lớn** nhé!',
        followups: [
            'Không có vạch kẻ đường thì sao?',
            'Đèn giao thông màu vàng có được đi không?',
            'Đi xe đạp trời mưa thế nào?'
        ]
    },
    {
        id: 'see_friend_falling_water_screenshot',
        category: 'drowning',
        badge: 'assets/illust_drowning.png',
        keywords: [
            'thấy bạn bị rơi xuống nước có nên nhảy xuống cứu không',
            'thay ban bi roi xuong nuoc co nen nhay xuong cuu khong',
            'nếu thấy người rơi xuống nước có nên xuống cứu không',
            'neu thay nguoi roi xuong nuoc co nen xuong cuu khong',
            'thấy người rơi xuống nước có nên xuống cứu không',
            'thấy người rơi xuống nước có nên nhảy xuống cứu không',
            'thấy người rơi xuống nước có nhảy xuống cứu không',
            'thấy bạn đuối nước có nên nhảy xuống cứu không',
            'thấy bạn đuối nước có nhảy xuống cứu không',
            'nhảy xuống cứu bạn đuối nước được không',
            'có nên nhảy xuống cứu người đuối nước không'
        ],
        response: '**Tuyệt đối KHÔNG ĐƯỢC NHẢY XUỐNG CỨU nhé!** 🏊‍♂️⚠️\n\nKể cả khi em biết bơi, việc nhảy xuống cứu người đang hoảng loạn vì đuối nước cực kỳ nguy hiểm, họ sẽ ôm chặt và có thể kéo em chìm theo.\n\n**Cách xử lý đúng và an toàn nhất:**\n1. **Hô to kêu cứu thật lớn** để người lớn gần đó nghe thấy chạy đến giúp ngay.\n2. **Tìm vật cứu sinh:** Ném phao, can nhựa rỗng có nắp, quả bóng, tấm xốp, hoặc đưa cành cây dài, sào tre, dây thừng cho bạn bám vào.\n3. **Gọi ngay 114 hoặc 115** nếu xung quanh vắng người!',
        followups: [
            'Gọi không được ai thì sao?',
            'Không có phao thì ném gì?',
            'Nếu bị bạn kéo thì sao?'
        ]
    },
    {
        id: 'see_drowning_person_general',
        category: 'drowning',
        badge: 'assets/illust_drowning.png',
        keywords: [
            'thấy người đuối nước phải làm gì',
            'thay nguoi duoi nuoc phai lam gi',
            'thấy người bị đuối nước',
            'gặp người đuối nước',
            'cứu người đuối nước'
        ],
        response: '**Khi thấy người bị đuối nước, em hãy bình tĩnh và nhớ kỹ nguyên tắc "CỨU TRÊN BỜ - KHÔNG NHẢY XUỐNG":** 🏊‍♂️⚠️\n\n1. **Hô hoán thật to:** Kêu cứu để người lớn xung quanh lập tức chạy đến hỗ trợ.\n2. **Quăng vật nổi:** Ném phao cứu sinh, can nhựa rỗng, can dầu ăn, thùng xốp xuống cho nạn nhân bám vào.\n3. **Dùng sào dài hoặc dây thừng:** Đưa cành cây, sào tre, cây gậy dài hoặc buộc quần áo lại ném ra cho nạn nhân túm lấy và nằm rạp xuống đất kéo vào bờ.\n4. **Gọi 114 hoặc 115** để cứu hộ chuyên nghiệp ứng cứu kịp thời.',
        followups: [
            'Gọi không được ai thì sao?',
            'Không có phao thì ném gì?',
            'Nếu bị bạn kéo thì sao?'
        ]
    },
    {
        id: 'drowning_cannot_call_anyone',
        category: 'drowning',
        badge: 'assets/illust_drowning.png',
        keywords: [
            'gọi không được ai thì sao',
            'goi khong duoc ai thi sao',
            'kêu không có ai thì làm sao',
            'keu khong co ai thi lam sao',
            'không có ai thì làm sao',
            'khong co ai thi lam sao',
            'không có ai thì làm thế nào',
            'khong co ai thi lam the nao',
            'gọi không có ai nghe',
            'nếu xung quanh không có ai',
            'kêu cứu không ai nghe',
            'gọi mà không ai tới thì sao',
            'vắng người không có ai thì cứu thế nào',
            'không có ai ở đó thì làm sao',
            'nơi vắng người thấy người đuối nước'
        ],
        response: '**Nếu thấy người rơi xuống nước mà xung quanh vắng vẻ, hô hoán gọi không có ai, em hãy thật bình tĩnh và TUYỆT ĐỐI KHÔNG nhảy xuống nước! Hãy xử lý khẩn cấp theo 4 bước sau:** 🏊‍♂️🚨\n\n1. **Ném ngay mọi vật nổi xung quanh xuống:** Ném can nhựa rỗng (đậy kín nắp), thùng xốp, chai nhựa to, bóng cao su, thân cây chuối hoặc tấm ván gỗ xuống sát vị trí nạn nhân để bạn bám vào nổi mặt nước.\n2. **Tìm cành cây dài hoặc dây thừng:** Đưa cành cây dài, sào tre, sào phơi đồ, hoặc cởi áo khoác buộc nối lại ném ra cho nạn nhân túm lấy. **LƯU Ý QUAN TRỌNG:** Em phải **nằm sấp hoặc quỳ thấp người thật vững trên mặt đất** khi kéo để không bị sức nặng kéo ngã nhào xuống nước!\n3. **Bấm gọi ngay số khẩn cấp 114 hoặc 115:** Bật loa ngoài, đọc to địa chỉ vị trí ao hồ sông suối nơi bạn gặp nạn.\n4. **Chạy nhanh tìm người lớn:** Khi bạn đã ôm được vật nổi, chạy thật nhanh về phía nhà dân hoặc đường lộ gần nhất vừa chạy vừa hô to để người lớn đến cứu!',
        followups: [
            'Không có phao thì ném gì?',
            'Nếu bị bạn kéo thì sao?',
            'Bị chuột rút khi bơi làm sao?'
        ]
    },
    {
        id: 'drowning_hugged_by_victim',
        category: 'drowning',
        badge: 'assets/illust_drowning.png',
        keywords: [
            'nếu bị bạn kéo thì sao',
            'neu bi ban keo thi sao',
            'bị người đuối nước ôm chặt thì làm sao',
            'bi nguoi duoi nuoc om chat thi lam sao',
            'bị kéo xuống nước thì làm sao',
            'người đuối nước ôm chặt',
            'lỡ bị bạn đuối nước kéo theo',
            'bị người chết đuối ôm'
        ],
        response: '**Nếu vô tình bị người đang đuối nước ôm chặt hoặc kéo xuống nước:** ⚠️🌊\n\n• **Quy luật sinh tồn:** Người đuối nước đang rất hoảng loạn nên theo bản năng sẽ bám víu và ghì mọi thứ xuống để ngoi đầu lên thở.\n• **Cách thoát hiểm sinh tử:**\n  1. **Lặn sâu xuống nước:** Hãy hít một hơi thật sâu rồi lặn hẳn người xuống đáy nước. Khi thấy em chìm xuống, người bị nạn theo phản xạ sinh tồn sẽ tự động buông tay ra để tìm cách trồi lên.\n  2. **Thoát ra sau lưng:** Ngay khi họ buông tay, lập tức bơi lùi ra xa hoặc luồn ra phía sau lưng họ.\n  3. **Không để họ ôm lại:** Tuyệt đối không đối mặt trực diện, hãy bơi cách xa một sải tay và tìm vật nổi ném cho bạn bám!',
        followups: [
            'Gọi không được ai thì sao?',
            'Không có phao thì ném gì?',
            'Bị chuột rút khi bơi làm sao?'
        ]
    },
    {
        id: 'drowning_throw_floating_objects',
        category: 'drowning',
        badge: 'assets/illust_drowning.png',
        keywords: [
            'không có phao thì ném gì',
            'khong co phao thi nem gi',
            'không có phao thì làm sao',
            'khong co phao cuu sinh nem gi',
            'vật nổi cứu người đuối nước',
            'ném vật gì khi không có phao',
            'vật dụng có thể nổi dưới nước'
        ],
        response: '**Nếu không có sẵn phao cứu sinh, em có thể tận dụng ngay các vật dụng nổi sau để ném cho bạn:** 🛟✨\n\n1. **Can nhựa, thùng rỗng:** Can dầu ăn, can nước 5L - 20L (vặn chặt nắp kín), thùng xốp, hộp xốp giữ nhiệt.\n2. **Bóng thể thao:** Bóng chuyền, bóng đá, bóng rổ bằng da hoặc cao su bơm căng hơi.\n3. **Thân cây chuối, khúc gỗ khô:** Cây chuối chứa nhiều bọt khí nên nổi rất tốt trên mặt nước.\n4. **Ba lô hoặc chai lọ nhựa buộc chùm:** Cho nhiều chai nhựa rỗng vào ba lô kéo khóa kín hoặc buộc chùm lại ném xuống cho bạn ôm!',
        followups: [
            'Gọi không được ai thì sao?',
            'Nếu thấy bạn rơi xuống nước có nên nhảy xuống cứu không?',
            'Bị chuột rút khi bơi làm sao?'
        ]
    },
    {
        id: 'electric_dry_wood_stick',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'dùng que gỗ được không',
            'dung que go duoc khong',
            'dùng gậy gỗ gạt dây điện được không',
            'dung gay go gat day dien duoc khong',
            'dùng que tre gạt dây điện',
            'dùng cây gạt dây điện',
            'lấy que gỗ đẩy dây điện được không',
            'que gỗ có dẫn điện không'
        ],
        response: '**Được em nhé! Nhưng que gỗ phải HOÀN TOÀN KHÔ RÁO và đủ dài:** 🪵⚡\n\n• **Chỉ dùng khi que gỗ thật khô:** Que gỗ khô là chất cách điện tốt, em có thể dùng que gỗ dài khô hoặc cán chổi nhựa khô để gạt dây điện ra khỏi người bị nạn.\n• **TUYỆT ĐỐI KHÔNG:**\n  ❌ Không dùng gậy gỗ ẩm ướt, que tre tươi hoặc dính nước vì nước dẫn điện cực mạnh!\n  ❌ Tuyệt đối không dùng thanh kim loại, que sắt, chổi cán inox.\n• **An toàn nhất:** Vẫn là tìm cách ngắt cầu dao (Aptomat) tổng ngay trước khi tiếp cận!',
        followups: [
            'Ngắt cầu dao ở đâu?',
            'Cháy điện dội nước được không?',
            'Tại sao chim đậu trên dây điện không giật?'
        ]
    },
    {
        id: 'electric_breaker_location',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'ngắt cầu dao ở đâu',
            'ngat cau dao o dau',
            'cầu dao nằm ở chỗ nào',
            'cau dao nam o cho nao',
            'vị trí cầu dao trong nhà',
            'hộp aptomat ở đâu',
            'tìm cầu dao điện ở đâu',
            'ngắt điện ở đâu'
        ],
        response: '**Vị trí của cầu dao (Aptomat) trong gia đình thường nằm ở:** ⚡🏠\n\n1. **Gần cửa ra vào chính** của phòng khách.\n2. **Dưới chân gầm cầu thang** hoặc hành lang tầng 1.\n3. **Ngay phía trên cao của cửa vào** mỗi phòng hoặc mỗi tầng nhà.\n\n💡 **Cách ngắt an toàn:** Khi cần ngắt điện, hãy đi dép nhựa/cao su khô ráo, dùng tay khô (hoặc que gỗ khô) gạt công tắc Aptomat dứt khoát xuống phía dưới (về chữ **OFF** hoặc màu xanh) là toàn bộ điện trong nhà sẽ được ngắt an toàn!',
        followups: [
            'Dùng que gỗ gạt dây điện được không?',
            'Cháy điện dội nước được không?',
            'Tay ướt có được chạm vào ổ cắm không?'
        ]
    },
    {
        id: 'electric_bird_no_shock',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'sao chim không bị giật',
            'sao chim khong bi giat',
            'tại sao chim đậu trên dây điện không bị giật',
            'tai sao chim dau tren day dien khong bi giat',
            'chim đứng trên dây điện có bị giật không',
            'tại sao chim không bị điện giật',
            'vì sao chim đậu trên dây điện không chết'
        ],
        response: '**Lý do chim đậu trên dây điện cao thế mà không bị giật:** 🐦⚡\n\n1. **Hai chân chim cùng đậu trên một sợi dây:** Cả hai chân của chú chim đều đứng trên cùng một dây điện, nên điện thế ở hai chân bằng nhau (không có sự chênh lệch điện áp), dòng điện sẽ không chạy qua cơ thể chim.\n2. **Chim không chạm đất hay dây khác:** Chim hoàn toàn lơ lửng trên không trung, không tạo thành mạch điện kín xuống đất.\n\n⚠️ **Ngược lại với con người:** Con người chúng ta đứng trên mặt đất (hoặc chạm vào tường), nếu chạm vào dây điện sẽ tạo thành mạch điện chạy thẳng từ dây qua người xuống đất, gây điện giật tử vong ngay lập tức! Vì thế em tuyệt đối không bao giờ được chạm vào dây điện nhé!',
        followups: [
            'Dây điện bị hở phải làm sao?',
            'Thấy dây điện rơi xuống đất làm gì?',
            'Dùng que gỗ gạt dây điện được không?'
        ]
    },
    {
        id: 'fire_no_wet_towel',
        category: 'fire',
        badge: 'assets/illust_electric.png',
        keywords: [
            'không có khăn ướt thì sao',
            'khong co khan uot thi sao',
            'không có khăn ướt thì làm gì',
            'khong co khan uot thi lam the nao',
            'lấy gì bịt mũi nếu không có khăn',
            'không có khăn lấy gì bịt mũi',
            'không có nước làm ướt khăn thì sao',
            'hết nước làm ướt khăn thì làm sao'
        ],
        response: '**Nếu không có khăn ướt khi xảy ra cháy nổ, em hãy bình tĩnh xử lý ngay:** 🧯💨\n\n1. **Dùng ngay vạt áo hoặc khẩu trang:** Cởi áo ngoài, gấp vạt áo lại 3-4 lớp hoặc dùng khẩu trang vải có sẵn bịt kín mũi và miệng.\n2. **Làm ướt bằng bất kỳ chất lỏng an toàn nào:** Nước uống trong chai, nước canh, nước trà... nhúng áo/khẩu trang vào để lọc khói độc.\n3. **Nếu không có bất kỳ nguồn nước nào:** Gấp nhiều lớp vải khô che mũi miệng, và **bò sát sát mặt sàn (cách sàn 20-30cm)** vì khói độc nhẹ hơn không khí sẽ bay lên trần nhà, phía sát sàn vẫn còn lớp không khí sạch hơn để thở!\n4. Di chuyển thật nhanh men theo mép tường ra lối thoát hiểm!',
        followups: [
            'Cửa nóng thì làm sao?',
            'Thoát hiểm nhà cao tầng khi có cháy làm gì?',
            'Số điện thoại 114 là gì?'
        ]
    },
    {
        id: 'fire_hot_doorknob',
        category: 'fire',
        badge: 'assets/illust_electric.png',
        keywords: [
            'cửa nóng thì làm sao',
            'cua nong thi lam sao',
            'tay nắm cửa nóng thì sao',
            'tay nam cua nong thi sao',
            'sờ thấy tay nắm cửa nóng',
            'sờ cửa thấy nóng thì làm gì',
            'nếu tay nắm cửa bị nóng có mở không',
            'cửa bị nóng có mở không'
        ],
        response: '**Nếu kiểm tra bằng mu bàn tay thấy tay nắm cửa NÓNG RAN: Tuyệt đối KHÔNG ĐƯỢC MỞ CỬA!** 🔥🚪❌\n\n• **Vì sao?** Tay nắm cửa nóng chứng tỏ ngọn lửa lớn và khói độc đang bao trùm ngay phía bên kia cánh cửa. Mở cửa ra sẽ làm ngọn lửa và khí độc ập thẳng vào thiêu rụi căn phòng ngay lập tức!\n• **Em phải làm gì ngay lúc đó?**\n  1. Lập tức lùi lại, đóng chặt cửa.\n  2. Dùng chăn, quần áo, rèm cửa (thấm ướt nếu có nước) chèn thật kín các khe hở quanh cửa để ngăn khói độc lọt vào.\n  3. Di chuyển ra ban công hoặc cửa sổ thoáng khí (nơi không có khói), vẫy khăn áo sáng màu kêu cứu to và gọi số **114** báo rõ số phòng của em!',
        followups: [
            'Không có khăn ướt thì sao?',
            'Thoát hiểm nhà cao tầng khi có cháy',
            'Cháy điện dội nước được không?'
        ]
    },
    {
        id: 'traffic_no_crosswalk',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'không có vạch kẻ đường thì sao',
            'khong co vach ke duong thi sao',
            'qua đường không có vạch kẻ đường',
            'qua duong khong co vach ke duong',
            'nơi không có vạch kẻ đường qua đường thế nào',
            'không có vạch kẻ đường thì qua thế nào',
            'đường không có vạch đi bộ làm sao qua'
        ],
        response: '**Khi cần qua đường ở đoạn đường KHÔNG CÓ vạch kẻ đường cho người đi bộ:** 🚶‍♂️🛣️\n\n1. **Chọn vị trí quan sát tốt nhất:** Tuyệt đối không băng qua đường ở góc cua gấp, đoạn dốc khuất tầm nhìn hoặc nơi có xe ô tô to đang đỗ che khuất.\n2. **Dừng lại trên vỉa hè/lề đường:** Quan sát kỹ dòng xe theo thứ tự: **Nhìn Trái -> Nhìn Phải -> Nhìn Trái lần nữa**.\n3. **Giơ cao một tay lên:** Để các tài xế từ xa dễ dàng nhìn thấy em.\n4. **Đi dứt khoát, tập trung:** Khi thấy khoảng trống xe thật xa và an toàn, đi đều bước qua đường. **Tuyệt đối KHÔNG chạy vụt qua hay vừa đi vừa cắm đầu nhìn điện thoại!**\n5. Nếu có người lớn ở gần, hãy xin người lớn dắt em qua đường cùng nhé!',
        followups: [
            'Đi qua đường thế nào cho an toàn?',
            'Đèn giao thông màu vàng có được đi không?',
            'Đi xe đạp trời mưa thế nào?'
        ]
    },
    {
        id: 'traffic_bicycle_rain_safety',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'trời mưa đi xe đạp thế nào',
            'troi mua di xe dap the nao',
            'đi xe đạp trời mưa thì làm sao',
            'di xe dap troi mua thi lam sao',
            'mưa đi xe đạp có được che ô không',
            'đi xe đạp trời mưa',
            'an toàn đi xe đạp mùa mưa',
            'trời mưa đi xe đạp an toàn'
        ],
        response: '**Quy tắc an toàn khi đi xe đạp dưới trời mưa:** 🚲🌧️\n\n• **TUYỆT ĐỐI KHÔNG:**\n  ❌ **Không vừa đi xe đạp vừa cầm ô (dù):** Cầm ô làm mất thăng bằng, gió tạt ngã và che khuất tầm nhìn, rất dễ gây tai nạn nguy hiểm!\n  ❌ Không phóng nhanh, vượt ẩu hoặc phanh gấp vì đường mưa rất trơn trượt.\n  ❌ Không đi qua các vũng nước đục lớn vì dưới đó có thể là ổ gà sâu, hố ga mất nắp.\n• **NÊN LÀM:**\n  ✅ Mặc áo mưa bộ gọn gàng (không để tà áo mưa cuốn vào nan hoa xe).\n  ✅ Đội mũ bảo hiểm có kính chắn mưa.\n  ✅ Đi chậm, giữ khoảng cách xa gấp đôi với các xe phía trước và bóp phanh từ từ!',
        followups: [
            'Đi xe đạp trên đường cần chú ý gì?',
            'Đèn giao thông màu vàng có được đi không?',
            'Đi qua đường thế nào cho an toàn?'
        ]
    },
    {
        id: 'burn_toothpaste_forbidden',
        category: 'burn',
        badge: '',
        keywords: [
            'bôi kem đánh răng được không',
            'boi kem danh rang duoc khong',
            'bị bỏng bôi kem đánh răng được không',
            'bi bong boi kem danh rang duoc khong',
            'bị bỏng có được bôi kem đánh răng không',
            'bỏng bôi kem đánh răng',
            'bỏng bôi mỡ trăn được không',
            'bỏng bôi nước mắm được không',
            'bỏng bôi trứng gà được không'
        ],
        response: '**TUYỆT ĐỐI KHÔNG bôi kem đánh răng, nước mắm, mỡ trăn hay trứng gà lên vết bỏng em nhé!** 🚫🧴\n\n• **Vì sao nguy hiểm?**\n  - Kem đánh răng chứa bạc hà và kiềm sẽ làm vết bỏng bị kích ứng, rát buốt dữ dội hơn và giữ nhiệt dưới da.\n  - Nước mắm, mỡ trăn, trứng gà rất dễ làm vi khuẩn xâm nhập gây nhiễm trùng, hoại tử da để lại sẹo xấu vĩnh viễn!\n• **Cách xử lý ĐÚNG DUY NHẤT:**\n  1. Ngâm hoặc xả nhẹ vết bỏng dưới **vòi nước sạch mát** (nước sinh hoạt bình thường 15 - 20°C) liên tục trong **15 - 20 phút** để hạ nhiệt tức thì.\n  2. Dùng gạc sạch hoặc khăn mềm sạch che nhẹ vết bỏng (không băng chặt).\n  3. Báo ngay người lớn đưa đến cơ sở y tế gần nhất!',
        followups: [
            'Bị bỏng nước sôi phải làm sao?',
            'Xử lý bỏng độ 1 độ 2 thế nào?',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'choking_rice_swallow_danger',
        category: 'choking',
        badge: '',
        keywords: [
            'nuốt cơm được không',
            'nuot com duoc khong',
            'bị hóc nuốt cơm được không',
            'bi hoc nuot com duoc khong',
            'hóc xương nuốt miếng cơm to',
            'hóc xương nuốt cơm nguội',
            'bị hóc xương nuốt cơm được không',
            'hóc xương uống nhiều nước được không'
        ],
        response: '**TUYỆT ĐỐI KHÔNG nuốt cục cơm to hay uống nhiều nước khi bị hóc xương em nhé!** 🐟🍚❌\n\n• **Vì sao rất nguy hiểm?**\n  - Miếng cơm to khi nuốt trôi xuống sẽ đè và đẩy mạnh chiếc xương găm sâu hơn vào thành thực quản, thậm chí làm rách, thủng thực quản và đâm vào mạch máu lớn cực kỳ nguy hiểm!\n• **Cách xử lý đúng khi bị hóc xương:**\n  1. Ngừng ăn, ngừng nuốt ngay lập tức.\n  2. Khạc nhổ nhẹ nhàng vào khăn giấy nếu xương ở gần vòm họng.\n  3. Báo ngay bố mẹ dùng đèn pin soi họng; nếu thấy xương ở nông có thể dùng kẹp y tế gắp ra, nếu sâu hãy đến ngay bệnh viện để bác sĩ nội soi gắp an toàn!',
        followups: [
            'Bị hóc dị vật hoặc nghẹn đồ ăn làm sao?',
            'Thủ thuật Heimlich cấp cứu hóc dị vật',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'dog_attack_defense',
        category: 'injury',
        badge: '',
        keywords: [
            'nó xông vào cắn thì sao',
            'no xong vao can thi sao',
            'chó xông vào cắn thì làm gì',
            'cho xong vao can thi lam gi',
            'chó tấn công thì làm sao',
            'bị chó lao vào cắn',
            'cách tự vệ khi bị chó dữ tấn công',
            'chó cắn thì làm thế nào'
        ],
        response: '**Nếu chẳng may bị chó dữ lao vào tấn công, em hãy nhớ kỹ các động tác tự vệ sinh tử sau:** 🐕⚠️\n\n1. **Đưa vật cản ra phía trước:** Nhanh chóng đưa cặp sách, áo khoác, ba lô, mũ bảo hiểm hoặc cành cây ra phía trước để chó cắn vào vật đó thay vì cắn vào cơ thể em.\n2. **Tư thế bảo vệ tính mạng (nếu bị xô ngã):**\n   - Cuộn tròn người lại như một quả bóng.\n   - Áp đầu gối vào ngực, đan chặt hai bàn tay ôm chặt lấy đầu và gáy để bảo vệ cổ, mặt và tai (những vị trí nguy hiểm nhất).\n   - Nằm im, nhắm mắt và không vùng vẫy hay la hét kích động thêm.\n3. **Sau khi thoát khỏi chó:** Rửa ngay vết thương dưới vòi nước chảy với xà phòng trong 15 phút, sát trùng cồn và đi tiêm phòng dại khẩn cấp cùng người lớn!',
        followups: [
            'Gặp chó dữ ngoài đường làm gì?',
            'Bị chó cắn xử lý thế nào?',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'electrical_safety_dont_play',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'tại sao không được nghịch ổ cắm điện',
            'tai sao khong duoc nghich o cam dien',
            'nghịch ổ điện',
            'chọc que vào ổ cắm',
            'an toàn điện'
        ],
        response: '**Tuyệt đối không bao giờ được nghịch ổ cắm hay thiết bị điện em nhé!** ⚡🔌\n\n• Dòng điện trong nhà có điện áp 220V cực kỳ mạnh, có thể gây bỏng sâu, co giật tim và đe dọa tính mạng chỉ trong một giây!\n• Không dùng que sắt, dây kim loại chọc vào lỗ cắm.\n• Không tự ý cắm hay rút phích điện khi tay ướt hoặc không có người lớn hướng dẫn.',
        followups: [
            'Tay ướt có được chạm vào ổ cắm không?',
            'Dây điện bị hở phải làm sao?',
            'Dùng que gỗ gạt dây điện được không?'
        ]
    },
    {
        id: 'traffic_safety_children_general',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'an toàn giao thông cho học sinh',
            'an toan giao thong cho hoc sinh',
            'luật giao thông học sinh',
            'đi đường an toàn',
            'an toàn giao thông'
        ],
        response: '**Quy tắc an toàn giao thông quan trọng dành cho học sinh:** 🚦🚶‍♂️🚲\n\n1. **Đi bộ:** Luôn đi trên vỉa hè hoặc sát lề đường bên phải; sang đường ở vạch kẻ đường và chú ý quan sát kỹ hai bên.\n2. **Đi xe đạp:** Đi đúng làn đường quy định, không dàn hàng ba hàng bốn, không lạng lách đánh võng hay buông cả hai tay.\n3. **Ngồi trên xe máy:** Luôn đội mũ bảo hiểm đạt chuẩn, cài quai chắc chắn và ôm chặt người lái xe.',
        followups: [
            'Không có vạch kẻ đường thì sao?',
            'Đi xe đạp trời mưa thế nào?',
            'Đèn giao thông màu vàng có được đi không?'
        ]
    },
    {
        id: 'yellow_traffic_light_rule',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'đèn giao thông màu vàng có được đi không',
            'den giao thong mau vang co duoc di khong',
            'đèn vàng có được đi tiếp không',
            'ý nghĩa đèn vàng giao thông',
            'đèn vàng làm gì'
        ],
        response: '**Khi thấy đèn tín hiệu giao thông chuyển sang màu vàng:** 🟡🚦\n\n• **Quy tắc chuẩn:** Phải dừng lại trước vạch dừng xe.\n• **Ngoại lệ:** Nếu xe đã vượt quá vạch dừng trước khi đèn chuyển vàng thì được phép đi tiếp.\n• **Lời khuyên an toàn:** Khi thấy đèn vàng hoặc đồng hồ đếm ngược sắp hết đèn xanh, em hãy chủ động giảm tốc độ để dừng xe an toàn, không cố tăng ga vượt qua nhé!',
        followups: [
            'Đi qua đường thế nào cho an toàn?',
            'Không có vạch kẻ đường thì sao?',
            'Đi xe đạp trời mưa thế nào?'
        ]
    },
    {
        id: 'bicycle_safety_on_road',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'đi xe đạp trên đường cần chú ý gì',
            'di xe dap tren duong can chu y gi',
            'an toàn khi đi xe đạp',
            'đi xe đạp an toàn',
            'lưu ý khi đi xe đạp'
        ],
        response: '**Những lưu ý sống còn khi đi xe đạp trên đường:** 🚲🛡️\n\n• **Kiểm tra xe trước khi đi:** Phanh (thắng), lốp xe và chuông phải hoạt động tốt.\n• **Đội mũ bảo hiểm:** Bảo vệ vùng đầu của em khi không may xảy ra va quệt.\n• **Tuyệt đối KHÔNG:** Dàn hàng ngang, đùa giỡn, buông tay lái, chở quá số người quy định hoặc đeo tai nghe nghe nhạc khi đang lái xe.',
        followups: [
            'Trời mưa đi xe đạp thế nào?',
            'Đèn giao thông màu vàng có được đi không?',
            'Không có vạch kẻ đường thì sao?'
        ]
    },
    {
        id: 'helmet_safety_on_motorbike',
        category: 'traffic',
        badge: 'assets/illust_traffic.png',
        keywords: [
            'ngồi trên xe máy có phải đội mũ bảo hiểm không',
            'ngoi tren xe may co phai doi mu bao hiem khong',
            'đội mũ bảo hiểm xe máy',
            'tại sao phải đội mũ bảo hiểm'
        ],
        response: '**Bắt buộc phải đội mũ bảo hiểm khi ngồi trên xe mô tô, xe gắn máy, xe máy điện và xe đạp điện!** 🛵🪖\n\n• Trẻ em từ **6 tuổi trở lên** bắt buộc phải đội mũ bảo hiểm đạt chuẩn.\n• Mũ phải cài quai chắc chắn (vừa vặn, lọt không quá 2 ngón tay dưới cằm) để bảo vệ vùng đầu não nếu không may xảy ra tai nạn.',
        followups: [
            'Đi xe đạp trên đường cần chú ý gì?',
            'Đèn giao thông màu vàng có được đi không?',
            'Đi qua đường thế nào cho an toàn?'
        ]
    },
    {
        id: 'stranger_danger_candy_gift',
        category: 'stranger',
        badge: '',
        keywords: [
            'người lạ cho kẹo rủ đi theo thì làm sao',
            'nguoi la cho keo ru di theo thi lam sao',
            'người lạ cho quà',
            'người lạ rủ đi',
            'người lạ cho bánh kẹo',
            'người lạ dẫn đi'
        ],
        response: '**Khi người lạ cho quà, bánh kẹo, đồ chơi hoặc rủ em đi theo:** 🍭🚫\n\n1. **Nói "KHÔNG" dứt khoát:** Lùi lại cách xa người đó ít nhất 2 - 3 bước chân.\n2. **Tuyệt đối không nhận đồ:** Đồ ăn hoặc nước uống của người lạ có thể tẩm thuốc mê hoặc độc chất.\n3. **Tuyệt đối không đi theo:** Bất kể người đó nói là "bố mẹ nhờ đón" hay "nhờ tìm đồ giúp".\n4. **Chạy ngay đến nơi đông người hoặc thầy cô, bố mẹ** để thông báo!',
        followups: [
            'Ở nhà một mình người lạ gõ cửa thì làm gì?',
            'Quy tắc 5 ngón tay phòng xâm hại',
            'Số điện thoại 113 là gì?'
        ]
    },
    {
        id: 'home_alone_stranger_knocks',
        category: 'stranger',
        badge: '',
        keywords: [
            'ở nhà một mình người lạ gõ cửa thì làm gì',
            'o nha mot minh nguoi la go cua thi lam gi',
            'người lạ gõ cửa khi ở nhà một mình',
            'ở nhà một mình có người lạ',
            'người lạ bấm chuông'
        ],
        response: '**Khi ở nhà một mình mà có người lạ gõ cửa hoặc bấm chuông:** 🏠🚪\n\n1. **TUYỆT ĐỐI KHÔNG MỞ CỬA:** Giữ then chốt cửa thật chắc chắn.\n2. **Không để lộ là em đang ở nhà một mình:** Không nói to "cháu ở nhà một mình", hãy nói vọng ra: "Bố mẹ cháu đang bận, hẹn chú/cô lát nữa quay lại sau".\n3. **Gọi điện ngay cho bố mẹ** hoặc người thân để báo tin.\n4. Nếu người lạ cố tình cạy cửa hoặc có dấu hiệu đột nhập, bấm gọi ngay **113** hoặc gọi to cầu cứu hàng xóm!',
        followups: [
            'Người lạ cho kẹo rủ đi theo thì làm sao?',
            'Quy tắc 5 ngón tay phòng xâm hại',
            'Bốn số điện thoại cứu hộ khẩn cấp'
        ]
    },
    {
        id: 'body_safety_underwear_rule',
        category: 'abuse',
        badge: '',
        keywords: [
            'quy tắc đồ lót là gì',
            'quy tac do lot la gi',
            'quy tắc pan-ts',
            'vùng riêng tư trên cơ thể',
            'vùng kín cơ thể',
            'bảo vệ vùng riêng tư'
        ],
        response: '**Quy tắc Đồ Lót (PANTS) giúp em bảo vệ bản thân khỏi bị xâm hại:** 🩲🛡️\n\n• **Vùng riêng tư:** Là những phần cơ thể được che bởi đồ bơi hoặc đồ lót (ngực, mông, giữa hai đùi) và cả miệng.\n• **Không ai được phép chạm vào:** Trừ bác sĩ khám bệnh khi có mặt bố mẹ em ở đó.\n• **Em cũng không được chạm vào vùng riêng tư của người khác**.\n• Nếu ai đó cố tình chạm vào, bắt em chạm hoặc chụp ảnh vùng kín của em, hãy hét to **"KHÔNG!"**, bỏ chạy và kể ngay với bố mẹ hoặc gọi **111**!',
        followups: [
            'Quy tắc 5 ngón tay phòng xâm hại',
            'Bị bạn bắt nạt ở trường làm sao?',
            'Số điện thoại 111 là gì?'
        ]
    },
    {
        id: 'five_fingers_rule',
        category: 'abuse',
        badge: '',
        keywords: [
            'quy tắc 5 ngón tay là gì',
            'quy tac 5 ngon tay la gi',
            'quy tắc năm ngón tay',
            '5 ngón tay phòng tránh xâm hại',
            'quy tắc năm ngón tay bảo vệ bản thân'
        ],
        response: '**Quy tắc 5 ngón tay dạy em cách giao tiếp an toàn:** 🖐️\n\n1. **Ngón cái (Gần nhất):** Bố mẹ, ông bà, anh chị em ruột -> Được ôm hôn, thể hiện tình cảm.\n2. **Ngón trỏ:** Thầy cô, bạn bè, họ hàng -> Khoác tay, nắm tay, bắt tay.\n3. **Ngón giữa:** Người quen (hàng xóm, bạn bố mẹ) -> Bắt tay, chào hỏi.\n4. **Ngón áp út:** Người mới gặp lần đầu -> Cười và vẫy tay chào từ xa.\n5. **Ngón út (Xa nhất):** Người hoàn toàn xa lạ -> Xua tay, giữ khoảng cách, bỏ chạy nếu họ cố tình lại gần!',
        followups: [
            'Quy tắc đồ lót là gì?',
            'Người lạ cho kẹo rủ đi theo thì làm sao?',
            'Số điện thoại 111 là gì?'
        ]
    },
    {
        id: 'school_bullying_what_to_do',
        category: 'school',
        badge: '',
        keywords: [
            'bị bạn bắt nạt ở trường thì làm sao',
            'bi ban bat nat o truong thi lam sao',
            'bắt nạt học đường',
            'bị bạn đánh ở trường',
            'bị cô lập ở lớp',
            'bạn bè bắt nạt'
        ],
        response: '**Khi bị bạn bè bắt nạt, đe dọa hoặc cô lập ở trường:** 🏫🎒\n\n1. **Bình tĩnh, không sợ hãi:** Kẻ bắt nạt thường thích thú khi thấy em khóc lóc hay hoảng sợ. Hãy nhìn thẳng và nói to: "Dừng lại ngay!".\n2. **Tìm cách thoát khỏi chỗ vắng:** Nhanh chóng di chuyển về nơi đông bạn bè hoặc phòng giáo viên.\n3. **LẬP TỨC KỂ CHO NGƯỜI LỚN:** Kể ngay với cô giáo chủ nhiệm, ban giám hiệu và bố mẹ. Báo cáo không phải là mách lẻo mà là dũng cảm bảo vệ chính mình!\n4. Em cũng có thể gọi tổng đài miễn phí **111** để được các chuyên gia bảo vệ hỗ trợ bí mật.',
        followups: [
            'Làm sao để hòa đồng với bạn bè?',
            'Quy tắc 5 ngón tay là gì?',
            'Số điện thoại 111 là gì?'
        ]
    },
    {
        id: 'burn_first_aid_water_not_toothpaste',
        category: 'burn',
        badge: '',
        keywords: [
            'bị bỏng nước sôi phải làm sao',
            'bi bong nuoc soi phai lam sao',
            'sơ cứu bỏng',
            'bị bỏng',
            'bỏng nước sôi',
            'bỏng lửa'
        ],
        response: '**Các bước sơ cứu bỏng chuẩn y tế mà em cần thuộc lòng:** 🔥💧\n\n1. **Xả nước mát ngay lập tức:** Đặt vùng bị bỏng dưới vòi nước sạch chảy nhẹ trong **15 - 20 phút** để hạ nhiệt độ và giảm tổn thương sâu.\n2. **TUYỆT ĐỐI KHÔNG:**\n   ❌ Không bôi kem đánh răng, mỡ trăn, nước mắm, trứng gà lên vết bỏng.\n   ❌ Không tự ý chọc vỡ các bọng nước phồng rộp.\n3. Che nhẹ bằng gạc sạch vô khuẩn và nhờ người lớn đưa đến cơ sở y tế!',
        followups: [
            'Bôi kem đánh răng lên vết bỏng được không?',
            'Xử lý bỏng độ 1 độ 2 thế nào?',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'nosebleed_first_aid_lean_forward',
        category: 'injury',
        badge: '',
        keywords: [
            'chảy máu cam thì làm thế nào',
            'chay mau cam thi lam the nao',
            'chảy máu cam cúi hay ngửa',
            'sơ cứu chảy máu cam',
            'bị chảy máu cam',
            'xử lý chảy máu cam'
        ],
        response: '**Cách sơ cứu chảy máu cam ĐÚNG CHUẨN:** 🩸👃\n\n• **Tư thế đúng:** Ngồi thẳng lưng và **CÚI ĐẦU HƠI VỀ PHÍA TRƯỚC**.\n• **TUYỆT ĐỐI KHÔNG NGỬA ĐẦU RA SAU:** Vì máu sẽ chảy ngược vào họng gây sặc vào khí quản hoặc nôn ói!\n• **Cách bóp mũi cầm máu:** Dùng ngón cái và ngón trỏ bóp chặt hai cánh mũi trong **10 - 15 phút**, thở bằng miệng.\n• Có thể chườm khăn mát hoặc đá lạnh lên sống mũi để mạch máu co lại.',
        followups: [
            'Chó xông vào cắn thì làm gì?',
            'An toàn với dao kéo sắc nhọn',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'choking_first_aid_heimlich',
        category: 'choking',
        badge: '',
        keywords: [
            'bị hóc dị vật hoặc nghẹn đồ ăn thì làm sao',
            'bi hoc di vat hoac nghen do an thi lam sao',
            'hóc dị vật',
            'sơ cứu hóc xương',
            'nghẹn thức ăn',
            'sơ cứu hóc dị vật',
            'bị nghẹn đồ ăn'
        ],
        response: '**Khi bị hóc dị vật hoặc thấy bạn bị nghẹn không thở được:** 🍎⚠️\n\n1. **Nếu nạn nhân vẫn ho hoặc nói được:** Khuyến khích họ ho thật mạnh để tống dị vật ra ngoài.\n2. **Nếu nạn nhân tím tái, không thở được:** Cần thực hiện ngay **thủ thuật Heimlich** (vỗ lưng và ấn ngực/ép bụng).\n3. **TUYỆT ĐỐI:** Không dùng tay móc mò dị vật trong họng vì có thể đẩy dị vật vào sâu hơn, và không nuốt thêm cục cơm to!\n4. Gọi cấp cứu **115** ngay lập tức.',
        followups: [
            'Bị hóc nuốt cơm to được không?',
            'Thủ thuật Heimlich cấp cứu hóc dị vật',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'dog_bite_safety_first_aid',
        category: 'injury',
        badge: '',
        keywords: [
            'gặp chó dữ ngoài đường thì phải làm gì',
            'gap cho du ngoai duong thi phai lam gi',
            'gặp chó dữ',
            'bị chó đuổi',
            'chó cắn',
            'phòng tránh chó cắn'
        ],
        response: '**Kỹ năng đối phó an toàn khi gặp chó dữ:** 🐕⚠️\n\n1. **Đứng im như khúc gỗ:** Không bỏ chạy, không la hét. Chó có bản năng săn đuổi, nếu em chạy nó sẽ đuổi theo và cắn ngay!\n2. **Không nhìn thẳng vào mắt chó:** Vì chó coi đó là hành động khiêu chiến thách thức.\n3. **Từ từ lùi bước:** Giữ bình tĩnh, bước lùi chậm rãi ra xa.\n4. **Nếu bị ngã:** Cuộn tròn người lại như quả bóng, hai tay ôm chặt lấy đầu và cổ.\n5. **Nếu bị chó cắn:** Rửa ngay vết thương dưới vòi nước xà phòng 15 phút và đi tiêm phòng dại ngay!',
        followups: [
            'Chó xông vào cắn thì làm gì?',
            'Chảy máu cam cúi hay ngửa đầu?',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'wet_towel_fire_smoke_filter',
        category: 'fire',
        badge: 'assets/illust_electric.png',
        keywords: [
            'dùng khăn ướt che mũi miệng khi có cháy để làm gì',
            'dung khan uot che mui mieng khi co chay de lam gi',
            'tại sao dùng khăn ướt khi cháy',
            'tại sao dùng khăn ướt',
            'bịt khăn ướt lọc khói',
            'khăn ướt lọc khói'
        ],
        response: '**Tác dụng tuyệt vời của chiếc khăn ướt khi có hỏa hoạn:** 💧🧯\n\n• **Lọc khí độc:** Nước trong khăn ướt hấp thụ khí độc (như CO, CO2, bụi than mịn) và làm nguội luồng khí nóng trước khi hít vào phổi.\n• **Cách dùng:**\n  1. Nhúng đẫm khăn mặt, khẩu trang hoặc vạt áo vào nước sạch.\n  2. Gấp lại 3 - 4 lớp rồi áp chặt che kín mũi và miệng.\n  3. Thở chậm rãi, đều đặn qua khăn trong lúc bò thấp thoát ra ngoài an toàn!',
        followups: [
            'Không có khăn ướt thì sao?',
            'Tay nắm cửa nóng thì làm sao?',
            'Thoát hiểm nhà cao tầng khi cháy'
        ]
    },
    {
        id: 'fire_escape_high_rise_building',
        category: 'fire',
        badge: 'assets/illust_electric.png',
        keywords: [
            'thoát hiểm nhà cao tầng khi có cháy',
            'thoat hiem nha cao tang khi co chay',
            'cháy chung cư làm gì',
            'thoát hiểm chung cư',
            'cháy ở nhà cao tầng'
        ],
        response: '**Kỹ năng thoát hiểm sinh tử khi có cháy ở nhà cao tầng, chung cư:** 🏢🚨\n\n1. **TUYỆT ĐỐI KHÔNG DÙNG THANG MÁY:** Khi cháy, nguồn điện thường bị ngắt hoặc chập, em sẽ bị kẹt chết ngạt trong thang máy. Hãy luôn dùng **thang bộ thoát hiểm**.\n2. **Kiểm tra nhiệt độ tay nắm cửa:** Chạm mu bàn tay vào tay nắm cửa, nếu thấy nóng ran thì tuyệt đối không mở vì bên ngoài lửa đang cháy to.\n3. **Nếu bị kẹt trong phòng:** Dùng chăn/khăn ướt chèn kín khe cửa, ra ban công vẫy khăn sáng màu ra hiệu kêu cứu và gọi ngay **114**!',
        followups: [
            'Cửa nóng thì làm sao?',
            'Không có khăn ướt thì sao?',
            'Cháy điện dội nước được không?'
        ]
    },
    {
        id: 'sharp_objects_safety',
        category: 'injury',
        badge: '',
        keywords: [
            'cẩn thận với dao kéo và vật sắc nhọn',
            'can than voi dao keo va vat sac nhon',
            'dao kéo vật sắc nhọn',
            'an toàn với dao kéo',
            'vật sắc nhọn',
            'bị đứt tay'
        ],
        response: '**Quy tắc an toàn với dao kéo và các vật sắc nhọn:** ✂️🔪\n\n• **Không đùa nghịch:** Tuyệt đối không cầm dao, kéo, compa, que nhọn chạy nhảy hoặc đùa giỡn.\n• **Cách đưa kéo an toàn:** Luôn nắm phần lưỡi kéo (đã khép chặt) trong lòng bàn tay và đưa phần cán cầm cho người khác.\n• **Nếu bị đứt tay chảy máu:** Rửa sạch vết thương dưới vòi nước, dùng gạc hoặc khăn sạch ấn chặt vào vết thương 5 - 10 phút để cầm máu, rồi báo người lớn băng bó!',
        followups: [
            'Chảy máu cam cúi hay ngửa đầu?',
            'Chó xông vào cắn thì làm gì?',
            'Số điện thoại 115 là gì?'
        ]
    },
    {
        id: 'child_protection_helpline_111',
        category: 'quick',
        badge: '',
        keywords: [
            'gọi 111 bảo vệ trẻ em khi nào',
            'goi 111 bao ve tre em khi nao',
            'số điện thoại 111 là gì',
            'số 111 là gì',
            'tổng đài 111',
            'khi nào gọi 111',
            'tổng đài quốc gia bảo vệ trẻ em'
        ],
        response: '**Tổng đài Quốc gia Bảo vệ Trẻ em 111:** 📞🛡️\n\n• **Đây là đường dây nóng miễn phí 24/7** của Nhà nước dành riêng để bảo vệ các bạn nhỏ trên toàn quốc.\n• **Em hãy gọi 111 khi:**\n  1. Bản thân em hoặc bạn bè bị bạo lực, đánh đập, bóc lột.\n  2. Bị người khác đụng chạm vào vùng kín, quấy rối hoặc xâm hại.\n  3. Bị bắt nạt học đường hoặc gặp hoàn cảnh nguy hiểm cần tư vấn tâm lý, pháp lý.\n• Các cô chú ở tổng đài 111 luôn lắng nghe, bảo mật và can thiệp bảo vệ em kịp thời!',
        followups: [
            'Quy tắc 5 ngón tay là gì?',
            'Quy tắc đồ lót là gì?',
            'Bốn số điện thoại cứu hộ khẩn cấp'
        ]
    },
    {
        id: 'police_helpline_113',
        category: 'quick',
        badge: '',
        keywords: [
            'số điện thoại 113 là gì',
            'số 113 là gì',
            'gọi 113 khi nào',
            'tổng đài 113',
            'số cảnh sát 113'
        ],
        response: '**Số điện thoại khẩn cấp 113 là số của Cảnh sát phản ứng nhanh:** 👮🚨\n\n• Gọi miễn phí 24/7 khi gặp: Tội phạm trộm cướp, đánh nhau, gây rối trật tự an ninh, hoặc khi phát hiện các hành vi vi phạm pháp luật nguy hiểm cần can thiệp khẩn cấp.',
        followups: [
            'Ở nhà một mình người lạ gõ cửa thì làm gì?',
            'Người lạ cho kẹo rủ đi theo thì làm sao?',
            'Bốn số điện thoại cứu hộ khẩn cấp'
        ]
    },
    {
        id: 'medical_helpline_115',
        category: 'quick',
        badge: '',
        keywords: [
            'số điện thoại 115 là gì',
            'số 115 là gì',
            'gọi 115 khi nào',
            'tổng đài 115',
            'số cấp cứu 115'
        ],
        response: '**Số điện thoại khẩn cấp 115 là tổng đài Cấp cứu Y tế:** 🚑🚨\n\n• Gọi miễn phí 24/7 khi có người bị tai nạn thương tích nặng, đuối nước, bất tỉnh, ngộ độc, khó thở hoặc nguy kịch tính mạng cần xe cứu thương đến cấp cứu khẩn cấp.',
        followups: [
            'Bị hóc dị vật hoặc nghẹn đồ ăn làm sao?',
            'Bị bỏng nước sôi phải làm sao?',
            'Bốn số điện thoại cứu hộ khẩn cấp'
        ]
    },
    {
        id: 'wet_hands_touch_socket_danger',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'tay ướt có được chạm vào ổ cắm không',
            'tay uot co duoc cham vao o cam khong',
            'tay ướt cắm điện',
            'chạm vào ổ điện khi tay ướt',
            'tại sao tay ướt không được chạm vào điện',
            'tay ướt chạm vào điện'
        ],
        response: '**Tuyệt đối KHÔNG được chạm vào ổ cắm, công tắc hay thiết bị điện khi tay đang ướt!** ⚡💧\n\n• Nước là chất dẫn điện cực mạnh. Khi tay bị ướt, điện trở của da người giảm đi hàng trăm lần, dòng điện sẽ dễ dàng phóng qua cơ thể gây giật điện tử vong ngay lập tức!\n• **Em cần nhớ:** Luôn lau thật khô tay bằng khăn sạch trước khi chạm vào bất kỳ thiết bị điện nào nhé!',
        followups: [
            'Dùng que gỗ gạt dây điện được không?',
            'Ngắt cầu dao ở đâu?',
            'Dây điện bị hở phải làm sao?'
        ]
    },
    {
        id: 'fallen_power_line_safety',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'thấy dây điện rơi xuống đất làm gì',
            'thay day dien roi xuong dat lam gi',
            'dây điện đứt rơi xuống',
            'dây điện rơi xuống đất',
            'gặp dây điện đứt'
        ],
        response: '**Khi thấy dây điện bị đứt rơi xuống đất hoặc vỉa hè:** ⚡⚠️\n\n1. **Tránh xa ngay lập tức:** Giữ khoảng cách an toàn **ít nhất 10 mét** tính từ vị trí sợi dây điện rơi.\n2. **Tuyệt đối không chạm vào:** Không dùng que gậy chọc vào dây điện hay các vũng nước gần đó.\n3. **Cảnh báo mọi người xung quanh:** Hô to để người khác không bước vào vùng nguy hiểm.\n4. **Báo ngay cho người lớn** hoặc gọi điện báo cơ quan điện lực để cắt điện khẩn cấp!',
        followups: [
            'Dùng que gỗ gạt dây điện được không?',
            'Ngắt cầu dao ở đâu?',
            'Dây điện bị hở phải làm sao?'
        ]
    },
    {
        id: 'lightning_thunderstorm_safety',
        category: 'electric',
        badge: '',
        keywords: [
            'tránh sét đánh khi trời mưa dông',
            'tranh set danh khi troi mua dong',
            'tránh sét',
            'sét đánh trú ẩn ở đâu',
            'trời mưa sấm sét làm gì'
        ],
        response: '**Quy tắc vàng phòng tránh sét đánh khi trời mưa dông, sấm sét:** ⛈️⚡\n\n• **Nhanh chóng vào trong nhà kiên cố:** Đóng kín cửa sổ và cửa ra vào.\n• **TUYỆT ĐỐI KHÔNG:**\n  ❌ Không trú mưa dưới gốc cây to hoặc cột điện ngoài trời.\n  ❌ Không ở gần các vật kim loại (xe đạp, hàng rào sắt).\n  ❌ Không tắm ao, hồ, sông, bể bơi khi trời đang sấm sét.\n  ❌ Hạn chế dùng các thiết bị điện đang cắm sạc.\n• **Nếu đang ở giữa đồng trống:** Ngồi xổm thấp người, chụm hai chân lại, gục đầu vào đầu gối, không nằm áp sát xuống mặt đất!',
        followups: [
            'Thấy dây điện rơi xuống đất làm gì?',
            'Tay ướt có được chạm vào ổ cắm không?',
            'Bốn số điện thoại cứu hộ khẩn cấp'
        ]
    },
    {
        id: 'frayed_wire_safety',
        category: 'electric',
        badge: 'assets/illust_electric.png',
        keywords: [
            'dây điện bị hở phải làm sao',
            'day dien bi ho phai lam sao',
            'dây điện hở',
            'phát hiện dây điện bị hở',
            'dây điện rách vỏ'
        ],
        response: '**Khi phát hiện dây điện bị hở hoặc rách vỏ cách điện:** 🔌⚡\n\n1. **Tuyệt đối không chạm tay vào:** Kể cả khi chưa thấy phát ra tia lửa điện.\n2. **Báo ngay cho bố mẹ hoặc người lớn trong nhà:** Để người lớn ngắt nguồn điện và dùng băng dính cách điện chuyên dụng quấn chặt lại hoặc thay dây mới.\n3. Nhắc nhở các bạn nhỏ khác trong nhà không được đến gần khu vực dây điện hở đó!',
        followups: [
            'Ngắt cầu dao ở đâu?',
            'Dùng que gỗ gạt dây điện được không?',
            'Tay ướt có được chạm vào ổ cắm không?'
        ]
    },
    {
        id: 'emergency_numbers_list',
        category: 'quick',
        badge: '',
        keywords: [
            'các số điện thoại khẩn cấp',
            'cac so dien thoai khan cap',
            'số điện thoại khẩn cấp',
            'bốn số điện thoại cứu hộ khẩn cấp',
            'số cứu hộ'
        ],
        response: '**Bốn số điện thoại cứu hộ khẩn cấp quan trọng nhất mà em cần thuộc lòng:** 📞🚨\n\n• **111 - Tổng đài Quốc gia Bảo vệ Trẻ em** (Miễn phí 24/7): Gọi khi bị bạo lực, xâm hại hoặc cần hỗ trợ bảo vệ trẻ em.\n• **113 - Cảnh sát phản ứng nhanh**: Gọi khi gặp tội phạm, trộm cướp, mất trật tự an ninh.\n• **114 - Cứu hỏa và cứu nạn**: Gọi khi có hỏa hoạn, cháy nổ, sập đổ công trình.\n• **115 - Cấp cứu y tế**: Gọi khi có người bị thương tích nặng, đuối nước, bất tỉnh.\n\n*(Tất cả 4 số này đều miễn phí cước gọi và trực 24/24 giờ!)*',
        followups: [
            'Thấy người đuối nước có nên nhảy xuống cứu không?',
            'Cháy do điện có được dội nước không?',
            'Quy tắc 5 ngón tay là gì?'
        ]
    }
];

// Append new curated items or update existing
newItems.forEach(newItem => {
    let existing = kb.find(x => x.id === newItem.id);
    if (!existing) {
        kb.unshift(newItem); // Priority for new curated items
    } else {
        newItem.keywords.forEach(kw => {
            if (!existing.keywords.includes(kw)) existing.keywords.push(kw);
        });
        existing.response = newItem.response;
        if (newItem.badge) existing.badge = newItem.badge;
        if (newItem.followups) existing.followups = newItem.followups;
    }
});

// Also assign badges and default follow-ups if missing
kb.forEach(item => {
    if (!item.badge) {
        if (item.id.includes('drowning') || item.category === 'drowning') {
            item.badge = 'assets/illust_drowning.png';
        } else if (item.id.includes('electric') || item.category === 'electric' || item.category === 'fire') {
            item.badge = 'assets/illust_electric.png';
        } else if (item.id.includes('traffic') || item.category === 'traffic') {
            item.badge = 'assets/illust_traffic.png';
        }
    }
    if (!item.followups || item.followups.length === 0) {
        if (CATEGORY_FOLLOWUPS[item.category]) {
            item.followups = CATEGORY_FOLLOWUPS[item.category];
        }
    }
});

console.log('Final KB items count:', kb.length);

const output = `// DỮ LIỆU TRI THỨC VÀ BỘ MÁY TÌM KIẾM CỦA CHATBOT THỎ NGỌC
// Chuyên gia an toàn cho trẻ em - Tổng cộng ${kb.length} tình huống & kiến thức an toàn

window.THO_NGOC_KB = ${JSON.stringify(kb, null, 2)};
window.ENDY_KB = window.THO_NGOC_KB;

window.CATEGORY_FOLLOWUPS = ${JSON.stringify(CATEGORY_FOLLOWUPS, null, 2)};

// Chuẩn hóa tiếng Việt không dấu
function removeVietnameseTones(str) {
    if (!str) return '';
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/[\\u0300-\\u036f]/g, '');
    return str.trim();
}

// Danh sách từ dừng tiếng Việt thông dụng (không dùng để tính điểm trùng lặp đơn từ)
const STOP_WORDS = new Set([
    'là', 'gì', 'thế', 'nào', 'làm', 'sao', 'có', 'không', 'được', 'khi', 'vào', 
    'cho', 'em', 'bạn', 'và', 'của', 'ở', 'đang', 'phải', 'với', 'nhé', 'đi', 'thì',
    'la', 'gi', 'the', 'nao', 'lam', 'sao', 'co', 'khong', 'duoc', 'khi', 'vao',
    'cho', 'em', 'ban', 'va', 'cua', 'o', 'dang', 'phai', 'voi', 'nhe', 'di', 'thi'
]);

// Các từ khóa chỉ câu hỏi nối tiếp ngữ cảnh thông minh
const CONTEXT_FOLLOWUP_INDICATORS = [
    'thì sao', 'thi sao', 'làm sao', 'lam sao', 'thế nào', 'the nao',
    'được không', 'duoc khong', 'không có', 'khong co', 'gọi không', 'goi khong',
    'ở đâu', 'o dau', 'lấy gì', 'lay gi', 'tại sao', 'tai sao', 'sao',
    'bị sao', 'bi sao', 'ai', 'cái gì', 'cai gi', 'dùng gì', 'dung gi'
];

// BỘ MÁY TÌM KIẾM THÔNG MINH THỎ NGỌC HỖ TRỢ NGỮ CẢNH (CONTEXT-AWARE SEARCH)
window.searchThoNgocKB = function(userQuery, context = null) {
    if (!userQuery || typeof userQuery !== 'string') return null;
    let query = userQuery.toLowerCase().trim();
    // Bỏ dấu hỏi chấm, chấm than ở cuối câu
    query = query.replace(/[?!.,]+$/g, '').trim();

    const queryNoTone = removeVietnameseTones(query);
    const userWords = query.split(/\\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
    const userWordsNoTone = queryNoTone.split(/\\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));

    // Chào hỏi
    if (['chào', 'xin chào', 'hi', 'hello', 'alo', 'bắt đầu', 'chào bạn', 'chào thỏ ngọc', 'thỏ ngọc', 'chào endy'].includes(query) ||
        ['chao', 'xin chao', 'chao ban', 'chao tho ngoc', 'tho ngoc', 'chao endy'].includes(queryNoTone)) {
        const greetItem = window.THO_NGOC_KB.find(x => x.id === 'greeting');
        if (greetItem) return { item: greetItem, score: 1000, followups: greetItem.followups || [] };
    }

    // Kiểm tra xem query có phải là câu hỏi ngắn ngữ cảnh tiếp nối không
    let isFollowupQuery = false;
    for (let ind of CONTEXT_FOLLOWUP_INDICATORS) {
        if (query.includes(ind) || queryNoTone.includes(ind)) {
            isFollowupQuery = true;
            break;
        }
    }
    if (query.split(/\\s+/).length <= 6) {
        isFollowupQuery = true;
    }

    let bestMatch = null;
    let highestScore = 0;

    for (let i = 0; i < window.THO_NGOC_KB.length; i++) {
        const item = window.THO_NGOC_KB[i];
        let score = 0;

        for (let j = 0; j < item.keywords.length; j++) {
            let kw = item.keywords[j].toLowerCase().trim();
            kw = kw.replace(/[?!.,]+$/g, '').trim();
            const kwNoTone = removeVietnameseTones(kw);

            // 1. Khớp chính xác tuyệt đối cụm từ (ƯU TIÊN TUYỆT ĐỐI CAO NHẤT)
            if (query === kw || queryNoTone === kwNoTone) {
                score += 1000;
                break;
            }

            // 2. Query chứa nguyên cụm từ khóa hoặc ngược lại
            if (query.includes(kw) || kw.includes(query)) {
                score += 150;
            } else if (queryNoTone.includes(kwNoTone) || kwNoTone.includes(queryNoTone)) {
                score += 100;
            }

            // 3. Khớp từ có nghĩa (đã loại bỏ stop words)
            let wordMatch = 0;
            for (let w = 0; w < userWords.length; w++) {
                if (kw.includes(userWords[w])) wordMatch++;
            }
            if (wordMatch > 0) score += wordMatch * 25;

            // 4. Khớp từ không dấu có nghĩa
            let wordNoToneMatch = 0;
            for (let w = 0; w < userWordsNoTone.length; w++) {
                if (kwNoTone.includes(userWordsNoTone[w])) wordNoToneMatch++;
            }
            if (wordNoToneMatch > 0) score += wordNoToneMatch * 15;
        }

        // TĂNG ĐIỂM NGỮ CẢNH THÔNG MINH (CONTEXT AFFINITY BOOST)
        if (context && context.lastCategory && isFollowupQuery) {
            if (item.category === context.lastCategory) {
                // Thêm điểm ưu tiên nếu cùng chủ đề đang nói chuyện
                score += 120;
            }
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
        }
    }

    if (bestMatch && highestScore >= 35) {
        // Gắn danh sách gợi ý thông minh nối tiếp
        let followups = bestMatch.followups || [];
        if (!followups || followups.length === 0) {
            followups = window.CATEGORY_FOLLOWUPS[bestMatch.category] || [];
        }
        return { item: bestMatch, score: highestScore, followups: followups };
    }

    return null;
};
window.searchEndyKB = window.searchThoNgocKB;
`;

fs.writeFileSync('chatbot-data.js', output, 'utf8');
console.log('Saved updated chatbot-data.js successfully!');
