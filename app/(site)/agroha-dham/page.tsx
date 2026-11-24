"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import HeadingDivider from "@/components/HeadingDivider";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AgrohaDhamPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const templeImages = [
    {
      src: "/images/agroha/one.jpeg",
      alt: "Agroha Dham 1",
    },
    {
      src: "/images/agroha/two.jpeg",
      alt: "Agroha Dham 2",
    },
    {
      src: "/images/agroha/three.jpeg",
      alt: "Agroha Dham 3",
    },
    {
      src: "/images/agroha/four.jpeg",
      alt: "Agroha Dham 4",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] text-[#2B201A] font-sans selection:bg-[#7F160C] selection:text-white pb-20 sm:pb-28">
      {/* 1. TOP NEWS TICKER */}
      <div className="w-full bg-[#7F160C] text-white py-2 sm:py-2.5 overflow-hidden select-none relative z-30 shadow-sm border-b border-[#69120A]">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[1, 2].map((set) => (
            <div
              key={`ticker-set-${set}`}
              className="flex items-center shrink-0 gap-8 sm:gap-12 px-4 text-xs sm:text-sm font-semibold tracking-wide"
              aria-hidden={set > 1 ? "true" : undefined}
            >
              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>अग्रवाल वैश्य विकास संगठन — अग्रोहा धाम पावन तीर्थ दर्शन</span>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>महाराजा अग्रसेन की राजधानी अग्रोहा — वैश्य समाज का सर्वोच्च आस्था केंद्र</span>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 relative p-0.5">
                  <Image src="/images/agarwal/logo.png" alt="AVVS" fill className="object-contain" />
                </span>
                <span>संगठन • नेतृत्व • स्वावलंबन • विकास</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN ABOUT AGROHA DHAM SECTION */}
      <section className="pt-10 sm:pt-14 pb-4 sm:pb-6 bg-[#FFF9F2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#7F160C] tracking-tight">
            About Agroha Dham
          </h1>
          <HeadingDivider className="mt-3.5" />
        </div>
      </section>

      {/* 3. CONTENT SECTION */}
      <section className="py-4 sm:py-8 bg-[#FFF9F2]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Main Card Container */}
          <div className="bg-white rounded-none border border-[#E8DFD3] shadow-xs p-4 sm:p-10 lg:p-12 space-y-8">
            
            {/* Carousel / Image Gallery with Embla Infinite Loop */}
            <div className="relative group select-none">
              <div ref={emblaRef} className="overflow-hidden rounded-xl">
                <div className="flex -ml-3 sm:-ml-4">
                  {templeImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="min-w-0 pl-3 sm:pl-4 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] shrink-0"
                    >
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E8DFD3] shadow-xs bg-amber-50/20">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Chevrons */}
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#7F160C] shadow-md border border-[#E8DFD3] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 z-10"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#7F160C] shadow-md border border-[#E8DFD3] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 z-10"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Mobile pagination indicator dots */}
              <div className="flex justify-center items-center gap-1.5 mt-3.5 sm:hidden">
                {templeImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollTo(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      selectedIndex === idx ? "w-6 bg-[#7F160C]" : "w-1.5 bg-[#E8DFD3]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Complete Official Text */}
            <div className="space-y-4 text-sm md:text-base font-medium leading-7 md:leading-8 text-black/90 text-justify font-sans">
              <p>
                अग्रोहा वह जगह है जहाँ हमारे पूर्वजों का संबंध है। यहीं पर हमारे पूर्वज महाराजा अग्रसेन का शासन था। महाराजा अग्रसेन सूर्यवंश के क्षत्रिय थे। वे अयोध्या नरेश श्री राम के पुत्र कुश की वंश-परंपरा में 36वीं पीढ़ी के वंशज थे। ऐसा भी कहा जाता है कि महाभारत युद्ध के बाद उन्होंने अग्रोहा को अपनी राजधानी बनाया था। अग्रोहा के ऐतिहासिक अभिलेखों के अनुसार, उनके पिता ने महाभारत युद्ध में भाग लिया था। अग्रोहा तक्षशिला और मथुरा को जोड़ने वाले प्राचीन व्यापार मार्ग पर स्थित है। इसलिए इसमें कोई आश्चर्य की बात नहीं है कि सबसे लोकप्रिय और सफल व्यापारी समुदाय की जड़ें यहीं से जुड़ी हैं। 566 एकड़ में फैला अग्रोहा का यह प्राचीन टीला, जिसमें किले जैसी संरचना सहित ईंटों से बनी कई इमारतें हैं, तीसरी-चौथी शताब्दी ईसा पूर्व से लेकर लगभग 13वीं-14वीं शताब्दी ईस्वी तक के अवशेष समेटे हुए है। यह इतिहास का एक लंबा कालखंड है। खुदाई के दौरान यहाँ कुषाण और गुप्त काल के मिट्टी के बर्तन मिले थे।
              </p>

              <p>
                अग्रोहा धाम 67 एकड़ के विशाल परिसर में फैला है, जिसका निर्माण 1976-84 ईस्वी के बीच किया गया था। यहाँ का मुख्य आकर्षण त्रिकूट मंदिर है, जिसमें तीन ऊँचे शिखर हैं। मंदिर के सबसे ऊपरी हिस्से में, घोड़ों पर सवार सूर्य देव की एक बड़ी मूर्ति आपका स्वागत करती है। यह सूर्य वंश या सूर्यवंशम को दर्शाता है। कहा जाता है कि महाराजा अग्रसेन ने महालक्ष्मी की पूजा की थी और वे उनके सामने प्रकट हुई थीं। तब से, वे इस कुल की मुख्य देवी बन गई हैं। यहाँ महालक्ष्मी की मूर्ति चार भुजाओं वाली और खड़ी मुद्रा में है। उनके दो हाथों में कमल है और बाकी दो हाथ अभय और वरद मुद्रा में हैं, जो निडरता और आशीर्वाद का प्रतीक हैं। गर्भगृह के अंदर, आप महालक्ष्मी के दोनों ओर राम दरबार और राधा-कृष्ण की कांच की पेंटिंग देख सकते हैं। बगल की दीवार पर, आप महाराजा अग्रसेन की पेंटिंग देख सकते हैं जिसमें वे महालक्ष्मी की पूजा कर रहे हैं, जब देवी ने उन्हें दर्शन दिए बाईं ओर का मंदिर अग्रवाल कुल के मूल पुरुष महाराजा अग्रसेन को समर्पित है। एक राजा के रूप में उनकी मूर्ति सिंहासन पर बैठी हुई दिखाई गई है। उनके चारों ओर उनके 18 पुत्र हैं, जो अब अग्रवाल समुदाय के 18 गोत्र हैं। यहाँ एक राम दरबार भी है। दाईं ओर के मंदिर में सरस्वती देवी बैठी हुई मुद्रा में हैंय उन्होंने सफेद वस्त्र पहने हैं और वे वीणा बजा रही हैं। इसके बगल में कल्कि भगवान की मूर्ति है - जो विष्णु का भविष्य का अवतार हैं और घोड़े पर सवार हैं। परिसर में मौजूद अन्य मंदिरों में 90 फुट ऊंची हनुमान की मूर्ति शामिल है, जो नीचे बने छोटे लेकिन बहुत सुंदर हनुमान मंदिर के ऊपर स्थित है। यहाँ दुर्गा के रूप में देवी और द्वारकाधीश के रूप में कृष्ण के मंदिर भी हैं। मुख्य मंदिर के पीछे एक मंदिर है जिसमें सभी 12 ज्योतिर्लिंगों की प्रतिकृतियां हैं।
              </p>

              <p>
                इनमें महाकाल सबसे बड़े हैं। यहाँ का सबसे बड़ा त्योहार शरद ऋतु में आश्विन महीने के दौरान मनाया जाता है। आश्विन महीने के पहले दिन महाराजा अग्रसेन की जयंती मनाई जाती है। इस महीने की पूर्णिमा, जिसे शरद पूर्णिमा कहा जाता है, महालक्ष्मी के वार्षिक उत्सव के रूप में मनाई जाती है। अग्रोहा कभी एक विशाल, शानदार और समृद्ध शहर हुआ करता था। इसकी समृद्धि और ख्याति दूर-दूर तक फैली हुई थी। जब भाट इसकी प्रशंसा में गीत गाते थे, तो सुनने वालों की रगों में वीरता का जोश भर जाता था। इसकी उपजाऊ जमीन और समृद्धि ने विदेशियों को हमेशा आकर्षित किया। नतीजतन, अग्रोहा को यूनानियों, शकों, हूणों, कुषाणों और ईरानियों के लगातार हमलों का सामना करना पड़ा। इसके बावजूद, अग्रोहा का मजबूत राज्य हमेशा बहादुरी से अपनी रक्षा करता रहा और अपने शहर को बचाने के लिए अडिग रहा। हालाँकि, बार-बार होने वाली लड़ाइयों में जान-माल के भारी नुकसान ने अग्रेय राज्य को कमजोर कर दिया। लोग एक-एक करके शहर छोड़ने लगे। आखिरकार, मोहम्मद गोरी के हमले ने अग्रोहा के निवासियों को हमेशा के लिए अपनी मातृभूमि छोड़ने पर मजबूर कर दिया। अपनी जान और सामान लेकर भागते हुए, अग्रोहा के लोग आगे बढ़े और राजस्थान, पंजाब, उत्तर प्रदेश, मध्य प्रदेश आदि जैसे पड़ोसी क्षेत्रों में बस गए, जहाँ भी किस्मत उन्हें ले गई। धीरे-धीरे वे देश के सभी हिस्सों में फैल गए। 1907 में, ब्रह्मानंद ब्रह्मचारी नाम के एक साधु अग्रोहा पहुँचे। उन्होंने अग्रवाल समुदाय के प्रतिनिधियों को प्रेरित करके 1908 में अग्रवाल दरबार नाम का एक समूह बनाया। वहाँ एक गौशाला, एक शिव मंदिर और 18 सती स्मारक बनवाए गए। 1976 में ऑल इंडिया अग्रवाल रिप्रेजेंटेटिव्स के सम्मेलन में आधुनिक मंदिर बनाने का फैसला लिया गया। इस काम के लिए श्री कृष्ण मोदी और रामेश्वर दास गुप्ता की देखरेख में एक ट्रस्ट बनाया गया। लक्ष्मी नारायण गुप्ता ने ट्रस्ट को जमीन दान में दी और तिलक राज अग्रवाल की देखरेख में निर्माण कार्य शुरू हुआ। मुख्य मंदिर का निर्माण 1984 में पूरा हुआ और आज ये धाम अपने हजारों सालों के इतिहास को समेटे देश में ही नहीं अपितु विदेश तक बसे महाराजा अग्रसेन के वंशजों को अपनी जड़ों से जोड़े हुए है।
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
