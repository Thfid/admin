let surah =[]

function addSurah(name , to , page){
    surah.push(
        {
            [name]:{
                from: 1,
                to: to,
                page: page
            }
        }
    )
}
function addreview( chapter , from , to ){
    reviews.push(
        {
            [chapter]:{
                from: from,
                to: to,
            }
        }
    )
}


addSurah("الفاتحة" , 7, 0.5)
addSurah("البقرة" , 286 , 48)
addSurah("ال عمران" , 200 , 27)
addSurah("النساء" , 176 , 30)
addSurah("المائدة" , 120 , 22)
addSurah("الانعام" , 165 , 23)
addSurah("الاعراف" , 206 , 26)
addSurah("الانفال" , 75 , 10)
addSurah("التوبة" , 129 , 21)
addSurah("يونس" ,109 , 13.45)
addSurah("هود" ,123 , 15)
addSurah("يوسف" ,111 , 13.4)
addSurah("الرعد" ,43 , 6.1)
addSurah("ابراهيم" ,52 , 6.9)
addSurah("الحجر" ,99 , 5.5)
addSurah("النحل" ,128 , 14.5)
addSurah("الاسراء" ,111 , 11.6)
addSurah("الكهف" ,110 , 10.4)
addSurah("مريم" ,98 , 7.3)
addSurah("طه" ,135 , 9.7)
addSurah("الانبياء" ,112 ,10 )
addSurah("الحج" ,78 , 10)
addSurah("المؤمنون" ,118 , 8)
addSurah("النور" ,64 , 9.75)
addSurah("الفرقان" ,77 , 7.25)
addSurah("الشعراء" ,227 , 10)
addSurah("النمل" ,93 , 8.5)
addSurah("القصص" ,88 , 11)
addSurah("العنكبوت" ,69 , 8)
addSurah("الروم" ,60 ,6.5)
addSurah("لقمان" ,34 , 4)
addSurah("السجدة" ,30 , 3)
addSurah("الأحزاب" ,73 , 10)
addSurah("سبا" ,54 , 6.5)
addSurah("فاطر" ,45 , 5.80)
addSurah("يس" ,83 , 5.5)
addSurah("الصافات" ,182 , 7)
addSurah("ص" ,88 , 5)
addSurah("الزمر" ,75 , 9)
addSurah("غافر" ,85 , 9.80)
addSurah("فصلت" ,54 , 6)
addSurah("الشورى" ,53 ,6.3 )
addSurah("الزخرف" ,89 , 6.7)
addSurah("الدخان" ,59 , 3)
addSurah("الجاثية" ,37 , 3.5)
addSurah("الاحقاف" ,35 , 4.5)
addSurah("محمد" ,38 , 4)
addSurah("الفتح" ,29 , 4.5)
addSurah("الحجرات" ,18 , 2.5)
addSurah("ق" ,45 , 2.80)
addSurah("الذاريات" ,60 , 2.65)
addSurah("الطور" ,49 , 2.5)
addSurah("النجم" ,62 , 2.5)
addSurah("القمر" ,55 ,2.70)
addSurah("الرحمن" ,78 , 3)
addSurah("الواقعة" ,96 , 3.75)
addSurah("الحديد" ,29 , 4.25)
addSurah("المجادلة" ,22 , 3.5)
addSurah("الحشر" ,24 , 3.5)
addSurah("الممتحنة" ,13 , 2.5)
addSurah("الصف" ,14 , 1.5)
addSurah("الجمعة" ,11 , 1.5)
addSurah("المنافقون" ,11 , 1.5)
addSurah("التغابن" ,18 , 2)
addSurah("الطلاق" ,12, 2)
addSurah("التحريم" ,12 , 2)
addSurah("الملك" ,30 , 2.25)
addSurah("القلم" ,52 , 2.10)
addSurah("الحاقة" ,52 , 1.80)
addSurah("المعارج" ,44 , 1.75)
addSurah("نوح" ,28 , 1.75)
addSurah("الجن" ,28 , 2)
addSurah("المزمل" ,20 , 1.50)
addSurah("المدثر" ,56 , 1.80)
addSurah("القيامة" ,40 ,1.10)
addSurah("الانسان" ,31 , 1.75)
addSurah("المرسلات" ,50 , 1.5)
addSurah("النبا" ,40 , 1.40)
addSurah("النازعات" ,46 , 2)
addSurah("عبس" ,42 , 1.20)
addSurah("التكوير" ,29 , 1.20)
addSurah("الانفطار" ,19 , 0.65)
addSurah("المطففين" ,36 , 1.25)
addSurah("الانشقاق" ,25 , 1)
addSurah("البروج" ,22, 1)
addSurah("الطارق" ,17, 0.55)
addSurah("الاعلى" ,19 , 0.55)
addSurah("الغاشية" ,26 , 1)
addSurah("الفجر" ,30 , 1.10)
addSurah("البلد" ,20 , 1)
addSurah("الشمس" ,15 ,0.75)
addSurah("الليل" ,21,0.80)
addSurah("الضحى" ,11,0.60)
addSurah("الشرح" ,8,0.20)
addSurah("التين" ,8 ,0.35)
addSurah("العلق" ,19 ,0.80)
addSurah("القدر" ,5,0.40)
addSurah("البينة" ,8 , 0.80)
addSurah("الزلزلة" ,8 , 0.40)
addSurah("العاديات" ,11 , 0.50)
addSurah("القارعة" ,11 , 0.60)
addSurah("التكاثر" ,8 ,0.30 )
addSurah("العصر" ,3 , 0.30)
addSurah("الهمزة" ,9 , 0.30)
addSurah("الفيل" ,5 , 0.30)
addSurah("قريش" ,4 , 0.25)
addSurah("الماعون" ,7,0.50)
addSurah("الكوثر" ,3 ,0.15)
addSurah("الكافرون" ,6 , 0.25)
addSurah("النصر" ,3 , 0.25)
addSurah("المسد" ,5,0.25)
addSurah("الإخلاص" ,4,0.20)
addSurah("الفلق" ,5, 0.30)
addSurah("الناس" ,6 , 0.30)

