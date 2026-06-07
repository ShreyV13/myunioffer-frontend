// SUBJECT PAGES DATA
// To add a new subject: add an object to this array, then:
// 1. Add the route to prerender.js
// 2. Add the URL to public/sitemap.xml
// 3. Run `npm run prerender` locally
// 4. Push and request indexing in Google Search Console

export const subjects = [
  {
    slug: 'medicine',
    name: 'Medicine',
    metaTitle: 'Medicine personal statement help and UCAS advice | myunioffer',
    metaDesc: 'What admissions tutors look for in a Medicine personal statement. Reading list, supercurriculars, and common mistakes. Free AI coaching.',
    heroHook: 'Medicine is one of the most competitive UCAS courses. Here\'s what actually matters in your application, from the new format to work experience to UCAT prep.',
    whatTutorsLookFor: `Medical schools aren\'t checking whether you\'ve ticked a list of boxes. They want evidence of three things, and everything in your application should point back to one of them.\n\nGenuine understanding of what being a doctor involves. Not the idealised version from TV. The real thing: long hours, emotional weight, uncertainty in diagnosis, the pressure of making decisions that affect someone\'s life. You demonstrate this through work experience, but only if you can reflect on specific moments rather than describe what you saw in general terms.\n\nScientific curiosity that goes beyond A-levels. This means reading or engaging with something outside your school syllabus because you wanted to understand it, not because someone told you to. It could be a book, a journal article, a podcast, a research paper. What matters is that you can talk about a specific idea from it and explain what you thought.\n\nSelf-awareness about your own development. Medical schools train you for decades. They want to see that you can recognise your own gaps, learn from feedback, and grow. The best evidence for this comes from sustained volunteering or caring roles where you\'ve had to adapt over time, not from a one-week placement where you watched from the corner of the room.`,
    formatGuide: `UCAS replaced the freeform personal statement with three structured questions in 2026, and most of the advice floating around online still refers to the old format. The three questions are: "Why do you want to study this course?", "How have your qualifications and studies helped you prepare?", and "What else have you done to prepare outside of education?" You still have 4,000 characters total, with a minimum of 350 per question.\n\nFor Medicine specifically, allocate around 80-90% of your characters to questions 1 and 2. Question 3 is where you cover work experience and volunteering, but keep it tight. The academic and motivational content is what separates competitive applicants.\n\nQuestion 1 is not "I want to help people." Every applicant says that. This is where you explain what specifically drew you to medicine as opposed to nursing, biomedical science, or physiotherapy. The strongest answers connect a real moment of insight to a genuine intellectual interest.\n\nQuestion 2 is where your wider reading and academic engagement lives. Don\'t list everything you\'ve read. Pick the one or two things that genuinely shaped your thinking. Depth on one thing beats a list of five.\n\nQuestion 3 covers work experience, volunteering, caring roles, part-time jobs. The trap is spending all your characters describing what you did. Admissions tutors want to know what you noticed and what it taught you.`,
    workExperience: `If you can get work experience, aim for at least two weeks of clinical time, split between hospital shadowing and GP settings. Two different environments give you two different perspectives: hospitals show you acute care, teamwork under pressure, and specialist decision-making. GP surgeries show you continuity of care, patient relationships over time, and the breadth of conditions a generalist sees.\n\nWhen you\'re in a clinical setting, keep a notebook. Don\'t write "today I shadowed Dr Smith on the ward." Write down specific moments. A consultation where the doctor changed their approach based on the patient\'s reaction. A case where the diagnosis wasn\'t obvious. A moment where you noticed how the team communicated during a handover.\n\nIf you can\'t get in-person placements, virtual work experience from providers like Brighton and Sussex Medical School or Observe GP is accepted by most medical schools. Reflecting well on virtual experience can be more impressive than badly reflecting on in-person time.\n\nVolunteering matters, but sustained commitment beats one-off events. A few hours a week at a care home over several months shows reliability and genuine care.`,
    reading: [
      { title: 'Being Mortal', author: 'Atul Gawande', desc: 'Challenges assumptions about end-of-life care. Overused in personal statements, but if you engage critically with Gawande\'s argument about doctors prioritising treatment over quality of life rather than just summarising it, it still works.' },
      { title: 'Do No Harm', author: 'Henry Marsh', desc: 'A neurosurgeon\'s honest account of mistakes, uncertainty, and the reality of operating on the brain. Much less commonly cited than Gawande. Good for reflecting on how doctors handle failure.' },
      { title: 'The Man Who Mistook His Wife for a Hat', author: 'Oliver Sacks', desc: 'Neurological case studies that raise questions about identity, consciousness, and what it means to be a patient. Useful for showing you think about the human side of medicine.' },
      { title: 'This is Going to Hurt', author: 'Adam Kay', desc: 'A junior doctor\'s diary. Brutally honest about NHS working conditions. Good for demonstrating you understand the reality of the job, not just the idealised version.' },
      { title: 'Bad Pharma', author: 'Ben Goldacre', desc: 'How drug companies mislead doctors and patients. Gives you something to say about evidence-based medicine and why clinical trials matter.' },
    ],
    readingIntro: `Most guides recommend the same five books. These are all good but they\'re on every applicant\'s list. The better approach: read one for a general understanding, then go deeper into an area that genuinely interests you. If neurology fascinates you, read Sacks but then find a specific paper about a condition that caught your attention.\n\nWhen you read, note specific arguments or cases that surprised you. "I read Being Mortal" means nothing. "Gawande\'s argument that doctors often prioritise treatment over the patient\'s quality of life made me reconsider what good medicine looks like" shows thinking.\n\nReading the BMJ or NHS websites for current health news is just as valuable as reading books. Referencing a recent policy debate or ethical case shows you\'re actively engaged with medicine as a living field.`,
    supercurriculars: `The most common mistake Medicine applicants make with supercurriculars is treating them as a checklist. Hospital volunteering, St John Ambulance, Duke of Edinburgh, care home, done. Admissions tutors have seen that exact list thousands of times.\n\nWhat matters is not what you did but what you noticed and what it made you think. A student who volunteered at a hospice for three months and can describe a specific conversation with a patient has stronger material than someone who shadowed a surgeon for two weeks and can only say "I found it fascinating."\n\nSpecific recommendations: the Nuffield Research Placement scheme (competitive but free, real lab work). The Medic Mentor programme for structured work experience guidance. Healthcare podcasts like Inside Health (BBC) where you can reference a specific episode. The BMA medical ethics toolkit for understanding frameworks you\'ll need in interviews.\n\nEPQs work well for Medicine if the topic is genuinely interesting to you. "The ethics of organ donation" is overdone. "Whether GP surgeries should screen for depression during routine appointments" is more specific and shows you\'ve thought about primary care.`,
    examPrep: `Most medical schools require the UCAT as part of their admissions process. Some schools weight it heavily in deciding who to interview. Others use it as a threshold. Either way, a strong UCAT score significantly widens your options.\n\nStart preparing early. The test covers verbal reasoning, decision making, quantitative reasoning, abstract reasoning, and situational judgement. It\'s not a knowledge test, it\'s a thinking test. You can\'t cram for it, but you can practise the question styles until the timing feels manageable. Most successful applicants spend 4-8 weeks preparing with daily practice sessions.\n\nFree resources like the official UCAT practice tests are a good starting point. Whether you need paid resources depends on your starting level and how comfortable you are with timed testing.`,
    schoolSelection: `You get four medicine choices on UCAS plus one non-medicine backup. This decision should factor in your UCAT score, predicted grades, whether you prefer PBL or traditional lecture-based teaching, and the specific selection criteria at each school.\n\nSome schools score the personal statement numerically. Others only check it for red flags. Some weight the UCAT at 50% of the interview decision. Others barely look at it. These differences are publicly available and they should directly influence your strategy. A strong UCAT scorer should apply to UCAT-heavy schools. A strong writer with average UCAT should target schools that weight the personal statement more.`,
    commonMistakes: [
      'Writing a personal statement based on the old format. The structure changed in 2026. You need to answer three specific questions, not write a general essay.',
      'Describing work experience without reflection. "I spent two weeks at a hospital and saw many different departments" tells admissions tutors nothing.',
      'Listing books without engaging with them. If you mention a book, you need to be ready to discuss a specific idea from it at interview.',
      'Ignoring the UCAT until summer. Many students leave UCAT prep until July or August and run out of time. Start in late May or June.',
      'Applying to medical schools without checking their specific selection criteria. Each school weighs UCAT, personal statement, grades, and interviews differently.',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for Medicine and it tailors everything to what medical schools actually want. It asks about your work experience and pushes you to reflect on specific moments. It suggests reading based on what specifically interests you within medicine. When you\'re ready to write, the Draft Builder pulls everything together into a structured first draft.`,
    relatedSubjects: ['dentistry', 'psychology', 'biology'],
  },
  {
    slug: 'law',
    name: 'Law',
    metaTitle: 'Law personal statement tips and UCAS advice | myunioffer',
    metaDesc: 'How to write a Law personal statement that stands out. What admissions tutors look for, LNAT prep, recommended reading, and common mistakes. Free AI coaching.',
    heroHook: 'Law is one of the most competitive UCAS courses. Thousands of students apply with near-identical grades and near-identical personal statements about wanting to fight for justice. Here\'s what actually separates strong applicants.',
    whatTutorsLookFor: `Law tutors aren\'t looking for students who know what the law is. They\'re looking for students who can think about what the law should be.\n\nAnalytical thinking is the single most important quality. Can you read an argument and identify its weaknesses? Can you see both sides of a dispute and understand why reasonable people disagree? Can you take a principle that sounds right in theory and find a situation where it breaks down?\n\nEngagement with legal ideas, not just legal careers. "I want to be a human rights lawyer" is a career aspiration, not evidence of academic interest. "I read about the tension between free speech and hate speech legislation and found myself disagreeing with the conclusion" is evidence of engaging with law as an intellectual discipline.\n\nWriting quality. Law is a writing-intensive subject. Your personal statement is itself a writing sample. Spelling mistakes, vague claims, and sloppy arguments suggest you\'ll struggle with the core skill a law degree demands.`,
    formatGuide: `From 2026 entry onwards, UCAS replaced the freeform essay with three structured questions. You get 4,000 characters total, minimum 350 per question.\n\nQuestion 1 (why law): You need a specific reason. The strongest answers point to a particular legal issue, case, or debate that captured your interest. If you can connect your interest to something in your own life, even better. Avoid: "Law is the foundation of society." "I have always been passionate about justice."\n\nQuestion 2 (how your studies prepared you): Show that your current subjects have given you skills relevant to law. English develops close textual analysis. History develops evidence evaluation. Don\'t just list subjects. Explain what specific skill each gave you. If you\'ve done wider reading about law, it belongs here.\n\nQuestion 3 (what you\'ve done outside education): Work experience in law is helpful but tutors understand it\'s difficult for sixth-formers. If you have it, reflect on what you observed. If not, focus on debating, mooting, essay competitions, or volunteering that required communication or problem-solving.`,
    reading: [
      { title: 'The Rule of Law', author: 'Tom Bingham', desc: 'The definitive accessible introduction to what the rule of law means and why it matters. Short, clear, and gives you concrete cases to discuss. Almost essential reading for Law applicants.' },
      { title: 'In Your Defence', author: 'Sarah Langford', desc: 'A barrister\'s account of real cases. Gives you specific legal dilemmas to reflect on. UCAS specifically suggests this one.' },
      { title: 'In Black and White', author: 'Alexandra Wilson', desc: 'A barrister\'s memoir about race and the justice system. Gives you a distinctive angle on criminal justice.' },
      { title: 'Justice', author: 'Michael Sandel', desc: 'Accessible introduction to legal and moral philosophy. Good for engaging with the principles underlying law.' },
      { title: 'The Secret Barrister', author: 'Anonymous', desc: 'Insider account of how the criminal justice system actually works. Gives you concrete examples of systemic problems.' },
    ],
    readingIntro: `The generic recommendation is to read legal non-fiction. What actually helps is reading anything that presents an argument you can engage with critically.\n\nFor criminal justice, books by authors who\'ve worked inside the system give you specific cases and dilemmas. For human rights, follow a current case: the tension between national security and civil liberties, refugee claims, limits of free expression. Pick one issue and follow it for a few weeks.\n\nFor commercial law, most students ignore this but it\'s a genuinely distinctive angle. Very few personal statements engage with commercial law and tutors notice when one does.\n\nWhatever you read, keep notes. Not summaries but your reactions. Where did you agree? Disagree? What question did it leave you with?`,
    supercurriculars: `Essay competitions are one of the strongest supercurriculars for law. Landmark Chambers runs human rights law competitions annually. The Law Society runs the Graham Turnbull essay competition. You don\'t have to win. Entering and discussing your argument is what matters.\n\nMooting is harder to access at sixth-form level but some schools run sessions. Debating societies develop similar skills.\n\nWork experience in a law firm is useful but not essential. What tutors notice is whether you can reflect on what you observed. Noticing that the solicitor spent more time managing client expectations than giving legal advice, and reflecting on what that tells you about legal practice, is much stronger than listing what you saw.`,
    examPrep: `The LNAT is required by around 11 universities including Cambridge, Oxford, UCL, KCL, LSE, Bristol, Durham, Glasgow, and Nottingham.\n\nThe LNAT has two sections. Section A is 42 multiple-choice questions based on 12 argumentative passages in 95 minutes. Section B is an essay response in 40 minutes. Total: two hours fifteen minutes.\n\nThe LNAT doesn\'t test knowledge of law. It tests close reading, identifying assumptions, and constructing written argument.\n\nKey dates for 2027 entry: Registration opens 1 August 2026. Cambridge and Oxford applicants must register by 15 September and sit by 15 October 2026. KCL, LSE, UCL deadline is 31 December 2026. Most others: 20 January 2027.\n\nHow universities use scores varies significantly. Bristol weights it 60% MC, 40% essay, forming 40% of your application. LSE only looks at Section A. UCL uses a benchmark of 29.4 for 2024/25 offers. Check each university\'s policy.`,
    schoolSelection: `You get five UCAS choices. Think about whether you want traditional lecture-based or problem-based learning with clinical modules. Some focus on academic law (Oxford, Cambridge, LSE). Others integrate practical skills earlier.\n\nIf applying to LNAT universities, your score should influence choices. Strong LNAT with lower grades: target LNAT-heavy schools. Strong grades with average LNAT: target statement-heavy schools.\n\nSome interview for law, others don\'t. Cambridge interviews extensively. Prepare specifically for this.`,
    commonMistakes: [
      'Opening with a clich\u00e9 about justice or fairness. "Law is the backbone of civilised society" appears in thousands of statements. Start with something specific.',
      'Confusing interest in a legal career with interest in studying law. Tutors are selecting for an academic degree, not a training contract.',
      'Listing books without engaging. "I read In Your Defence and found it interesting" tells tutors nothing. One specific case that raised a question tells them everything.',
      'Not preparing for the LNAT. Students who don\'t practise underperform significantly.',
      'Applying to LNAT universities without checking how each uses the score.',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for Law and it pushes you to develop analytical arguments rather than generic statements about justice. It suggests reading based on your interests within law. It helps prepare for the LNAT. When you\'re ready to write, the Draft Builder pulls your reflections into a structured first draft.`,
    relatedSubjects: ['ppe', 'politics', 'history'],
  },
  {
    slug: 'economics',
    name: 'Economics',
    metaTitle: 'Economics personal statement tips and UCAS advice | myunioffer',
    metaDesc: 'How to write an Economics personal statement that stands out. What admissions tutors look for, TMUA prep, recommended reading, and common mistakes. Free AI coaching.',
    heroHook: 'Almost every Economics applicant says the same thing. "I\'m fascinated by how the economy works." Admissions tutors have read that line thousands of times. Here\'s what actually separates strong applicants.',
    whatTutorsLookFor: `Tutors don\'t expect you to understand game theory or monetary policy at degree level. They expect you to look at the world and ask economic questions about it. Why do some products cost more at airports? Why does raising minimum wage sometimes not reduce employment the way textbooks predict?\n\nMathematical reasoning matters more than most applicants realise. Economics at university is heavily quantitative. Top programmes (LSE, Cambridge, Warwick, UCL) expect strong maths alongside economics.\n\nGenuine curiosity beyond the syllabus. Every applicant studies the same A-level content. Tutors want to see you\'ve gone further on your own.`,
    formatGuide: `From 2026 entry, UCAS replaced the freeform essay with three structured questions. 4,000 characters total, minimum 350 per question. For Economics, spend the majority on questions 1 and 2.\n\nQuestion 1 (why economics): Start with something specific. Not "I\'ve always been interested in how markets work." UCAS suggests picking "something slightly more obscure" rather than books every applicant references. Whatever you reference, have an opinion about it.\n\nQuestion 2 (how your studies prepared you): Maths background matters here. Talk about specific areas connecting to economics: statistical analysis, probability, calculus. If you\'ve done an EPQ, discuss it. Draw connections from other subjects too.\n\nQuestion 3 (outside education): One strong example beats three weak ones.`,
    workExperience: `BSc vs BA Economics is a distinction most applicants overlook. Some universities offer BSc (more quantitative) and others BA (broader). Some offer both.\n\nIf you\'re studying Further Maths and enjoy the quantitative side, BSc programmes at LSE, UCL, or Warwick will suit you. If you\'re more interested in policy or development economics, BA programmes might fit better.\n\nThis matters for your statement because skills you emphasise should match the programme type.`,
    reading: [
      { title: 'Why Nations Fail', author: 'Acemoglu & Robinson', desc: 'The argument that institutions determine economic outcomes gives you a rich thread to pull on.' },
      { title: 'Misbehaving', author: 'Richard Thaler', desc: 'Goes deeper than Nudge into how behavioural economics challenged classical assumptions.' },
      { title: 'The Economics of Inequality', author: 'Thomas Piketty', desc: 'Short, accessible, concrete arguments about redistribution and taxation.' },
      { title: 'Everything Is Predictable', author: 'Tom Chivers', desc: 'UCAS specifically recommends this. Covers Bayesian thinking. Distinctive choice.' },
      { title: 'The Undercover Economist', author: 'Tim Harford', desc: 'Solid introduction to microeconomic thinking. Better than Freakonomics for statements.' },
    ],
    readingIntro: `The standard recommendations are Freakonomics, The Undercover Economist, and Thinking, Fast and Slow. Fine books but on every list. If you mention one, go deeper than a summary.\n\nBeyond books: The Economist, FT, and podcasts like More or Less or Planet Money keep you engaged with current debates.\n\nCORE Econ\'s "The Economy" is designed as a university-level introduction and used by several UK universities in first year.`,
    supercurriculars: `The Royal Economic Society runs an annual essay competition. One of the strongest things for an Economics application.\n\nThe Bank of England\'s educational resources and Target Two Point Zero competition simulate monetary policy decisions.\n\nIf you can\'t find a formal competition, write independently. A blog post analysing a current issue. The act of writing about economics is what matters.\n\nCORE Econ\'s "The Economy" MOOC is the strongest online course choice.`,
    examPrep: `The TMUA is used by Cambridge, LSE, Imperial, Warwick, Durham, and UCL for Economics. It tests mathematical reasoning, not memorised formulas.\n\nRegistration opens 20 July 2026. October sitting: 12-16 October. January sitting: 4-8 January 2027. Cambridge and Oxford must take October.\n\nNot all programmes require TMUA. If maths is strong, target TMUA universities. If not, plenty of strong programmes don\'t use it.`,
    schoolSelection: `Programmes vary enormously. Research whether maths is integrated or separate. Whether TMUA is required. Whether the programme leans quantitative (LSE, Cambridge, Warwick) or allows more breadth.\n\nWhether they interview. Cambridge and some Oxford courses interview. Most others make offers on application alone.`,
    commonMistakes: [
      'Writing a statement that could apply to any social science. Every claim should connect to an economic concept or question.',
      'Neglecting the maths angle for quantitative programmes.',
      'Referencing Freakonomics without going deeper. A vague "economics is everywhere" line hurts you.',
      'Confusing interest in business with interest in economics.',
      'Not preparing for the TMUA when applying to universities that use it.',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for Economics and it pushes you to develop specific economic arguments. It suggests reading based on your area of interest. It helps connect maths skills to economic thinking. The Draft Builder pulls reflections into a structured first draft.`,
    relatedSubjects: ['ppe', 'mathematics', 'politics'],
  },
  {
    slug: 'computer-science',
    name: 'Computer Science',
    metaTitle: 'Computer Science personal statement tips and UCAS advice | myunioffer',
    metaDesc: 'How to write a Computer Science personal statement that stands out. What admissions tutors look for, TMUA prep, project ideas, and common mistakes. Free AI coaching.',
    heroHook: 'If your opening line is "computers are the future" or you\'re planning to mention getting your first laptop at age five, stop. Tutors at Warwick and Portsmouth have both publicly said these are the biggest turn-offs in CS personal statements.',
    whatTutorsLookFor: `Computational thinking, not just coding. Being able to code in Python is expected, not impressive. Tutors want to see you understand why algorithms work.\n\nMathematical maturity. CS at university is far more mathematical than most students expect. Top programmes are essentially maths degrees with a CS focus.\n\nIndependent projects. The single strongest signal. A student who built a simple web scraper and can explain design decisions is more compelling than one who "is fascinated by AI."\n\nEngagement beyond school. Following tech news isn\'t enough. Tutors want active engagement: projects, competitions, papers.`,
    formatGuide: `From 2026 entry, three structured questions. 4,000 characters total. For CS, question 2 is where most underperform.\n\nQuestion 1 (why CS): Be specific about what aspect interests you. Connect to a project or problem you\'ve encountered.\n\nQuestion 2 (how your studies prepared you): Maths needs to feature prominently. Logic, statistics, discrete maths. Say which area, what concept, how it connects to CS.\n\nQuestion 3 (outside education): Lead with your most substantial project or competition.`,
    workExperience: `A personal project is the most powerful thing you can include. It needs to be yours and you need to explain your decisions.\n\nA tool solving a real problem. A game with algorithmic complexity. A data project. Contributing to open source.\n\nPut it on GitHub. A public repository tutors can look at is far stronger than describing a project in 200 characters.`,
    reading: [
      { title: 'Code', author: 'Charles Petzold', desc: 'Builds from basic switches to a full computer. Shows how hardware and software connect.' },
      { title: 'Godel, Escher, Bach', author: 'Douglas Hofstadter', desc: 'Dense but rewarding exploration of formal systems, recursion, and intelligence.' },
      { title: 'Algorithms to Live By', author: 'Brian Christian & Tom Griffiths', desc: 'Connects algorithmic thinking to everyday decisions.' },
    ],
    readingIntro: `Reading about CS is less important than doing CS. A project is always stronger than a book. That said, academic papers, engineering blog posts, and technical talks can give you specific concepts to discuss.`,
    supercurriculars: `British Informatics Olympiad (BIO) is the most prestigious CS competition for UK students.\n\nUKMT challenges develop mathematical reasoning. Hackathons are valuable if you can discuss what you built. Advent of Code gives you concrete algorithmic problems.\n\nHarvard\'s CS50 or MIT OpenCourseWare give exposure to university-level content.`,
    examPrep: `The TMUA is required by Cambridge, Imperial, and from 2027 Oxford (replacing the MAT). Two 75-minute multiple-choice papers.\n\nKey dates: Registration opens 20 July 2026. October sitting: 12-16 October. January: 4-8 January 2027. Cambridge and Oxford must take October.\n\nIf you\'ve been using MAT past papers for Oxford CS, adjust. TMUA has a different format. Use official TMUA practice materials.`,
    schoolSelection: `Theoretical (Cambridge, Oxford, Imperial): heavily mathematical. Statement should show mathematical maturity.\n\nBalanced (Warwick, Edinburgh, UCL, Bristol): theory plus practical application.\n\nPractice-focused: emphasise software development and industry skills.\n\nMatch your statement emphasis to the programme type.`,
    commonMistakes: [
      'Leading with "I\'ve been coding since I was 12." Tutors care what you can do now.',
      'Focusing on programming languages. "I know Python, Java, C++" is a list, not evidence.',
      'Writing about tech trends instead of CS fundamentals.',
      'Neglecting the maths.',
      'Not preparing for TMUA or not knowing Oxford switched from MAT.',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for CS and it pushes you to articulate computational thinking. It suggests project ideas. It helps connect maths to CS concepts. The Draft Builder structures your reflections into a first draft.`,
    relatedSubjects: ['mathematics', 'engineering', 'physics'],
  },
  {
    slug: 'engineering',
    name: 'Engineering',
    metaTitle: 'Engineering personal statement tips and UCAS advice | myunioffer',
    metaDesc: 'How to write an Engineering personal statement that stands out. What admissions tutors look for, ESAT prep, project ideas, and common mistakes. Free AI coaching.',
    heroHook: 'Engineering is one of the broadest courses you can apply for. Mechanical, civil, electrical, chemical, aerospace. Each discipline has different expectations. A strong Cambridge Engineering application looks nothing like a strong civil engineering application elsewhere.',
    whatTutorsLookFor: `Problem-solving, not just knowledge. Southampton tutors say they want "people who can think and who show a bit of spark."\n\nMaths and physics ability. Engineering is applied mathematics and physics. Further Maths is expected at Cambridge and strongly preferred at Imperial and Oxford.\n\nHands-on experience. Tutors want to see you\'ve built, fixed, or made things. UCAS guidance mentions "taking things apart and putting them back together."\n\nUnderstanding of what engineers actually do. If your statement could apply to any discipline, it\'s not specific enough.`,
    formatGuide: `Three structured questions from 2026. 4,000 characters total. For Engineering, Q3 carries unusual weight because tutors want evidence of physical-world engagement.\n\nQuestion 1: Start with something concrete. A structure, a machine, a problem.\n\nQuestion 2: Pick specific physics or maths topics that connect to your discipline.\n\nQuestion 3: Practical experience matters more here than almost any other subject.`,
    workExperience: `Building something. CREST Awards. Engineering Education Scheme (EES). Arkwright Scholarships. Work experience or site visits.\n\nThe failure and iteration is often more interesting to tutors than the finished product.`,
    reading: [
      { title: 'Structures: Or Why Things Don\'t Fall Down', author: 'J.E. Gordon', desc: 'Classic explanation of structural engineering principles.' },
      { title: 'Stuff Matters', author: 'Mark Miodownik', desc: 'Explores materials that make up the modern world.' },
      { title: 'To Engineer Is Human', author: 'Henry Petroski', desc: 'How engineering failures drive innovation.' },
    ],
    readingIntro: `Engineering applicants are less expected to have a long reading list. But engaging with engineering ideas beyond the classroom helps. Find one book or article relating to your specific discipline.`,
    supercurriculars: `General engineering (Cambridge, Oxford, Durham): broad first year before specialising.\n\nMechanical: forces, motion, energy, machine design.\n\nCivil: infrastructure and the built environment.\n\nElectrical: circuits, signals, power systems. Imperial EEE has 6.6% acceptance.\n\nChemical: bridges chemistry and engineering.\n\nAerospace: aircraft and spacecraft design.`,
    examPrep: `The ESAT is required for Cambridge, Imperial, and from 2027 Oxford. Computer-based, 40-minute multiple-choice modules. Mathematics 1 is compulsory. Cambridge takes Maths 1, Physics, and Maths 2.\n\nKey dates: Registration opens 20 July 2026. October sitting: 12-16 October. January: 4-8 January 2027.\n\nNo pass or fail. Universities use ESAT alongside grades, statement, and interview. UK candidates in financial need can apply for a bursary.`,
    schoolSelection: `General engineering lets you explore before specialising. Single-discipline programmes put you on a specific track.\n\nCheck whether ESAT is required. Whether they interview. Whether BEng (3 years) or MEng (4 years). Most employers expect MEng.`,
    commonMistakes: [
      'Writing a generic "engineering" statement for a specific discipline.',
      'Focusing on theory without practical evidence.',
      'Underestimating the maths.',
      'Not knowing about the ESAT.',
      'Describing work experience as a passive observer.',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for Engineering and it tailors to your specific discipline. It pushes you to connect practical experience to engineering thinking. It suggests project ideas and helps prepare for the ESAT.`,
    relatedSubjects: ['computer-science', 'mathematics', 'physics'],
  },
  {
    slug: 'psychology',
    name: 'Psychology',
    metaTitle: 'Psychology personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a Psychology personal statement. What tutors look for, recommended reading, activities, and common mistakes. Free AI coaching.',
    heroHook: 'Psychology admissions tutors read "I\'ve always been fascinated by the human mind" in almost every application. Here\'s how to actually stand out.',
    whatTutorsLookFor: `Psychology admissions tutors want to see that you understand psychology is a science, not just an interest in how people think. The strongest applicants show familiarity with research methods, specific studies, and the scientific process behind psychological findings.

Referencing specific experiments or researchers matters more than general statements about being "fascinated by behaviour." A student who can discuss Milgram's obedience study and critique its methodology shows more understanding than one who says "I find it interesting how people conform."

Many psychology programmes are heavily statistical. Showing comfort with data, research design, or even just acknowledging the quantitative side of the subject sets you apart from applicants who only discuss the therapeutic or counselling side.

Tutors also look for genuine engagement beyond the A-level syllabus. If you're studying Psychology at A-level, they want to see you've gone further. If you're not, they want to see you've done independent reading that demonstrates real understanding.`,
    reading: [
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', desc: 'The foundational text on cognitive biases and dual-process theory. Commonly cited, but if you engage with a specific finding and critique it rather than just summarising, it still works.' },
      { title: 'The Psychopath Test', author: 'Jon Ronson', desc: 'Explores diagnosis, labelling, and the reliability of psychological assessment. Raises questions about how we categorise mental illness that are worth reflecting on.' },
      { title: 'Opening Skinner\'s Box', author: 'Lauren Slater', desc: 'Revisits famous psychology experiments and questions their conclusions. Good for developing critical thinking about research methodology.' },
      { title: 'Stumbling on Happiness', author: 'Daniel Gilbert', desc: 'Cognitive psychology applied to how we predict what will make us happy. Specific studies and findings you can reference and discuss.' },
    ],
    supercurriculars: `Volunteering in care settings, mental health support lines, or with organisations like Mind gives you direct experience relevant to applied psychology. But the reflection matters more than the activity. What did you observe about how people behave in difficult situations? What surprised you?

Research experience of any kind is valuable, even at a basic level. If your school offers an EPQ, choose a psychology topic and conduct a small study or literature review. The process of designing research, even imperfectly, shows you understand the scientific side.

Online courses on research methods or statistics are more useful for your application than courses on pop psychology topics. Understanding p-values and experimental design is what your degree will involve.

Reading academic papers, even just abstracts and conclusions, shows initiative beyond popular science books. Google Scholar is free. Find one paper on a topic that interests you and try to understand the methodology.`,
    commonMistakes: [
      'Treating psychology as purely about therapy and counselling. Most psychology degrees are research-focused and heavily statistical. Show you understand that.',
      'Opening with "I have always been fascinated by the human mind." This appears in almost every Psychology personal statement. Find a more specific starting point.',
      'Only discussing pop psychology without engaging with actual research. Naming studies and discussing methodology is what separates strong applicants.',
      'Ignoring the scientific method. Psychology is an empirical science. If your statement reads like it could be for a Philosophy degree, it\'s not targeted enough.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Psychology and it focuses on the scientific side that admissions tutors prioritise. It pushes you to discuss specific studies and researchers, not just general interest in behaviour. It helps you reflect on any relevant experience in a way that shows understanding of human behaviour, not just empathy.`,
  },
  {
    slug: 'english',
    name: 'English Literature',
    metaTitle: 'English Literature personal statement help | myunioffer',
    metaDesc: 'How to write an English Literature personal statement. What tutors look for, reading suggestions, and common mistakes. Free AI coaching.',
    heroHook: 'English tutors want to see how you read, not just what you\'ve read. Here\'s what makes a Literature personal statement genuinely strong.',
    whatTutorsLookFor: `English Literature admissions tutors want to see independent, critical reading. Not a list of books you've enjoyed, but evidence that you can analyse texts closely, form your own interpretations, and engage with literary criticism.

The key distinction is between describing a book and analysing it. "I enjoyed The Great Gatsby because of its themes of wealth and the American Dream" is description. "Fitzgerald's use of the green light works because it makes the reader complicit in Gatsby's delusion, and I'm interested in how narrative perspective creates that effect" is analysis.

Tutors want to see reading beyond your syllabus. If everything you reference is on your A-level reading list, you haven't shown independent intellectual curiosity. Read at least one or two texts that you chose yourself, and be ready to explain why you chose them and what you found in them.

Engaging with literary criticism or theory, even at a basic level, shows you understand that studying literature at university involves more than reading novels. Referencing a specific critic's argument and explaining whether you agree with it demonstrates the kind of thinking you'll do at degree level.`,
    reading: [
      { title: 'How to Read Literature Like a Professor', author: 'Thomas Foster', desc: 'A practical guide to literary analysis techniques. Gives you vocabulary and frameworks for discussing texts in your statement and interviews.' },
      { title: 'The Literary Agenda: Why Study Literature?', author: 'Various authors', desc: 'Short essays by academics on why literature matters. Useful for articulating your own reasons beyond "I love reading."' },
      { title: 'A Room of One\'s Own', author: 'Virginia Woolf', desc: 'Literary criticism and feminist theory in one. Short, readable, and gives you something to say about the relationship between literature, gender, and power.' },
      { title: 'Selected poetry of a poet you genuinely love', author: 'Any poet', desc: 'Close reading of poetry is the core skill English degrees develop. Choose one poet and read deeply rather than skimming ten. Be ready to discuss specific poems.' },
    ],
    supercurriculars: `The most valuable supercurricular for English is reading. Not reading lists, not reading challenges, but genuine exploration of texts beyond your syllabus. A student who read one novel by a writer they'd never heard of and can explain what they found interesting is stronger than someone who read the top ten "books every English applicant should read."

Writing regularly helps. A blog, a journal, creative writing submissions, a school magazine. Not because admissions tutors care about your creative writing specifically, but because writing regularly develops the analytical thinking you need.

Essay competitions like the ones run by Oxford colleges or the Tower Poetry Competition give you material to discuss and show engagement with the academic side of the subject.

Theatre visits and engagement with performed literature show you understand that texts exist beyond the page. If you saw a production and noticed how the director's choices changed your understanding of the text, that's worth discussing.

Podcasts and lectures: the London Review of Books podcast and the British Library's English and drama resources are freely available and give you access to current literary thinking.`,
    commonMistakes: [
      'Turning your statement into a book list. "I have read X, Y, Z, and A" with a sentence of description for each. Pick fewer texts and go deeper.',
      'Only discussing books from your A-level syllabus. Tutors want to see independent reading and your own taste.',
      'Saying you "love reading" without showing how you read. Demonstrate close reading, not just enthusiasm.',
      'Ignoring literary criticism entirely. Studying English at university involves engaging with critics and theory. Show you know that.',
    ],
    howWeHelp: `Tell the AI coach you're applying for English Literature and it helps you move from listing books to analysing them. It pushes you to develop your own critical voice: not just what you've read, but how you read and what interpretive questions interest you. It suggests texts based on your actual literary interests, not the standard recommended lists.`,
  },
  {
    slug: 'mathematics',
    name: 'Mathematics',
    metaTitle: 'Mathematics personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a Mathematics personal statement. What tutors look for, reading list, competitions, and mistakes to avoid. Free AI coaching.',
    heroHook: 'Maths admissions tutors don\'t care about your A* prediction. They want to see you think mathematically. Here\'s what that looks like in a personal statement.',
    whatTutorsLookFor: `Mathematics admissions tutors want evidence that you enjoy mathematical thinking for its own sake, not just that you're good at exams. The distinction matters: being good at A-level Maths means you can follow procedures. Enjoying mathematics means you find problems interesting even when you don't immediately know how to solve them.

They look for engagement with mathematics beyond the syllabus. STEP, MAT, or BMO problems show you actively seek out challenging mathematics. Reading about mathematical ideas, exploring proofs, or investigating problems independently shows genuine curiosity.

The strongest Maths personal statements discuss a specific mathematical idea or problem that the applicant found genuinely interesting, and explain why. Not "I like calculus because it's useful in physics," but "I was intrigued by how the fundamental theorem of calculus connects two seemingly different operations, and I spent time working through the proof to understand why it works."

For Oxbridge specifically, the ability to think about proof and abstraction is more important than computational skill.`,
    reading: [
      { title: 'How to Solve It', author: 'George Polya', desc: 'The classic guide to mathematical problem-solving. Teaches strategies that are directly applicable to STEP and interview problems.' },
      { title: 'Fermat\'s Last Theorem', author: 'Simon Singh', desc: 'The story of Andrew Wiles solving a 350-year-old problem. Accessible and shows the human side of mathematics.' },
      { title: 'The Princeton Companion to Mathematics', author: 'Timothy Gowers (ed.)', desc: 'Dense but browsable. Reading even a few entries gives you exposure to mathematical ideas far beyond the syllabus.' },
      { title: 'What Is Mathematics?', author: 'Richard Courant & Herbert Robbins', desc: 'A broad survey of mathematical thinking from number theory to topology. Gives you vocabulary for discussing areas of maths you might not encounter until university.' },
    ],
    supercurriculars: `STEP or MAT preparation is the single most valuable use of your time if you're applying for Maths. These exams develop exactly the problem-solving skills admissions tutors are looking for, and working through past papers gives you natural material for your statement.

Mathematical competitions (UKMT Senior Challenge, BMO, SMC) demonstrate that you seek out mathematical challenges beyond the classroom.

An EPQ on a mathematical topic can work if it's specific enough. "The mathematics of cryptography" is better than "the history of mathematics."

Reading mathematical content regularly: Plus magazine (online, free) publishes accessible articles on current mathematical research. Numberphile videos introduce interesting problems. But reference these as starting points for your own exploration, not as entertainment.

The most impressive thing you can include is a problem you worked on independently: something you encountered, spent time thinking about, and either solved or learned something interesting from the attempt.`,
    commonMistakes: [
      'Focusing on how useful maths is in other fields rather than why you find mathematics itself interesting. Admissions tutors for Maths want mathematicians, not engineers or economists.',
      'Only discussing A-level content. If your statement could be written by any student with an A* prediction, it\'s not distinctive enough.',
      'Describing mathematical topics without showing you\'ve thought about them. "I find prime numbers fascinating" tells them nothing. What about prime numbers specifically interests you?',
      'Ignoring proof and abstraction. University mathematics is primarily about proofs. Show you\'re comfortable with that kind of thinking.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Mathematics and it pushes you beyond "I like maths" toward specific mathematical ideas you've engaged with. It asks what problems you've found interesting and helps you articulate why in a way that shows genuine mathematical thinking. It suggests reading and problems based on your actual interests within mathematics.`,
  },
  {
    slug: 'physics',
    name: 'Physics',
    metaTitle: 'Physics personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a Physics personal statement. What admissions tutors look for, recommended reading, and common mistakes. Free AI coaching.',
    heroHook: 'Physics tutors want to see you think about problems, not just solve equations. Here\'s what a strong Physics application looks like.',
    whatTutorsLookFor: `Physics admissions tutors want to see evidence of genuine curiosity about how the physical world works, combined with the mathematical ability to engage with it rigorously. They're looking for students who find physics problems interesting, not just solvable.

Strong applicants discuss specific physics ideas or experiments that caught their attention, and explain what they found interesting at a level beyond A-level. A student who read about quantum entanglement and can explain why Einstein called it "spooky action at a distance" and what the Bell test experiments showed is more interesting than one who says "I'm fascinated by quantum mechanics."

Mathematical fluency is essential. Physics at university level is heavily mathematical. Your statement should demonstrate comfort with mathematical reasoning applied to physical problems.

Practical skills and experimental thinking also matter. If you've done any independent experiments, even simple ones, discussing your approach and what you learned from unexpected results shows the scientific mindset tutors value.`,
    reading: [
      { title: 'Six Easy Pieces', author: 'Richard Feynman', desc: 'Feynman\'s legendary lectures on fundamental physics, made accessible. His way of thinking about problems from first principles is exactly what admissions tutors want to see in you.' },
      { title: 'The Elegant Universe', author: 'Brian Greene', desc: 'String theory and the search for a unified theory of physics. Even if the theory is contested, it gives you exposure to cutting-edge theoretical physics and something to discuss.' },
      { title: 'Quantum Theory Cannot Hurt You', author: 'Marcus Chown', desc: 'Clear explanation of quantum mechanics and relativity for non-specialists. Gives you vocabulary and understanding beyond the pop science level.' },
      { title: 'QED: The Strange Theory of Light and Matter', author: 'Richard Feynman', desc: 'Feynman explains quantum electrodynamics for a general audience. Short, brilliant, and gives you material that goes genuinely beyond A-level.' },
    ],
    supercurriculars: `The Physics Olympiad (BPhO) is the most directly relevant competition. The problems develop the exact thinking style that admissions tutors test in interviews.

Independent experiments or investigations show practical scientific thinking. Even replicating a classic experiment at home and writing up what you observed is valuable material.

An EPQ with a physics focus works well if the question is specific and involves some mathematical analysis, not just research.

STEP or MAT preparation overlaps significantly with Physics preparation for top universities. Mathematical problem-solving is a physics supercurricular.

Attending lectures or talks: many universities run public lectures on physics topics. The Institute of Physics has events for students. Even watching specific lecture series online (MIT OpenCourseWare, Feynman lectures) and engaging with the content is worth discussing.`,
    commonMistakes: [
      'Spending half your statement on astronomy and space when applying for a Physics degree. Astrophysics is one small branch. Show breadth of interest across physics.',
      'Describing physics as "explaining the universe" without engaging with specific problems or ideas. What specifically in physics interests you?',
      'Ignoring mathematics. Physics at university is applied mathematics. If your statement doesn\'t demonstrate mathematical thinking, it\'s incomplete.',
      'Only discussing popular science without engaging at a deeper level. Pop science is a starting point, not a destination.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Physics and it helps you articulate what specifically interests you about the subject. It pushes you to go beyond pop science descriptions toward the specific problems and ideas that excite you. It suggests reading based on your interests and helps you connect your mathematical ability to your physics understanding.`,
  },
  {
    slug: 'history',
    name: 'History',
    metaTitle: 'History personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a History personal statement. What admissions tutors look for, reading suggestions, and common mistakes. Free AI coaching.',
    heroHook: 'History tutors don\'t want a timeline of everything you\'ve studied. They want to see you argue. Here\'s how.',
    whatTutorsLookFor: `History admissions tutors are looking for students who can construct and evaluate arguments about the past, not just narrate events. The distinction between "what happened" and "why it happened and how we know" is fundamental.

They want to see independent reading beyond the A-level syllabus, ideally on a topic you've chosen yourself. What period, region, or theme interests you, and what have you read about it? A student who has read one serious history book on a topic they chose and can discuss the author's argument and its limitations is far stronger than one who lists five books they were told to read.

Engagement with historiography, the study of how history is written and debated, is what separates strong applicants. If you can discuss how two historians interpret the same event differently and explain which argument you find more convincing, you're thinking like a historian.

Source analysis is the core skill of a history degree. Any evidence that you can look at a primary source critically, considering who produced it, why, and what it can and can't tell us, will impress.`,
    reading: [
      { title: 'What Is History?', author: 'E.H. Carr', desc: 'The classic introduction to historical thinking. Short and accessible. Helps you discuss what history is actually about beyond dates and events.' },
      { title: 'The Pursuit of Power', author: 'Richard Evans', desc: 'European history 1815-1914 told as a connected narrative. Dense but gives you a model for how professional historians construct arguments across long periods.' },
      { title: 'Any book by your favourite historian', author: 'Your choice', desc: 'The most impressive thing in a History statement is discussing a book you chose yourself, not one from a recommended list. Pick a period and find a well-reviewed academic book on it.' },
      { title: 'History Today magazine', author: 'Various', desc: 'Monthly articles by professional historians on a range of topics. Reading one article and engaging with its argument gives you current historiographical material.' },
    ],
    supercurriculars: `Reading is the primary supercurricular for History. Not reading lists, but independent exploration of topics that interest you. Visit a bookshop, browse the history section, and pick something that genuinely catches your eye.

Essay competitions run by Oxford and Cambridge colleges are directly relevant and give you practice in constructing historical arguments.

Visiting archives, museums, or historical sites with a critical eye, not as a tourist but as someone asking questions about what the evidence shows and what it doesn't, gives you material for discussing source analysis.

An EPQ on a historical topic is strong if the question is specific and arguable. "The causes of World War One" is too broad. "Whether Fritz Fischer's argument about German war guilt holds up against more recent scholarship" is a historiographical question that shows real engagement.

Podcasts like In Our Time (BBC) cover historical topics in depth with academic experts. Referencing a specific episode and engaging with the debate it presents shows independent intellectual engagement.`,
    commonMistakes: [
      'Writing a mini-essay about your favourite historical period instead of showing how you think about history as a discipline. The statement is about you as a historian, not about the Tudors.',
      'Only discussing topics from your A-level syllabus. Tutors want to see you\'ve explored beyond what you were told to study.',
      'Narrating events without analysing them. "In 1789 the French Revolution began" is not analysis. "Revisionist historians argue the Revolution was driven by economic crisis rather than ideology, and I find this convincing because..." is.',
      'Ignoring historiography. If you don\'t mention how historians debate and disagree, you haven\'t shown you understand what studying history at university involves.',
    ],
    howWeHelp: `Tell the AI coach you're applying for History and it pushes you to think like a historian: forming arguments, evaluating evidence, and engaging with different interpretations. It helps you develop your own historical voice rather than just describing periods you've studied.`,
  },
  {
    slug: 'ppe',
    name: 'PPE',
    metaTitle: 'PPE personal statement tips and UCAS advice | myunioffer',
    metaDesc: 'How to write a PPE personal statement that stands out. What Oxford tutors look for, TARA prep, recommended reading, and common mistakes. Free AI coaching.',
    heroHook: 'PPE is one of the most misunderstood courses on UCAS. Students apply because they "want to understand the world." Admissions tutors hear this constantly and it tells them nothing. Here\'s what they actually want to see.',
    whatTutorsLookFor: `Interdisciplinary thinking. PPE exists because philosophy, politics, and economics are interconnected. A student who reads about economic inequality and asks "is this just?" or "what political structures cause this?" is thinking like a PPE student.\n\nDepth over breadth. Oxford\'s admissions page says: "We would like to see interest in one or two of the three subjects and evidence of engagement with those." Go deep on one or two, show awareness of the third.\n\nCritical engagement, not just familiarity. The most impressive responses connect ideas across disciplines.\n\nQuantitative ability matters more than students expect. PPE at most universities involves significant economics, and economics is mathematical. Warwick\'s PPE has a strong quantitative focus. Oxford\'s economics component requires mathematical reasoning.`,
    formatGuide: `Three structured questions from 2026. 4,000 characters total. Q1 is hardest because you need to show why this specific combination appeals, not just why each subject does.\n\nQuestion 1: Go deep on one or two disciplines. The connection between them is what matters.\n\nQuestion 2: Draw connections between A-levels and PPE disciplines. History for evidence evaluation, Maths for economics, English for argument analysis.\n\nQuestion 3: Essay competitions, independent writing, MOOCs, critical engagement with current affairs.`,
    workExperience: `A-level choices matter. You don\'t need philosophy, politics, or economics at A-level. Oxford says this explicitly.\n\nMaths is strongly recommended. PPE involves significant quantitative economics.\n\nAny combination of essay-based and analytical subjects works. The key is drawing connections to the three disciplines.`,
    reading: [
      { title: 'Why Nations Fail', author: 'Acemoglu & Robinson', desc: 'Connects politics and economics directly. One of the best PPE books.' },
      { title: 'Justice', author: 'Michael Sandel', desc: 'Pick one idea and argue for or against it. Don\'t just summarise.' },
      { title: 'The Economics of Inequality', author: 'Thomas Piketty', desc: 'Short, accessible. Connects economics to philosophy and politics naturally.' },
      { title: 'Everything Is Predictable', author: 'Tom Chivers', desc: 'Bayesian thinking connecting to decision-making across all three disciplines.' },
      { title: 'A Very Short Introduction to Logic', author: 'Graham Priest', desc: 'Quick introduction to philosophical reasoning and argument construction.' },
    ],
    readingIntro: `PPE reading should span at least two disciplines with depth in one.\n\nFor philosophy, pick one accessible text introducing philosophical argument.\n\nFor politics, follow current affairs critically. Podcasts like The Rest is Politics, but think about what you agree and disagree with.\n\nThe strongest statements reference material where disciplines overlap. Political economy beats pure economics.`,
    supercurriculars: `John Locke Institute essay competitions in Philosophy, Politics, Economics. You don\'t need to win.\n\nMOOCs on political philosophy, development economics, or ethical theory.\n\nIndependent writing responding to arguments you disagree with.\n\nNot useful: Model UN, Duke of Edinburgh, generic volunteering. Oxford tutors say they don\'t care about extracurriculars unconnected to the subject.`,
    examPrep: `Most PPE programmes don\'t require an admissions test. The major exception is Oxford.\n\nOxford replaced the TSA with the TARA (Test of Academic Reasoning for Admissions) for 2027 entry. It tests critical thinking, problem solving, and written argument. No subject knowledge content.\n\nAll Oxford PPE applicants take three modules: Critical Thinking, Problem Solving, and Writing Task. The Writing Task (30-minute timed essay) is where you stand out or fall behind.\n\nOxford says the personal statement is "of lower importance in shortlisting compared to your TARA result, qualifications, and reference." TARA preparation is at least as important as your statement.\n\nKey dates: Registration summer 2026 via UAT-UK. October sitting: 12-16 October. Oxford applicants must take October.\n\nOld TSA papers are the closest practice proxy. Previous TSA benchmarks: 65.7 average for interviewed, 68.5 for offers. Start 8-12 weeks before.`,
    schoolSelection: `Oxford: Tutorial-based. All three subjects in first year, drop one for years two and three. Requires TARA and interview. Oxford says applying for related courses elsewhere won\'t disadvantage you.\n\nWarwick: PPE and PPES. No admissions test. Strong quantitative economics focus.\n\nLSE: Doesn\'t offer PPE directly but offers Politics and Economics, Philosophy and Economics, etc. If you prefer two of the three disciplines, LSE joint honours might suit you.\n\nOther universities: York, Manchester, Exeter. Varying emphasis and flexibility.\n\nTeaching style: Oxford uses tutorials. Most others use lectures and seminars.`,
    commonMistakes: [
      'Trying to cover all three disciplines equally in 4,000 characters. Focus on one or two.',
      'Writing about career aspirations instead of intellectual interests.',
      'Confusing familiarity with engagement. "I read Justice" vs engaging with Sandel\'s argument.',
      'Not preparing for the TARA if applying to Oxford.',
      'Listing current affairs without analysis. Have a view. What would an economist say? What philosophical principle does it challenge?',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for PPE and it pushes you to connect ideas across disciplines. It suggests reading that spans philosophy, politics, and economics. It helps develop the argument skills the TARA requires. The Draft Builder structures your reflections into a first draft.`,
    relatedSubjects: ['economics', 'law', 'history'],
  },
  {
    slug: 'biology',
    name: 'Biology',
    metaTitle: 'Biology personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a Biology personal statement. What tutors look for, reading list, supercurriculars, and common mistakes. Free AI coaching.',
    heroHook: 'Biology admissions tutors want to see you think like a scientist, not just recite your syllabus. Here\'s what that means for your personal statement.',
    whatTutorsLookFor: `Biology admissions tutors look for scientific curiosity and the ability to think critically about biological concepts. They want to see you engage with ideas beyond what you've covered in A-level, discuss research and experiments, and show you understand that biology is an evidence-based science, not just a collection of facts to memorise.

Practical experience, whether through school practicals, independent projects, or work experience in a lab or field setting, shows scientific aptitude. But describing what you did matters less than reflecting on what you learned or what surprised you.

Understanding current biological issues (gene therapy, antibiotic resistance, CRISPR, biodiversity loss) and being able to discuss them with some nuance shows you're engaged with the subject as a living, evolving field.

Quantitative skills matter increasingly in modern biology. Bioinformatics, statistical analysis of data, and mathematical modelling are central to research. Any evidence of comfort with data and numbers strengthens your application.`,
    reading: [
      { title: 'The Selfish Gene', author: 'Richard Dawkins', desc: 'Foundational evolutionary biology. Commonly cited but still strong if you engage with the actual argument about gene-level selection rather than just describing the concept.' },
      { title: 'The Gene: An Intimate History', author: 'Siddhartha Mukherjee', desc: 'The history of genetics from Mendel to CRISPR. Gives you material for discussing the ethical implications of genetic technology alongside the science.' },
      { title: 'I Contain Multitudes', author: 'Ed Yong', desc: 'The microbiome and its role in health and evolution. Less commonly referenced than Dawkins and gives you distinctive material about an area of current research.' },
      { title: 'Lab Girl', author: 'Hope Jahren', desc: 'A plant biologist\'s memoir about the reality of scientific research. Good for understanding what a career in biology actually looks like.' },
    ],
    supercurriculars: `Biology Olympiad (BBO) participation is the most directly relevant competition. The preparation deepens your knowledge significantly beyond A-level.

Field work or ecological surveys, even informal ones, show practical scientific engagement. Recording species in a local habitat and analysing what you found is genuine biology.

Lab work experience, if available, gives you material about the reality of biological research. Even a day watching researchers work and understanding their methodology is worth reflecting on.

An EPQ on a biological topic works well if the question involves evaluating evidence or investigating a current debate. "Should CRISPR be used on human embryos?" combines science with ethics and shows breadth.

Science podcasts and journals: Nature's podcast, New Scientist articles, or even reading abstracts of recent papers on topics that interest you shows independent engagement with current research.`,
    commonMistakes: [
      'Treating biology as purely descriptive. "The process of mitosis involves..." is A-level revision, not a personal statement. Discuss ideas, not textbook content.',
      'Only discussing human biology or medicine. Biology is enormous: ecology, evolution, genetics, microbiology, plant science. Show breadth of interest.',
      'Listing experiments without reflecting on results or methodology. What did the experiment teach you about how science works?',
      'Ignoring the quantitative side. Modern biology relies on data analysis and statistics. Mentioning mathematical or computational skills strengthens your application.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Biology and it pushes you to engage with biological ideas at a level beyond your syllabus. It helps you find specific topics within biology that genuinely interest you, suggest relevant reading and research to explore, and reflect on practical experience in a way that shows scientific thinking.`,
  },
  {
    slug: 'chemistry',
    name: 'Chemistry',
    metaTitle: 'Chemistry personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a Chemistry personal statement. What tutors look for, reading list, supercurriculars, and common mistakes. Free AI coaching.',
    heroHook: 'Chemistry tutors want to see curiosity about why reactions happen, not just that you can balance equations. Here\'s how to show that.',
    whatTutorsLookFor: `Chemistry admissions tutors look for students who are genuinely curious about chemical behaviour at a molecular level. Not just describing reactions, but understanding why they happen, what controls them, and how that knowledge applies to real problems.

They value evidence of practical skills and enthusiasm for lab work. Chemistry is an experimental science, and students who enjoy the practical side and can discuss it thoughtfully stand out.

Reading beyond the A-level syllabus, particularly about current chemical research, shows intellectual curiosity. Discussing a recent development in drug design, materials science, or green chemistry with understanding demonstrates that you see chemistry as a living subject.

Mathematical ability matters, especially for physical chemistry. Showing comfort with mathematical reasoning applied to chemical problems strengthens your application for top programmes.`,
    reading: [
      { title: 'Periodic Tales', author: 'Hugh Aldersey-Williams', desc: 'The stories behind the elements. Gives you material for discussing specific elements and their properties in an engaging way.' },
      { title: 'The Disappearing Spoon', author: 'Sam Kean', desc: 'Another element-focused book but with more focus on the history of discovery. Good for discussing how chemical knowledge is built through experiment.' },
      { title: 'Molecules: The Elements and the Architecture of Everything', author: 'Theodore Gray', desc: 'Visual and accessible. Good for thinking about molecular structure and bonding in concrete terms.' },
      { title: 'Why Chemical Reactions Happen', author: 'James Keeler & Peter Wothers', desc: 'Bridges the gap between A-level and university chemistry. Specifically designed for applicants and gives you vocabulary for discussing reaction mechanisms at a deeper level.' },
    ],
    supercurriculars: `Chemistry Olympiad (UKChO) is the most directly relevant competition and develops problem-solving skills beyond A-level.

Independent practical work, even at home with safe experiments, shows enthusiasm for the experimental side. Document what you did, what you expected, and what actually happened.

An EPQ involving a chemistry investigation or literature review shows independent research skills. Choose a specific topic: "Comparing the effectiveness of different antioxidants" rather than "chemistry in everyday life."

Attending lectures or talks at universities (many offer public science events) gives you exposure to current research. The Royal Society of Chemistry has resources for students.

Reading Chemistry World (RSC magazine, free online) gives you access to current research developments you can reference.`,
    commonMistakes: [
      'Describing A-level experiments without reflecting on them. "We did a titration" is not a personal statement point. What did the experiment teach you about analytical chemistry?',
      'Focusing entirely on organic chemistry and ignoring physical or inorganic. Show breadth of interest.',
      'Not mentioning practical work at all. Chemistry is an experimental science. If your statement is entirely theoretical, it\'s incomplete.',
      'Writing about wanting to "cure diseases" or "save the environment." These are applications of chemistry, not evidence of understanding chemistry itself.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Chemistry and it helps you articulate what specifically interests you about the subject. It pushes you beyond A-level content toward the kind of chemical thinking admissions tutors want to see, and helps you reflect on practical experience in a way that demonstrates genuine scientific curiosity.`,
  },
];
