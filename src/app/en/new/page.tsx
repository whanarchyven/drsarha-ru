import MainBlock from '@/src/widgets/main-block';
import PostsBlock from '@/src/widgets/posts-block';
import {usePathname, useRouter} from "next/navigation";

export default function Home() {
    const posts = [
        {
            id: 'e1',
            title: 'Isotretinoin Found Effective in Treating Acne in People Undergoing Masculinizing Hormone Therapy',
            description: 'A study has found isotretinoin effective in treating acne in individuals undergoing masculinizing hormone therapy. Among 55 participants, 87.3% reported improvement, and 47.3% reported complete resolution of acne. The best results were achieved with cumulative doses ≥ 120 mg/kg. Side effects included dry skin, joint pain, and headaches. Further research is needed to determine optimal dosages and overcome treatment barriers in transgender individuals receiving testosterone.',
            source: 'Medscape',
            file: '/posts/en/Isotretinoin Appears Effective for Acne in Transgender Individuals on Hormone Therapy.pdf',
        },
        {
            id: 'e2',
            title: 'Adolescent Immigrant Successfully Treated for Hemophagocytic Lymphohistiocytosis (HLH) Without Corticosteroids and Chemotherapy',
            description: 'An adolescent immigrant with newly diagnosed HIV/AIDS and histoplasmosis was successfully treated for HLH without using corticosteroids and chemotherapy, utilizing anakinra. This case underscores the importance of a comprehensive and individualized approach in treating HLH with multiple infections.',
            source: 'PubMed',
            file: '/posts/en/Successful management of haemophagocytic lymphohistiocytosis in an adolescent with newly diagnosed HIV_AIDS and histoplasmosis.pdf',
        },
        {
            id: 'e3',
            title: 'Study on Giant Congenital Melanocytic Nevi (CMN) Identifies Secondary Proliferation',
            description: 'A study of 10 patients with giant congenital melanocytic nevi (CMN) identified secondary proliferation with Schwannian and/or perineuriomatous differentiation. Patients ranged from 3 months to 57 years old. Four subgroups of proliferation were identified: nodular, diffuse, plexiform neurofibroma-like, and perineuriomatous. The role of Schwann cells in these changes is discussed.',
            source: 'PubMed',
            file: '/posts/en/Schwannian and Perineuriomatous Differentiation in a Series of Giant Congenital Melanocytic Nevi.pdf',
        },
        {
            id: 'e4',
            title: 'Artificial Intelligence Enhances Diagnosis and Personalized Treatment in Dermatology',
            description: 'AI is improving diagnosis and personalizing treatment in dermatology. Its applications in dermatopathology, climate-induced skin diseases, and care for undocumented immigrants are discussed. Ethical issues and new treatments for atopic dermatitis, including the effectiveness of dupilumab in children and persistent hand eczema, are noted.',
            source: 'PubMed',
            file: '/posts/en/Editor_s Highlights - July 2024.pdf',
        },
        {
            id: 'e5',
            title: 'Dupilumab Found Effective in Reducing Symptoms of Chronic Spontaneous Urticaria',
            description: 'At a conference in Scottsdale, a study showed that dupilumab effectively reduces symptoms of chronic spontaneous urticaria in patients unresponsive to antihistamines. Participants receiving dupilumab were significantly more likely to achieve urticaria control and had fewer serious side effects. These results support dupilumab as a promising treatment for chronic spontaneous urticaria.',
            source: 'Dermatology Times',
            file: '/posts/en/Treating Chronic Spontaneous Urticaria_ Findings from the LIBERTY-CSU CUPID Study A.pdf',
        },
        {
            id: 'e6',
            title: 'LIBERTY-AD-HAFT Study Shows Dupilumab Effective in Treating Atopic Hand and Foot Dermatitis (AHFD)',
            description: 'The LIBERTY-AD-HAFT study demonstrated that dupilumab effectively reduces the severity of lesions in AHFD. The study included patients with moderate to severe AHFD receiving dupilumab or placebo for 16 weeks. Dupilumab significantly reduced lesion severity across all morphological subtypes of AHFD, including chronic dry, hyperkeratotic (palm/sole), and others. Dupilumab\'s safety was consistent with previous data, supporting its potential as an effective treatment for severe AHFD.',
            source: 'Dermatology Times',
            file: '/posts/en/Efficacy of Dupilumab in Treating Atopic Hand and Foot Dermatitis.pdf',
        },
        {
            id: 'e7',
            title: 'Early Intervention Essential in Treating Alopecia Areata',
            description: 'Dr. James Song emphasized the importance of early intervention in treating alopecia areata. Effective therapies include JAK inhibitors baricitinib and ritlecitinib, as well as the promising deuruxolitinib. These medications have shown high efficacy and good safety profiles. Song highlighted the genetic and immunological aspects of the disease and noted the growing interest in oral minoxidil for treating various types of hair loss.',
            source: 'Dermatology Times',
            file: '/posts/en/Navigating the Alopecia Areata Treatment Landscape.pdf',
        },
        {
            id: 'e8',
            title: 'New Advances in Seborrheic Dermatitis Treatment Highlighted',
            description: 'At the 2024 conference, Dr. Raj Chovatiya emphasized the importance of treating seborrheic dermatitis (Seb D) and called for studying its causes, including the immune system and skin barrier, rather than just the yeast Malassezia. He noted the success of new therapies like topical foam roflumilast (Zoryve) and the potential of JAK inhibitors and hormonal receptor agonists. Chovatiya stressed the need for simple and effective solutions for patients, especially for hair-bearing areas, and the importance of further research to improve Seb D treatment.',
            source: 'Dermatology Times',
            file: '/posts/en/Unraveling the Advancements in Seborrheic Dermatitis Treatment.pdf',
        },
        {
            id: 'e9',
            title: 'Importance of Vaccination Highlighted at 2024 Conference',
            description: 'Dr. Mark Serota emphasized the importance of vaccination, its high efficacy, and safety at the 2024 conference. He recommended remembering key age milestones for live vaccines (1 and 4 years) and dispelled myths about immune system overload. Serota provided tips for dermatologists on vaccinating patients on biologics, noting that dupilumab is safe for vaccination. He highlighted important vaccines, such as those for yellow fever, shingles, MMR, and chickenpox, and recommended precautions for patients on immunosuppressants.',
            source: 'Dermatology Times',
            file: '/posts/en/Integrating Vaccination Guidelines in Dermatology.pdf',
        },
        {
            id: 'e10',
            title: 'Relevance and Impact of "Black Box" Warnings Discussed',
            description: 'Dr. Jason Hawkes discussed the limited relevance and impact of "black box" warnings on dermatological medications at the 2024 conference. He noted that such warnings, while informative, can be misleading and cause unnecessary anxiety. Examples included warnings about dupilumab\'s association with T-cell lymphoma and warnings for calcineurin inhibitors and IL-17 inhibitors, which may not reflect actual risk. Hawkes emphasized the need for a balanced approach based on scientific data to avoid rejecting effective therapies due to potentially misleading warnings.',
            source: 'Dermatology Times',
            file: '/posts/en/Boxed Warnings_ What Should Dermatology Clinicians Know.pdf',
        },
        {
            id: 'e11',
            title: 'Combining Systemic Therapies for Psoriasis and Atopic Dermatitis',
            description: 'At the 2024 conference, Dr. James Song presented a strategy for combining systemic therapies to treat psoriasis (PsO) and atopic dermatitis (AD). Combination therapy improves treatment outcomes, manages comorbidities, and enhances safety. Modern biologics are effective and long-lasting, facilitating therapy changes. Song emphasized the importance of accurate diagnosis, avoiding duplication of therapeutic pathways, and considering potential toxicities. He also provided successful examples from his practice and offered recommendations for accessing biological therapy for patients.',
            source: 'Dermatology Times',
            file: '/posts/en/Combining Systemic Therapies in Psoriasis and Atopic Dermatitis.pdf',
        },
        {
            id: 'e12',
            title: 'AI\'s Growing Role in Skin Cancer Detection',
            description: 'AI in dermatology, especially for skin cancer detection, is becoming more acceptable to patients and physicians. Joseph Zabinski of OM1 noted that AI reduces diagnostic barriers but requires improved accuracy and representative data. OM1 is working on the ethical use of AI. Physicians should use AI to enhance practices with minimal disruption. AI has the potential to significantly improve early detection and personalized treatment of skin cancer.',
            source: 'Dermatology Times',
            file: '/posts/en/Joseph Zabinski, PhD, MEM_ Navigating the Future of AI in Skin Cancer Detection.pdf',
        },
        {
            id: 'e13',
            title: 'Severity Strata for Vitiligo Defined Using Validated Physician Global Assessment Scores',
            description: 'Researchers from Belgium and the Netherlands published a study in the Journal of Clinical Medicine, defining the severity strata of vitiligo using validated physician global assessment (PGA) scores. The study, conducted at Ghent University, confirmed the validity and reliability of PGA for assessing disease worsening and repigmentation. They identified correlations between changes in affected skin area and PGA scores. These results may help standardize international definitions of vitiligo activity and improvement, facilitating clinical decision-making and patient inclusion in future studies.',
            source: 'Dermatology Times',
            file: '/posts/en/New Study Defines Severity Strata for Vitiligo Using Validated Physician Global Assessment Scores.pdf',
        },
        {
            id: 'e14',
            title: 'VYNE Therapeutics Initiates Phase 2b Trial of BET Inhibitor VYN201 for Vitiligo',
            description: 'VYNE Therapeutics has initiated a phase 2b trial of VYN201, a new BET inhibitor for treating nonspecific vitiligo. The trial involves 160 participants, lasts 24 weeks with a 28-week extension. The primary goal is to achieve 50% improvement in facial vitiligo by week 24. Previous trials showed rapid onset and good safety of VYN201, confirming its potential in treating inflammatory diseases.',
            source: 'Dermatology Times',
            file: '/posts/en/VYNE Therapeutics Initiates Phase 2b Trial of BET Inhibitor VYN201 for Vitiligo.pdf',
        },
        {
            id: 'e15',
            title: 'Summer Highlights to Improve Patient Care',
            description: 'The CDC updated data on tobacco products among youth. The study showed that e-cigarettes worsen skin conditions. The June issue discusses methods of communicating with young patients about skin health and acne awareness. Safe cosmetic procedures and the rise in skin cancer cases are also discussed. Dermatology Times is preparing to celebrate 45 years of research and innovation next month.',
            source: 'Dermatology Times',
            file: '/posts/en/Summer Highlights to Improve Patient Care.pdf',
        },
    ];

    const locale = 'en'

    return (
        <>
            <main>
                <MainBlock locale={locale}/>
                <PostsBlock locale={locale} displayTitle={true} posts={posts}/>
            </main>
        </>
    );
}