// Add reviews 
let reviews = 
[
    ["الناس" , "البينة"] , ["القدر" , "الفجر"] , ["الغاشية" , "الإنفطار"] , ["التكوير" , "النبأ"], // 1 (0 , 3)

    ["المرسلات" , "القيامة"] , ["المدثر" , "الجن"] , ["نوح" , "الحاقة"] , ["القلم" , "الملك"], // 2 (4 , 7)

    ["التحريم" , "التغابن"] , ["المنافقون" , "الصف"] , ["الممتحنة" , "الحشر"] , ["الحشر" , "المجادلة"], // 3 (8 , 11)

    ["الحديد" , "الواقعة"] , ["الرحمن" , "القمر"] , ["النجم" , "الطور"] , ["الذاريات" , "ق"], // 4 (12 , 15)

    ["الحجرات" , "الفتح"] , ["محمد" , "الأحقاف"] , // 5 (16 , 17)

    ["الجاثية" , "الدخان"] , ["الزخرف"] ,["الشورى"], // 6 (18 , 20)
    
    ["فصلت"] , ["غافر"] , ["الزمر"] ,// 7 (21 , 23)
    
    ["ص"] , ["الصافات"] , ["يس"] ,// 8 (24 , 26)
    
    ["فاطر"] , ["سبا"] , ["الأحزاب", "(5 صفحات)"] ,// 9 (27 , 29)

    ["الأحزاب", "(5 صفحات)"] , ["لقمان" , "السجدة"] , ["الروم"] ,// 10 (30 , 32)

    ["العنكبوت", "(5 صفحات)"] , ["القصص", "(5.5 صفحات)"] , ["القصص", "(5.5 صفحات)"] ,// 11 (33 , 36)

    ["النمل"] , ["الشعراء"] , ["الفرقان"] ,// 12 (37 , 40) 
]

export {surah , reviews}