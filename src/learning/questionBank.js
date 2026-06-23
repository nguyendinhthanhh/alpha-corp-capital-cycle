export const questionBank = [
  {
    "id": "q01-money-capital-start",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "money-capital",
      "capital-circuit"
    ],
    "learningObjective": "Hiểu khái niệm money-capital, capital-circuit",
    "difficulty": 1,
    "prompt": "Trong tình huống Alpha Corp, khoản vay 10.000 tỷ xuất hiện trước hết như hình thái nào của tư bản?",
    "options": [
      {
        "id": "a",
        "text": "Tư bản sản xuất",
        "isCorrect": false,
        "wrongReason": "Tư bản sản xuất chỉ xuất hiện sau khi tiền đã được chuyển hóa thành đầu vào và đi vào SX."
      },
      {
        "id": "b",
        "text": "Tư bản hàng hóa",
        "isCorrect": false,
        "wrongReason": "Tư bản hàng hóa là kết quả sau sản xuất, không phải điểm xuất phát."
      },
      {
        "id": "c",
        "text": "Tư bản tiền tệ",
        "isCorrect": true
      },
      {
        "id": "d",
        "text": "Lợi nhuận đã thực hiện",
        "isCorrect": false,
        "wrongReason": "Lợi nhuận chỉ có thể nói tới khi giá trị đã quay về và vượt quá vốn ứng trước."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Khoản vay ban đầu tồn tại dưới dạng tiền để chuẩn bị mua đất, vật liệu, máy móc và sức lao động nên nó là T.",
    "alphaCorpConnection": "Nếu T chưa được ứng ra để mua đầu vào thì chu kỳ T → H → SX → H’ → T’ chưa thể bắt đầu.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Session 8",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q02-general-formula",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "capital-circuit",
      "capital"
    ],
    "learningObjective": "Hiểu khái niệm capital-circuit, capital",
    "difficulty": 1,
    "prompt": "Công thức chung của tư bản nhấn mạnh vận động nào dưới đây?",
    "options": [
      {
        "id": "a",
        "text": "H → T → H",
        "isCorrect": false,
        "wrongReason": "Đây là công thức lưu thông hàng hóa giản đơn, không phải công thức chung của tư bản."
      },
      {
        "id": "b",
        "text": "T → H → T’",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "SX → H → SX",
        "isCorrect": false,
        "wrongReason": "Sản xuất và hàng hóa không tự khởi đầu và kết thúc tuần hoàn mà không đi qua tiền tệ."
      },
      {
        "id": "d",
        "text": "T → SX → T",
        "isCorrect": false,
        "wrongReason": "Công thức này thiếu các khâu chuyển hóa qua hàng hóa và sản xuất để làm tăng giá trị."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Công thức chung của tư bản là T → H → T’, trong đó T’ lớn hơn T vì có phần giá trị tăng thêm.",
    "alphaCorpConnection": "Alpha Corp chỉ hoàn tất logic tư bản khi số tiền quay về lớn hơn vốn ứng trước, chứ không chỉ là đổi tiền lấy tài sản.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 11",
      "fileName": "Session 11 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 11",
      "slideNumber": 6,
      "sourceExcerpt": "Tỷ suất lợi nhuận và các nhân tố ảnh hưởng tới tỷ suất lợi nhuận\r\nTỷ suất lợi nhuận: là tỷ lệ phần trăm giữa lợi nhuận và toàn bộ giá trị của tư bản ứng trước (ký hiệu là p’)\r\nTỷ suất lợi nhuận được t"
    },
    "sourceLabels": [
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Tỷ suất lợi nhuận và các nhân tố ảnh hưởng tới tỷ suất lợi nhuận\r\nTỷ suất lợi nhuận: là tỷ lệ phần trăm giữa lợi nhuận và toàn bộ giá trị của tư bản ứng trước (ký hiệu là p’)\r\nTỷ suất lợi nhuận được t",
      "sourceFileName": "Session 11 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 11",
      "slideNumber": 6,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q03-surplus-value-production",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "surplus-value",
      "productive-capital"
    ],
    "learningObjective": "Hiểu khái niệm surplus-value, productive-capital",
    "difficulty": 1,
    "prompt": "Giá trị thặng dư được tạo ra trực tiếp ở giai đoạn nào?",
    "options": [
      {
        "id": "a",
        "text": "Khi mua đầu vào T → H",
        "isCorrect": false,
        "wrongReason": "Giai đoạn này chỉ mua bán, trao đổi ngang giá và chuẩn bị các yếu tố sản xuất, chưa tạo ra giá trị mới."
      },
      {
        "id": "b",
        "text": "Trong quá trình sản xuất SX",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Khi bán hàng hóa H’ → T’",
        "isCorrect": false,
        "wrongReason": "Đây chỉ là quá trình thực hiện giá trị đã tạo ra trong sản xuất, không tự sinh ra giá trị thặng dư mới."
      },
      {
        "id": "d",
        "text": "Khi ngân hàng giải ngân khoản vay",
        "isCorrect": false,
        "wrongReason": "Giải ngân chỉ cung cấp tư bản tiền tệ ban đầu dưới dạng vốn vay, chưa đi vào sản xuất để tạo giá trị mới."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Giá trị thặng dư được tạo ra trong SX thông qua việc sức lao động tạo ra giá trị mới lớn hơn giá trị của chính nó.",
    "alphaCorpConnection": "Khâu bán hàng chỉ thực hiện giá trị đã có; nó không tự tạo ra giá trị thặng dư mới cho Alpha Corp.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 6",
      "fileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 4,
      "sourceExcerpt": "Thị trường là tổng hòa những quan hệ kinh tế trong đó nhu cầu của các chủ thể được đáp ứng thông qua việc trao đổi, mua bán với sự xác định giá cả và số lượng hàng hóa, dịch vụ tương ứng với trình độ "
    },
    "sourceLabels": [
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Thị trường là tổng hòa những quan hệ kinh tế trong đó nhu cầu của các chủ thể được đáp ứng thông qua việc trao đổi, mua bán với sự xác định giá cả và số lượng hàng hóa, dịch vụ tương ứng với trình độ ",
      "sourceFileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 4,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q04-hprime-not-cash",
    "type": "true-false",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "commodity-capital",
      "liquidity"
    ],
    "learningObjective": "Hiểu khái niệm commodity-capital, liquidity",
    "difficulty": 1,
    "prompt": "Đúng hay sai: Khi ba tòa tháp mới dừng ở phần thô, Alpha Corp đã có ngay lượng tiền đủ để trả lương vì tài sản của họ đã tăng.",
    "options": [],
    "correctAnswer": "false",
    "explanation": "Tài sản dưới dạng H’ chưa tự động trở thành tiền mặt. Thanh khoản chỉ xuất hiện khi giá trị được thực hiện qua H’ → T’.",
    "alphaCorpConnection": "Đây chính là lý do doanh nghiệp có tài sản lớn nhưng vẫn rơi vào khủng hoảng chi trả.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Capital Lab"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q05-space-condition-balance",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "spatial-condition",
      "money-capital",
      "commodity-capital"
    ],
    "learningObjective": "Hiểu khái niệm spatial-condition, money-capital, commodity-capital",
    "difficulty": 2,
    "prompt": "Điều kiện liên tục về mặt không gian đòi hỏi điều gì?",
    "options": [
      {
        "id": "a",
        "text": "Toàn bộ vốn phải tồn tại ở dạng hàng hóa để tối đa hóa lợi nhuận",
        "isCorrect": false,
        "wrongReason": "Nếu dồn toàn bộ vốn vào hàng hóa, chu kỳ sẽ bị tắc nghẽn ở khâu khác và gây mất cân đối thanh khoản."
      },
      {
        "id": "b",
        "text": "Tổng tư bản phải đồng thời phân bố ở nhiều hình thái khác nhau",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Doanh nghiệp phải mở rộng địa lý của dự án",
        "isCorrect": false,
        "wrongReason": "Không gian ở đây đề cập đến sự cùng tồn tại của các hình thái tư bản, không phải địa lý vật lý."
      },
      {
        "id": "d",
        "text": "Chỉ cần giữ thật nhiều tiền dự phòng",
        "isCorrect": false,
        "wrongReason": "Nếu chỉ giữ tiền mặt mà không đưa vào sản xuất và hàng hóa thì tư bản không thể vận động để sinh lời."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Điều kiện không gian nói tới việc tổng tư bản phải tồn tại đồng thời ở các hình thái tiền tệ, sản xuất và hàng hóa.",
    "alphaCorpConnection": "Nếu Alpha Corp dồn gần hết vốn vào H’ thì phần T cần cho lương, lãi và vận hành sẽ thiếu hụt.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 9",
      "fileName": "Session 9 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 9",
      "slideNumber": 5,
      "sourceExcerpt": "Sản xuất giá trị thặng dư tuyệt đối\r\nLàm tăng ca thêm 3h, thời gian lao động cần thiết không đổi (5h)\r\ncần thiết: 8h\r\nthặng dư: 8h"
    },
    "sourceLabels": [
      "Session 8",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Sản xuất giá trị thặng dư tuyệt đối\r\nLàm tăng ca thêm 3h, thời gian lao động cần thiết không đổi (5h)\r\ncần thiết: 8h\r\nthặng dư: 8h",
      "sourceFileName": "Session 9 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 9",
      "slideNumber": 5,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q06-time-condition-hprime",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "temporal-condition",
      "circulation-time"
    ],
    "learningObjective": "Hiểu khái niệm temporal-condition, circulation-time",
    "difficulty": 2,
    "prompt": "Điều kiện liên tục về mặt thời gian bị đứt ở đâu khi căn hộ không bán được?",
    "options": [
      {
        "id": "a",
        "text": "Ở T → H vì doanh nghiệp không mua đất nữa",
        "isCorrect": false,
        "wrongReason": "Việc mua đất bị ảnh hưởng sau đó, nhưng điểm đứt gãy trực tiếp ban đầu nằm ở khâu bán hàng."
      },
      {
        "id": "b",
        "text": "Ở SX vì công nhân ngừng tạo giá trị mới",
        "isCorrect": false,
        "wrongReason": "Sản xuất vẫn tiếp tục tạo ra phần thô, điểm tắc nghẽn trực tiếp là ở khâu tiêu thụ sản phẩm."
      },
      {
        "id": "c",
        "text": "Ở H’ → T’ vì giá trị chưa quay lại thành tiền",
        "isCorrect": true
      },
      {
        "id": "d",
        "text": "Ở T’ → T vì tiền tự mất giá",
        "isCorrect": false,
        "wrongReason": "Tiền mất giá không phải nguyên nhân đứt gãy tuần hoàn thời gian do căn hộ không bán được."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Điều kiện thời gian nhấn mạnh các khâu phải nối tiếp nhau liên tục. Khi H’ không bán được, T’ không hình thành nên chu kỳ sau bị treo.",
    "alphaCorpConnection": "Đây là nút nghẽn trọng tâm đã được project xác minh cho Alpha Corp.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Session 8",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q07-turnover-formula",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "capital-turnover",
      "production-time",
      "circulation-time"
    ],
    "learningObjective": "Hiểu khái niệm capital-turnover, production-time, circulation-time",
    "difficulty": 1,
    "prompt": "Thời gian chu chuyển của tư bản bằng gì?",
    "options": [
      {
        "id": "a",
        "text": "Thời gian sản xuất + thời gian lưu thông",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Thời gian lao động + thời gian nghỉ",
        "isCorrect": false,
        "wrongReason": "Đây chỉ là các bộ phận trong thời gian sản xuất, chưa bao gồm thời gian lưu thông."
      },
      {
        "id": "c",
        "text": "Thời gian xây dựng + thời gian marketing",
        "isCorrect": false,
        "wrongReason": "Đây là các hoạt động cụ thể, không phản ánh đầy đủ hai phạm trù lớn là thời gian sản xuất và lưu thông."
      },
      {
        "id": "d",
        "text": "Thời gian vay vốn + thời gian trả lãi",
        "isCorrect": false,
        "wrongReason": "Đây là các mốc thời gian tài chính của khoản vay, không phải thời gian chu chuyển của tư bản."
      }
    ],
    "correctAnswer": "a",
    "explanation": "Chu chuyển tư bản tính cả phần tư bản nằm trong sản xuất lẫn phần tư bản nằm trong lưu thông.",
    "alphaCorpConnection": "Một dự án có sản xuất dài và bán hàng chậm sẽ kéo dài toàn bộ chu chuyển của Alpha Corp.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 8",
      "slideNumber": 29,
      "sourceExcerpt": "29\r\nTrong đó:\r\nN: Số vòng quay/năm\r\nCH: Thời gian tư bản vận động trong 1 năm \r\nch: Thời gian một vòng quay\r\nTốc độ chu chuyển của tư bản\r\nTốc độ chu chuyển: là đại lượng dùng để chỉ sự vận động nhanh"
    },
    "sourceLabels": [
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "29\r\nTrong đó:\r\nN: Số vòng quay/năm\r\nCH: Thời gian tư bản vận động trong 1 năm \r\nch: Thời gian một vòng quay\r\nTốc độ chu chuyển của tư bản\r\nTốc độ chu chuyển: là đại lượng dùng để chỉ sự vận động nhanh",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 8",
      "slideNumber": 29,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q08-market-freeze-effect",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "market",
      "circulation-time",
      "liquidity"
    ],
    "learningObjective": "Hiểu khái niệm market, circulation-time, liquidity",
    "difficulty": 2,
    "prompt": "Thị trường bất động sản đóng băng tác động trực tiếp nhất đến đại lượng nào của Alpha Corp?",
    "options": [
      {
        "id": "a",
        "text": "Làm giảm thời gian sản xuất",
        "isCorrect": false,
        "wrongReason": "Thị trường đóng băng làm chậm khâu bán hàng (lưu thông), không làm giảm thời gian sản xuất."
      },
      {
        "id": "b",
        "text": "Làm tăng thời gian lưu thông",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Làm tăng ngay giá trị thặng dư",
        "isCorrect": false,
        "wrongReason": "Lưu thông bị tắc nghẽn ngăn cản việc thực hiện giá trị thặng dư chứ không làm tăng nó."
      },
      {
        "id": "d",
        "text": "Làm biến hàng hóa thành tiền nhanh hơn",
        "isCorrect": false,
        "wrongReason": "Ngược lại, đóng băng làm chậm quá trình chuyển hóa hàng hóa thành tiền."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Khi sức mua yếu, hàng hóa khó tiêu thụ nên thời gian lưu thông kéo dài và vòng quay vốn chậm lại.",
    "alphaCorpConnection": "Ba tòa tháp dừng ở dạng H’ lâu hơn, khiến chi trả lãi và lương bị căng thẳng.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q09-interest-origin",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "interest",
      "profit",
      "surplus-value"
    ],
    "learningObjective": "Hiểu khái niệm interest, profit, surplus-value",
    "difficulty": 2,
    "prompt": "Lợi tức mà Alpha Corp phải trả cho ngân hàng, xét đến cùng, được nhường từ đâu?",
    "options": [
      {
        "id": "a",
        "text": "Từ vốn tự có của ngân hàng",
        "isCorrect": false,
        "wrongReason": "Lợi tức là khoản doanh nghiệp đi vay phải trả cho ngân hàng, không phải tiền từ ngân hàng tự cấp."
      },
      {
        "id": "b",
        "text": "Từ giá trị thặng dư được tạo ra trong sản xuất",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Từ quá trình in tiền của Nhà nước",
        "isCorrect": false,
        "wrongReason": "Nhà nước in tiền không tạo ra giá trị thặng dư làm nguồn gốc thực tế cho lợi tức."
      },
      {
        "id": "d",
        "text": "Từ việc tài sản tự tăng giá bất kỳ",
        "isCorrect": false,
        "wrongReason": "Tài sản tăng giá trên giấy tờ không tạo ra giá trị thặng dư thực tế để chi trả lợi tức."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Lợi tức là một phần của lợi nhuận, mà lợi nhuận là hình thức biểu hiện của giá trị thặng dư.",
    "alphaCorpConnection": "Nếu H’ chưa bán được, Alpha Corp vẫn phải thanh toán nghĩa vụ lãi dù giá trị chưa quay về.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 11",
      "fileName": "Session 11 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 11",
      "slideNumber": 9,
      "sourceExcerpt": "Lợi nhuận thương nghiệp: Bản chất của lợi nhuận thương nghiệp: là phần giá trị thặng dư được tạo ra từ sản xuất, do các nhà tư bản công nghiệp “nhường” cho các nhà tư bản thương nghiệp."
    },
    "sourceLabels": [
      "Session 11",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Lợi nhuận thương nghiệp: Bản chất của lợi nhuận thương nghiệp: là phần giá trị thặng dư được tạo ra từ sản xuất, do các nhà tư bản công nghiệp “nhường” cho các nhà tư bản thương nghiệp.",
      "sourceFileName": "Session 11 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 11",
      "slideNumber": 9,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q10-assets-vs-cash",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "liquidity",
      "commodity-capital"
    ],
    "learningObjective": "Hiểu khái niệm liquidity, commodity-capital",
    "difficulty": 2,
    "prompt": "Phát biểu nào diễn đạt đúng nhất sự khác biệt giữa “nhiều tài sản” và “có thanh khoản”?",
    "options": [
      {
        "id": "a",
        "text": "Có tài sản lớn thì luôn có thể dùng thay tiền ngay",
        "isCorrect": false,
        "wrongReason": "Tài sản phi tiền mặt như công trình dở dang không thể dùng để trực tiếp chi trả lương hay nợ vay đến hạn."
      },
      {
        "id": "b",
        "text": "Thanh khoản đo khả năng biến tài sản thành tiền đúng lúc để đáp ứng nghĩa vụ",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Thanh khoản chỉ quan trọng với ngân hàng, không quan trọng với doanh nghiệp sản xuất",
        "isCorrect": false,
        "wrongReason": "Mọi doanh nghiệp đều cần thanh khoản để tránh nguy cơ phá sản do đứt dòng tiền."
      },
      {
        "id": "d",
        "text": "Tài sản dở dang càng nhiều thì thanh khoản càng cao",
        "isCorrect": false,
        "wrongReason": "Tài sản dở dang bị kẹt vốn lâu thực chất làm giảm thanh khoản của doanh nghiệp."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Thanh khoản không đồng nhất với quy mô tài sản, mà gắn với khả năng chuyển thành tiền đúng thời điểm.",
    "alphaCorpConnection": "Alpha Corp có tài sản dở dang lớn nhưng vẫn thiếu tiền mặt để trả lương và lãi.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Capital Lab"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q11-accumulation-condition",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "accumulation",
      "reproduction",
      "surplus-value"
    ],
    "learningObjective": "Hiểu khái niệm accumulation, reproduction, surplus-value",
    "difficulty": 2,
    "prompt": "Điều kiện tiên quyết để tái sản xuất mở rộng là gì?",
    "options": [
      {
        "id": "a",
        "text": "Vay thêm vốn bất kể khả năng bán hàng",
        "isCorrect": false,
        "wrongReason": "Vay thêm vốn vô tội vạ không tạo ra tích lũy thực tế mà tăng rủi ro nợ nần."
      },
      {
        "id": "b",
        "text": "Biến một phần giá trị thặng dư thành tư bản mới",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Giảm lương để tạo cảm giác lợi nhuận",
        "isCorrect": false,
        "wrongReason": "Giảm lương làm suy yếu khả năng tái sản xuất sức lao động, không tạo ra tích lũy tư bản bền vững."
      },
      {
        "id": "d",
        "text": "Giữ toàn bộ tiền trong trạng thái dự trữ",
        "isCorrect": false,
        "wrongReason": "Giữ toàn bộ tiền mặt mà không đầu tư mở rộng sẽ chỉ là tích trữ (hoarding), không phải tích lũy để tái sản xuất mở rộng."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Tái sản xuất mở rộng đòi hỏi tích lũy, tức dùng một phần giá trị thặng dư để mở rộng quy mô tư bản.",
    "alphaCorpConnection": "Nếu Alpha Corp chưa chuyển H’ thành T’ thì cũng chưa thể nói tới tích lũy bền vững.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 10",
      "fileName": "Session 10 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 10",
      "slideNumber": 5,
      "sourceExcerpt": "Tích lũy tư bản là tái sản xuất ra tư bản với quy mô ngày càng mở rộng."
    },
    "sourceLabels": [
      "Session 10"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Tích lũy tư bản là tái sản xuất ra tư bản với quy mô ngày càng mở rộng.",
      "sourceFileName": "Session 10 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 10",
      "slideNumber": 5,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q12-reproduction-break",
    "type": "true-false",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "reproduction",
      "capital-turnover"
    ],
    "learningObjective": "Hiểu khái niệm reproduction, capital-turnover",
    "difficulty": 2,
    "prompt": "Đúng hay sai: Chỉ cần dự án từng tạo ra hàng hóa thì chu kỳ tái sản xuất sau sẽ tự động diễn ra, bất kể tiền có quay về hay không.",
    "options": [],
    "correctAnswer": "false",
    "explanation": "Tái sản xuất chỉ lặp lại khi tư bản quay vòng thành công và có đủ điều kiện để bắt đầu chu kỳ mới.",
    "alphaCorpConnection": "Không có T’ quay về, Alpha Corp thiếu nguồn để mua đầu vào và duy trì vận động của vốn.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Session 10",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q13-profit-vs-interest",
    "type": "multiple-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "profit",
      "interest"
    ],
    "learningObjective": "Hiểu khái niệm profit, interest",
    "difficulty": 3,
    "prompt": "Chọn tất cả phát biểu phù hợp với phân biệt giữa lợi nhuận và lợi tức.",
    "options": [
      {
        "id": "a",
        "text": "Lợi nhuận là hình thức biểu hiện ra ngoài của giá trị thặng dư",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Lợi tức là phần lợi nhuận phải nhường cho tư bản cho vay",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Lợi tức luôn được tạo ra ngoài sản xuất nên không liên hệ với giá trị thặng dư",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Doanh nghiệp có thể phải trả lợi tức ngay cả khi chưa thu được tiền bán hàng",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a,b,d",
    "explanation": "Lợi tức không tách rời giá trị thặng dư; nó là phần lợi nhuận phải nhường cho chủ nợ vốn.",
    "alphaCorpConnection": "Alpha Corp vẫn chịu nghĩa vụ lãi trong lúc H’ còn mắc kẹt ngoài thị trường.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 11",
      "fileName": "Session 11 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 11",
      "slideNumber": 9,
      "sourceExcerpt": "lợi nhuận thương nghiệp \r\nBản chất của tư bản thương nghiệp: Là một bộ phận của tư bản công nghiệp tách rời ra khi phân công lao động xã hội đã phát triển."
    },
    "sourceLabels": [
      "Session 11",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "lợi nhuận thương nghiệp \r\nBản chất của tư bản thương nghiệp: Là một bộ phận của tư bản công nghiệp tách rời ra khi phân công lao động xã hội đã phát triển.",
      "sourceFileName": "Session 11 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 11",
      "slideNumber": 9,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q14-order-cycle",
    "type": "ordering",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "capital-circuit"
    ],
    "learningObjective": "Hiểu khái niệm capital-circuit",
    "difficulty": 2,
    "prompt": "Sắp xếp đúng trình tự vận động cơ bản của tư bản trong dự án Alpha Corp.",
    "options": [
      {
        "id": "t",
        "text": "T",
        "isCorrect": false
      },
      {
        "id": "h",
        "text": "H",
        "isCorrect": false
      },
      {
        "id": "sx",
        "text": "SX",
        "isCorrect": false
      },
      {
        "id": "hp",
        "text": "H’",
        "isCorrect": false
      },
      {
        "id": "tp",
        "text": "T’",
        "isCorrect": false
      }
    ],
    "correctAnswer": "t,h,sx,hp,tp",
    "explanation": "Tư bản bắt đầu ở dạng tiền, đi qua mua đầu vào, sản xuất, xuất hiện dưới dạng hàng hóa rồi mới quay về tiền lớn hơn.",
    "alphaCorpConnection": "Sai thứ tự thường kéo theo nhầm lẫn giữa nơi tạo giá trị và nơi thực hiện giá trị.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 8",
      "slideNumber": 31,
      "sourceExcerpt": "Nó được sử dụng trong sản xuất và chuyển giá trị nhanh vào sản phẩm sau khi bán hàng hoá thu tiền về."
    },
    "sourceLabels": [
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Nó được sử dụng trong sản xuất và chuyển giá trị nhanh vào sản phẩm sau khi bán hàng hoá thu tiền về.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 8",
      "slideNumber": 31,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q15-space-condition-scenario",
    "type": "scenario",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "spatial-condition",
      "liquidity",
      "money-capital"
    ],
    "learningObjective": "Hiểu khái niệm spatial-condition, liquidity, money-capital",
    "difficulty": 3,
    "prompt": "Alpha Corp dồn gần như toàn bộ vốn vào công trình dở dang, chỉ giữ lượng tiền rất mỏng. Kết luận nào sát nhất về điều kiện không gian?",
    "options": [
      {
        "id": "a",
        "text": "Điều kiện không gian được tăng cường vì tài sản vật chất nhiều hơn",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Điều kiện không gian bị mất cân đối vì thiếu phần tư bản tiền tệ để nối chu kỳ",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Không liên quan, vì điều kiện không gian chỉ nói về địa điểm xây dựng",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Đây chỉ ảnh hưởng đến lợi nhuận, không liên hệ thanh khoản",
        "isCorrect": false
      }
    ],
    "correctAnswer": "b",
    "explanation": "Điều kiện không gian đòi hỏi tư bản đồng thời tồn tại ở nhiều hình thái; dồn quá nhiều vào H’ sẽ làm thiếu T.",
    "alphaCorpConnection": "Đây là một mô tả trực tiếp của trạng thái thiếu thanh khoản trong case Alpha Corp.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Session 8",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q16-temporal-condition-scenario",
    "type": "scenario",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "temporal-condition",
      "circulation-time",
      "capital-turnover"
    ],
    "learningObjective": "Hiểu khái niệm temporal-condition, circulation-time, capital-turnover",
    "difficulty": 3,
    "prompt": "Công trình vẫn tiếp tục thi công nhưng lượng căn bán ra giảm mạnh, khiến tiền về chậm hơn nhiều. Đây là rủi ro nổi bật nào?",
    "options": [
      {
        "id": "a",
        "text": "Điều kiện thời gian bị căng vì H’ → T’ kéo dài",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Giá trị thặng dư tăng nhanh hơn",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Điều kiện không gian hoàn toàn không còn ý nghĩa",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Doanh nghiệp đã hoàn thành chu chuyển vốn",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a",
    "explanation": "Điều kiện thời gian tập trung vào nhịp nối tiếp các khâu; bán chậm làm chu kỳ sau bị trì hoãn.",
    "alphaCorpConnection": "Đó là cách thị trường đóng băng chuyển thành khủng hoảng vận động vốn ở Alpha Corp.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q17-production-vs-circulation",
    "type": "multiple-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "production-time",
      "circulation-time",
      "capital-turnover"
    ],
    "learningObjective": "Hiểu khái niệm production-time, circulation-time, capital-turnover",
    "difficulty": 3,
    "prompt": "Chọn tất cả yếu tố làm kéo dài thời gian lưu thông nhiều hơn là thời gian sản xuất.",
    "options": [
      {
        "id": "a",
        "text": "Thị trường giảm sức mua, bán chậm",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Khó ký hợp đồng tiêu thụ để chuyển H’ thành tiền",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Quy trình thi công phần thô kéo dài vì kỹ thuật",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Người mua trì hoãn quyết định xuống tiền",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a,b,d",
    "explanation": "Các yếu tố liên quan tiêu thụ và thu tiền thuộc lưu thông; yếu tố kỹ thuật thi công thuộc sản xuất.",
    "alphaCorpConnection": "Case Alpha Corp nổi bật ở phần lưu thông bị ách tắc, không phải vì H’ chưa hề được tạo ra.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 9",
      "fileName": "Session 9 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 9",
      "slideNumber": 6,
      "sourceExcerpt": "Tăng cường độ lao động <> Tăng năng suất lao động\r\nSản xuất giá trị thặng dư tuyệt đối\r\n Những con đường chủ yếu để sản xuất  ra giá trị thặng dư tuyệt đối:  \r\nTăng thời gian làm việc trong 1 ngày, th"
    },
    "sourceLabels": [
      "Session 8",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Tăng cường độ lao động <> Tăng năng suất lao động\r\nSản xuất giá trị thặng dư tuyệt đối\r\n Những con đường chủ yếu để sản xuất  ra giá trị thặng dư tuyệt đối:  \r\nTăng thời gian làm việc trong 1 ngày, th",
      "sourceFileName": "Session 9 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 9",
      "slideNumber": 6,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q18-commodity-vs-productive",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "productive-capital",
      "commodity-capital"
    ],
    "learningObjective": "Hiểu khái niệm productive-capital, commodity-capital",
    "difficulty": 2,
    "prompt": "Điểm phân biệt đúng nhất giữa tư bản sản xuất và tư bản hàng hóa trong case Alpha Corp là gì?",
    "options": [
      {
        "id": "a",
        "text": "Tư bản sản xuất là tiền vay, tư bản hàng hóa là lãi phải trả",
        "isCorrect": false,
        "wrongReason": "Tiền vay thuộc tư bản tiền tệ, lãi phải trả thuộc phạm trù lợi tức."
      },
      {
        "id": "b",
        "text": "Tư bản sản xuất tồn tại trong SX; tư bản hàng hóa là kết quả hàng hóa sau SX",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Hai khái niệm giống nhau, chỉ khác cách gọi",
        "isCorrect": false,
        "wrongReason": "Tư bản sản xuất nằm trong quá trình thi công sản xuất, còn tư bản hàng hóa là sản phẩm mang giá trị đã hoàn thành giai đoạn sản xuất."
      },
      {
        "id": "d",
        "text": "Tư bản hàng hóa luôn có thanh khoản cao hơn tư bản sản xuất",
        "isCorrect": false,
        "wrongReason": "Thanh khoản tùy thuộc vào khả năng tiêu thụ, tư bản hàng hóa bị đóng băng vẫn có thanh khoản cực thấp."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Tư bản sản xuất nằm trong quá trình tạo ra giá trị mới; tư bản hàng hóa là sản phẩm mang giá trị sau sản xuất.",
    "alphaCorpConnection": "Ba tòa tháp phần thô là H’, không còn là bản thân quá trình SX nữa.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 6",
      "fileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 5,
      "sourceExcerpt": "Phân loại thị trường\r\nCăn cứ theo đối tượng trao đổi:\r\nThị trường hàng hóa, dịch vụ\r\nCăn cứ vào phạm vi các quan hệ:\r\nThị trường trong nước và thị trường thế giới\r\nCăn cứ vào vai trò của các yếu tố đư"
    },
    "sourceLabels": [
      "Session 8",
      "Capital Lab"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Phân loại thị trường\r\nCăn cứ theo đối tượng trao đổi:\r\nThị trường hàng hóa, dịch vụ\r\nCăn cứ vào phạm vi các quan hệ:\r\nThị trường trong nước và thị trường thế giới\r\nCăn cứ vào vai trò của các yếu tố đư",
      "sourceFileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 5,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q19-liquidity-mistake",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "liquidity",
      "commodity-capital"
    ],
    "learningObjective": "Hiểu khái niệm liquidity, commodity-capital",
    "difficulty": 2,
    "prompt": "Nhầm lẫn nào dưới đây là sai lầm điển hình về thanh khoản?",
    "options": [
      {
        "id": "a",
        "text": "Cho rằng tài sản dở dang có thể thay thế ngay cho tiền lương đến hạn",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Xem việc bán chậm là yếu tố kéo dài lưu thông",
        "isCorrect": false,
        "wrongReason": "Đây là nhận định chính xác về thời gian lưu thông, không phải sai lầm."
      },
      {
        "id": "c",
        "text": "Nhận ra H’ chưa tự động là T’",
        "isCorrect": false,
        "wrongReason": "Nhận thức này hoàn toàn đúng đắn theo lý thuyết chu kỳ tuần hoàn tư bản."
      },
      {
        "id": "d",
        "text": "Phân biệt tài sản với tiền mặt",
        "isCorrect": false,
        "wrongReason": "Việc phân biệt này là cần thiết và đúng đắn, không phải sai lầm thanh khoản."
      }
    ],
    "correctAnswer": "a",
    "explanation": "Tài sản dở dang có giá trị nhưng không tự động làm nghĩa vụ tiền mặt biến mất.",
    "alphaCorpConnection": "Đây là cách hiểu sai phổ biến khi nhìn case Alpha Corp chỉ qua quy mô tài sản.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q20-case-decision-buffer",
    "type": "scenario",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "money-capital",
      "liquidity",
      "spatial-condition"
    ],
    "learningObjective": "Hiểu khái niệm money-capital, liquidity, spatial-condition",
    "difficulty": 4,
    "prompt": "Trong một giai đoạn tín dụng bị siết, quyết định nào có logic học thuật thận trọng hơn để duy trì vận động của vốn?",
    "options": [
      {
        "id": "a",
        "text": "Dồn toàn lực mở rộng công trình để nhanh có nhiều hàng hóa hơn",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Giữ một phần tư bản tiền tệ để đảm bảo nghĩa vụ ngắn hạn và nối chu kỳ",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Bỏ hoàn toàn phần tiền lương để dồn vào vật liệu",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Xem thanh khoản là chuyện thứ yếu, chỉ cần tài sản tăng",
        "isCorrect": false
      }
    ],
    "correctAnswer": "b",
    "explanation": "Khi rủi ro lưu thông tăng, duy trì phần T đủ dùng giúp doanh nghiệp còn khả năng trả nghĩa vụ và tiếp tục chu kỳ.",
    "alphaCorpConnection": "Đây không phải tư vấn kinh doanh thực tế, mà là cách diễn giải điều kiện không gian trên case giả định.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q21-interest-before-sales",
    "type": "true-false",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "interest",
      "liquidity"
    ],
    "learningObjective": "Hiểu khái niệm interest, liquidity",
    "difficulty": 2,
    "prompt": "Đúng hay sai: Nếu H’ chưa bán được thì Alpha Corp chưa cần đối mặt với áp lực lợi tức.",
    "options": [],
    "correctAnswer": "false",
    "explanation": "Nghĩa vụ lãi tồn tại theo hạn vay, không chờ doanh nghiệp bán xong hàng hóa mới phát sinh.",
    "alphaCorpConnection": "Đó là lý do đứt thanh khoản nhanh chóng biến thành sức ép nợ.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 11"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q22-market-liquidity-links",
    "type": "multiple-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "market",
      "liquidity",
      "circulation-time"
    ],
    "learningObjective": "Hiểu khái niệm market, liquidity, circulation-time",
    "difficulty": 3,
    "prompt": "Chọn tất cả nhận định đúng về liên hệ giữa thị trường và thanh khoản trong case Alpha Corp.",
    "options": [
      {
        "id": "a",
        "text": "Thị trường yếu có thể khiến H’ nằm lâu hơn ngoài lưu thông",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Thanh khoản tốt chỉ phụ thuộc vào quy mô tài sản đang xây dở",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Khi sức mua suy giảm, H’ → T’ trở nên khó khăn hơn",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Thị trường đóng băng có thể kéo dài thời gian lưu thông",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a,c,d",
    "explanation": "Thị trường ảnh hưởng trực tiếp đến khả năng thực hiện giá trị và do đó ảnh hưởng đến thanh khoản.",
    "alphaCorpConnection": "Alpha Corp mắc nghẽn vì thị trường không hấp thụ được lượng hàng hóa đã tạo ra.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q23-order-break-consequence",
    "type": "ordering",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "capital-turnover",
      "liquidity",
      "temporal-condition"
    ],
    "learningObjective": "Hiểu khái niệm capital-turnover, liquidity, temporal-condition",
    "difficulty": 4,
    "prompt": "Sắp xếp chuỗi hệ quả hợp lý nhất khi H’ không bán được trong thời gian dài.",
    "options": [
      {
        "id": "a",
        "text": "Thanh khoản giảm",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "T’ quay về chậm",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Chu kỳ tái sản xuất sau bị chậm",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Nghĩa vụ ngắn hạn trở nên căng",
        "isCorrect": false
      }
    ],
    "correctAnswer": "b,a,d,c",
    "explanation": "H’ bán chậm khiến T’ quay về trễ; từ đó thanh khoản suy yếu, nghĩa vụ ngắn hạn căng lên và chu kỳ sau bị chậm.",
    "alphaCorpConnection": "Đây là cách đọc logic “đứt gãy H’ → T’” theo chuỗi tác động, không chỉ theo một điểm tĩnh.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q24-accumulation-vs-hoarding",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "accumulation",
      "reproduction",
      "money-capital"
    ],
    "learningObjective": "Hiểu khái niệm accumulation, reproduction, money-capital",
    "difficulty": 3,
    "prompt": "Phát biểu nào phân biệt đúng giữa tích lũy tư bản và việc chỉ giữ tiền bất động?",
    "options": [
      {
        "id": "a",
        "text": "Tích lũy là biến một phần giá trị thặng dư thành tư bản mới để mở rộng vận động",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Tích lũy là cất tiền lại và không cho nó tham gia chu kỳ nữa",
        "isCorrect": false,
        "wrongReason": "Đó là hành vi tích trữ tiền tệ (hoarding), làm nghẽn chu kỳ tuần hoàn tư bản."
      },
      {
        "id": "c",
        "text": "Tích lũy và thanh khoản là một khái niệm",
        "isCorrect": false,
        "wrongReason": "Tích lũy liên quan đến quy mô tư bản mở rộng, thanh khoản liên quan đến khả năng chi trả bằng tiền mặt."
      },
      {
        "id": "d",
        "text": "Tích lũy chỉ diễn ra trong lưu thông, không liên quan sản xuất",
        "isCorrect": false,
        "wrongReason": "Tích lũy đòi hỏi giá trị thặng dư tạo ra từ sản xuất được nhập vào tư bản ứng trước để tái đầu tư."
      }
    ],
    "correctAnswer": "a",
    "explanation": "Tích lũy gắn với việc mở rộng tư bản, chứ không phải đóng băng giá trị dưới dạng cất trữ thụ động.",
    "alphaCorpConnection": "Alpha Corp chỉ có thể nói tới tích lũy khi giá trị đã thực hiện xong và một phần được tái đầu tư.",
    "origin": "derived-from-slide",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Session 10"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q25-reproduction-loop",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "reproduction",
      "capital-circuit"
    ],
    "learningObjective": "Hiểu khái niệm reproduction, capital-circuit",
    "difficulty": 3,
    "prompt": "Tái sản xuất trong bối cảnh website này nên được hiểu gần nhất là gì?",
    "options": [
      {
        "id": "a",
        "text": "Một lần xây xong dự án là kết thúc toàn bộ vận động",
        "isCorrect": false,
        "wrongReason": "Đó là tái sản xuất đơn lẻ hoặc chu kỳ khép kín, không thể hiện tính chất lặp lại liên tục."
      },
      {
        "id": "b",
        "text": "Quá trình chu kỳ vốn được lặp lại để duy trì hoặc mở rộng sản xuất",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Chỉ là việc nhân bản hàng hóa về số lượng",
        "isCorrect": false,
        "wrongReason": "Tái sản xuất là sự vận động tổng thể của các hình thái tư bản, không đơn giản là sản xuất thêm số lượng sản phẩm."
      },
      {
        "id": "d",
        "text": "Chỉ nói tới việc ngân hàng phát hành thêm tín dụng",
        "isCorrect": false,
        "wrongReason": "Tín dụng ngân hàng chỉ hỗ trợ cung cấp tư bản tiền tệ, không đại diện cho toàn bộ quá trình tái sản xuất."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Tái sản xuất nhấn mạnh việc chu kỳ vốn được lặp lại, không phải một biến cố sản xuất đơn lẻ.",
    "alphaCorpConnection": "Nếu T’ không quay về, Alpha Corp thậm chí khó duy trì cả tái sản xuất giản đơn.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 6",
      "fileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 9,
      "sourceExcerpt": "9\r\nThứ nhất\r\nCó sự đa dạng của chủ thế kinh tế, nhiều hình thức sở hữu\r\nThứ ba\r\nGiá cả được hình thành theo nguyên tắc thị trường, cạnh tranh vừa là động lực vừa môi trường thúc đẩy sản xuất kinh doan"
    },
    "sourceLabels": [
      "Session 10",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "9\r\nThứ nhất\r\nCó sự đa dạng của chủ thế kinh tế, nhiều hình thức sở hữu\r\nThứ ba\r\nGiá cả được hình thành theo nguyên tắc thị trường, cạnh tranh vừa là động lực vừa môi trường thúc đẩy sản xuất kinh doan",
      "sourceFileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 9,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q26-weakest-link",
    "type": "scenario",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "commodity-capital",
      "liquidity",
      "capital-turnover"
    ],
    "learningObjective": "Hiểu khái niệm commodity-capital, liquidity, capital-turnover",
    "difficulty": 4,
    "prompt": "Nếu một người nói “Alpha Corp giàu lên vì đã có nhiều công trình dở dang hơn”, phản hồi học thuật chặt hơn là gì?",
    "options": [
      {
        "id": "a",
        "text": "Đúng, vì càng nhiều H’ thì tiền mặt càng chắc chắn tăng",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Chưa thể kết luận, vì H’ chưa thực hiện được giá trị thì doanh nghiệp vẫn có thể thiếu thanh khoản",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Đúng, vì sản xuất luôn quan trọng hơn lưu thông",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Không cần xét đến T’ vì tài sản đã đủ lớn",
        "isCorrect": false
      }
    ],
    "correctAnswer": "b",
    "explanation": "Quy mô H’ không tự bảo đảm thanh khoản. Cần xem giá trị có thực hiện được thành T’ hay không.",
    "alphaCorpConnection": "Đây là câu hỏi lõi giúp phân biệt tài sản với tiền mặt trong case Alpha Corp.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Capital Lab"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q27-spatial-temporal-separate",
    "type": "multiple-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "spatial-condition",
      "temporal-condition"
    ],
    "learningObjective": "Hiểu khái niệm spatial-condition, temporal-condition",
    "difficulty": 4,
    "prompt": "Chọn các mô tả đúng về khác biệt giữa điều kiện không gian và điều kiện thời gian.",
    "options": [
      {
        "id": "a",
        "text": "Điều kiện không gian hỏi tư bản đang được phân bố đồng thời ra sao giữa các hình thái",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Điều kiện thời gian hỏi các khâu có nối tiếp kịp để chu kỳ sau khởi động hay không",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Điều kiện không gian chỉ nói về vị trí địa lý xây dựng dự án",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Điều kiện thời gian chỉ cần nhìn vào một thời điểm tĩnh mà không xét nhịp quay vòng",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a,b",
    "explanation": "Không gian nói tới cơ cấu đồng thời của các hình thái tư bản; thời gian nói tới nhịp nối tiếp và độ trễ của chu kỳ.",
    "alphaCorpConnection": "Alpha Corp vừa có nguy cơ mất cân đối hình thái vốn, vừa có nguy cơ chu kỳ quay lại quá chậm.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 9",
      "fileName": "Session 9 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 9",
      "slideNumber": 4,
      "sourceExcerpt": "Thời gian lao động tất yếu không đổi."
    },
    "sourceLabels": [
      "Session 8",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Thời gian lao động tất yếu không đổi.",
      "sourceFileName": "Session 9 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 9",
      "slideNumber": 4,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q28-profit-not-sales-only",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "profit",
      "surplus-value",
      "capital-circuit"
    ],
    "learningObjective": "Hiểu khái niệm profit, surplus-value, capital-circuit",
    "difficulty": 3,
    "prompt": "Lập luận nào chặt hơn về lợi nhuận của Alpha Corp?",
    "options": [
      {
        "id": "a",
        "text": "Chỉ cần giá bán cao là tự động có lợi nhuận bền vững",
        "isCorrect": false,
        "wrongReason": "Giá bán cao nhưng không bán được hàng hoặc chi phí đầu vào quá lớn thì vẫn không có lợi nhuận thực tế."
      },
      {
        "id": "b",
        "text": "Lợi nhuận phải được nhìn trong quan hệ với toàn bộ tư bản ứng trước và việc thực hiện giá trị",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Lợi nhuận không liên quan gì đến lưu thông",
        "isCorrect": false,
        "wrongReason": "Lợi nhuận không thể thực hiện nếu hàng hóa bị kẹt trong lưu thông (không bán được)."
      },
      {
        "id": "d",
        "text": "Lợi nhuận và lợi tức là cùng một đại lượng",
        "isCorrect": false,
        "wrongReason": "Lợi tức chỉ là một phần được trích ra từ lợi nhuận để trả cho chủ nợ."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Lợi nhuận là hình thức biểu hiện của giá trị thặng dư trên toàn bộ tư bản ứng trước và còn phụ thuộc việc giá trị có được thực hiện hay không.",
    "alphaCorpConnection": "Bán chậm hoặc không bán được sẽ làm phần “lợi nhuận kỳ vọng” của Alpha Corp không thể hiện thực.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Session 11",
      "Case Alpha Corp"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q29-case-recovery",
    "type": "scenario",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "liquidity",
      "capital-circuit",
      "reproduction"
    ],
    "learningObjective": "Hiểu khái niệm liquidity, capital-circuit, reproduction",
    "difficulty": 4,
    "prompt": "Theo logic học thuật của project, đâu là điều kiện cốt lõi để Alpha Corp có thể mở lại vòng tái sản xuất tiếp theo?",
    "options": [
      {
        "id": "a",
        "text": "Tiếp tục tăng khối lượng công trình dở dang",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Khơi thông khả năng chuyển H’ thành T’ để tiền quay về",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Bỏ qua nghĩa vụ lãi để tập trung xây tiếp",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Giữ nguyên mọi tài sản ở dạng hiện tại vì chúng đã có giá trị",
        "isCorrect": false
      }
    ],
    "correctAnswer": "b",
    "explanation": "Chu kỳ tiếp theo cần tiền quay về để mua lại đầu vào và duy trì nghĩa vụ; nút này nằm ở H’ → T’.",
    "alphaCorpConnection": "Đây là nội dung được source of truth của project nêu rõ như nút nghẽn trọng tâm.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "docs/02-ACADEMIC-SOURCE-OF-TRUTH.md"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q30-market-not-perfect",
    "type": "single-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "market",
      "liquidity"
    ],
    "learningObjective": "Hiểu khái niệm market, liquidity",
    "difficulty": 3,
    "prompt": "Câu nào phản ánh đúng nhất vai trò của thị trường trong case Alpha Corp?",
    "options": [
      {
        "id": "a",
        "text": "Thị trường luôn hấp thụ hàng hóa nếu hàng hóa có giá trị",
        "isCorrect": false,
        "wrongReason": "Hàng hóa có giá trị nhưng thiếu sức mua xã hội (sức mua có khả năng thanh toán) thì vẫn bị tồn kho."
      },
      {
        "id": "b",
        "text": "Thị trường là nơi giá trị chỉ được thực hiện khi có sức mua tương ứng",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Thị trường không ảnh hưởng tới chu chuyển tư bản",
        "isCorrect": false,
        "wrongReason": "Thị trường quyết định thời gian lưu thông, do đó trực tiếp quyết định tốc độ chu chuyển tư bản."
      },
      {
        "id": "d",
        "text": "Thị trường chỉ quyết định lợi tức, không liên quan thanh khoản",
        "isCorrect": false,
        "wrongReason": "Thị trường quyết định việc bán hàng, do đó liên quan mật thiết đến thanh khoản dòng tiền."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Giá trị của hàng hóa không tự thực hiện; cần có sức mua thực tế trên thị trường.",
    "alphaCorpConnection": "Sự đứt gãy của Alpha Corp đến từ việc hàng hóa không được hấp thụ đủ nhanh.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 6",
      "fileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 6,
      "sourceExcerpt": "Vai trò của thị trường\r\nThị trường kích thích sự sáng tạo của mọi thành viên trong xã hội, tạo ra cách thức phân bổ nguồn lực hiệu quả trong nền kinh tế\r\nThị trường thực hiện giá trị hàng hóa, là điều"
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": true,
      "excerptFoundInSource": true,
      "exactSourceExcerpt": "Vai trò của thị trường\r\nThị trường kích thích sự sáng tạo của mọi thành viên trong xã hội, tạo ra cách thức phân bổ nguồn lực hiệu quả trong nền kinh tế\r\nThị trường thực hiện giá trị hàng hóa, là điều",
      "sourceFileName": "Session 6 ChuÌ_oÌ_ng 2 HaÌ_ng hoÌ_a, thiÌ£ truÌ_oÌ_Ì_ng vaÌ_ vai troÌ_ cuÌ_a caÌ_c chuÌ_ theÌ_Ì_ tham gia thiÌ£ truÌ_oÌ_Ì_ng.pptx.txt",
      "sessionOrSlot": "Session 6",
      "slideNumber": 6,
      "answerEntailedBySource": true,
      "explanationSupportedBySource": true,
      "distractorsSupported": true,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "medium",
      "recommendedDecision": "ready-for-human-review",
      "issues": []
    }
  },
  {
    "id": "q31-review-liquidity-cluster",
    "type": "multiple-choice",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "liquidity",
      "market",
      "commodity-capital"
    ],
    "learningObjective": "Hiểu khái niệm liquidity, market, commodity-capital",
    "difficulty": 4,
    "prompt": "Chọn các dấu hiệu cho thấy Alpha Corp đang bị kẹt ở cụm vấn đề thanh khoản thay vì chỉ thiếu “tài sản”.",
    "options": [
      {
        "id": "a",
        "text": "Có nghĩa vụ lãi và lương đến hạn trong khi tiền về chậm",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Hàng hóa dở dang có giá trị nhưng khó tiêu thụ",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Doanh nghiệp đã có thêm nhiều tài sản nên chắc chắn chi trả dễ hơn",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Thời gian lưu thông kéo dài làm chu kỳ vốn chậm lại",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a,b,d",
    "explanation": "Cụm vấn đề thanh khoản bộc lộ khi nghĩa vụ tiền mặt đến hạn nhưng giá trị chưa chuyển hóa thành tiền.",
    "alphaCorpConnection": "Đây là mô tả cô đọng của điểm đứt gãy H’ → T’.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Capital Lab"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  },
  {
    "id": "q32-advanced-balance",
    "type": "scenario",
    "chapter": 3,
    "session": 8,
    "topic": "TBD",
    "conceptIds": [
      "spatial-condition",
      "temporal-condition",
      "liquidity"
    ],
    "learningObjective": "Hiểu khái niệm spatial-condition, temporal-condition, liquidity",
    "difficulty": 5,
    "prompt": "Một quyết định “đẩy thật nhanh phần thi công để bù cho bán chậm” có rủi ro lý luận nào nếu không tăng được sức mua?",
    "options": [
      {
        "id": "a",
        "text": "Có thể làm H’ tích tụ thêm, làm mất cân đối không gian và kéo dài tắc nghẽn thời gian",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Chắc chắn khôi phục T’ vì sản xuất luôn giải quyết được lưu thông",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Không ảnh hưởng gì đến thanh khoản miễn là tài sản tăng",
        "isCorrect": false
      },
      {
        "id": "d",
        "text": "Tự động biến lợi tức thành lợi nhuận",
        "isCorrect": false
      }
    ],
    "correctAnswer": "a",
    "explanation": "Nếu đầu ra không tiêu thụ được, tăng thêm H’ có thể khiến tư bản càng dồn vào hàng hóa và làm chu kỳ quay về chậm hơn.",
    "alphaCorpConnection": "Đây là dạng đánh đổi quan trọng sẽ được dùng lại trong Case Mission.",
    "origin": "alpha-corp-application",
    "source": {
      "sourceId": "Session 8",
      "fileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "sourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay."
    },
    "sourceLabels": [
      "Case Alpha Corp",
      "Session 8"
    ],
    "verificationStatus": "verified",
    "evidence": {
      "sourceReadable": true,
      "sourceFileExists": true,
      "slideNumberVerified": false,
      "excerptFoundInSource": false,
      "normalizedSourceExcerpt": "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.",
      "sourceFileName": "Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx",
      "sessionOrSlot": "Session 8",
      "slideNumber": 1,
      "answerEntailedBySource": false,
      "explanationSupportedBySource": false,
      "distractorsSupported": false,
      "alphaCorpFactsSupported": true,
      "secondarySourceSupported": true,
      "confidence": "unverifiable",
      "recommendedDecision": "needs-source-fix",
      "issues": [
        "Không tìm thấy exact excerpt."
      ]
    }
  }
];

export const verifiedQuestionBank = questionBank.filter(question => question.verificationStatus === 'verified');
export const questionMap = new Map(verifiedQuestionBank.map((question) => [question.id, question]));
export function getQuestionById(questionId) { return questionMap.get(questionId); }
export const dailyChallengeQuestionIds = [
  "q08-market-freeze-effect",
  "q15-space-condition-scenario",
  "q16-temporal-condition-scenario",
  "q20-case-decision-buffer",
  "q23-order-break-consequence",
  "q27-spatial-temporal-separate",
  "q29-case-recovery",
  "q32-advanced-balance"
];
