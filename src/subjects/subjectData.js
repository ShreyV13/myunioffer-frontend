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
      'Describing work experience without reflection. "I spent two weeks at a hospital and saw many different departments" tells admissions tutors nothing. One specific observation, reflected on properly, is worth more than a month of vague shadowing.',
      'Listing books without engaging with them. If you mention a book, you need to be ready to discuss a specific idea from it at interview. If you can\'t do that, leave it out.',
      'Ignoring the UCAT until summer. Many students leave UCAT prep until July or August and run out of time. Start in late May or June if possible.',
      'Applying to medical schools without checking their specific selection criteria. Each school weighs UCAT, personal statement, grades, and interviews differently.',
    ],
    howWeHelp: `Tell the AI coach you\'re applying for Medicine and it tailors everything to what medical schools actually want. It asks about your work experience and pushes you to reflect on specific moments. It suggests reading based on what specifically interests you within medicine, not just the standard list. As you chat over weeks, it stores your experiences and reflections. When you\'re ready to write, the Draft Builder pulls everything together into a structured first draft that sounds like you, not like a template.`,
    relatedSubjects: ['dentistry', 'psychology', 'biology'],
  },
  {
    slug: 'law',
    name: 'Law',
    metaTitle: 'Law personal statement tips and UCAS advice | myunioffer',
    metaDesc: 'How to write a Law personal statement that stands out. Recommended reading, activities, and mistakes to avoid. Free AI coaching.',
    heroHook: 'Every Law applicant writes about justice and fairness. Here\'s how to write a personal statement that shows you can actually think like a lawyer.',
    whatTutorsLookFor: `Law admissions tutors want evidence of analytical thinking. Not that you want to "fight for justice" or "help people," but that you can take an argument apart, identify its strengths and weaknesses, and form your own view. That skill matters more than any specific legal knowledge.

They want to see you engaging with legal concepts, cases, or debates beyond what you've covered in school. Reading about a Supreme Court case and explaining what you found interesting about the reasoning, or why you think the dissenting judgment was stronger, shows the kind of thinking they're looking for.

Work experience in law firms is useful but not essential. What tutors actually notice is whether you can reflect on what you observed. Sitting in a solicitor's office for a week and saying "I learned about conveyancing" is worthless. Noticing that the solicitor spent more time managing client expectations than giving legal advice, and reflecting on what that tells you about legal practice, is much stronger.

Extracurricular engagement matters. Mooting, debating, and essay competitions show you enjoy argument and analysis. But quality of reflection beats quantity of activities.`,
    reading: [
      { title: 'The Rule of Law', author: 'Tom Bingham', desc: 'The definitive accessible introduction to what the rule of law means and why it matters. Short, clear, and gives you concrete cases to discuss. Almost essential reading for Law applicants.' },
      { title: 'Justice: What\'s the Right Thing to Do?', author: 'Michael Sandel', desc: 'Philosophy meets law. Each chapter presents a moral dilemma with legal implications. Gives you frameworks for discussing ethics in your statement and interviews.' },
      { title: 'Talking to Strangers', author: 'Malcolm Gladwell', desc: 'Not a law book, but explores how people misjudge others and how systems fail. The chapters on criminal justice and policing give strong material for discussing how law works in practice.' },
      { title: 'Stories of the Law and How It\'s Broken', author: 'The Secret Barrister', desc: 'An insider account of the criminal justice system\'s failures. Gives you something specific to say about access to justice and legal aid that goes beyond textbook knowledge.' },
      { title: 'Letters to a Law Student', author: 'Nicholas McBride', desc: 'Practical and honest about what studying law is actually like. Useful for understanding what you\'re signing up for and showing tutors you\'ve done your research.' },
    ],
    supercurriculars: `Mooting and debating are the most directly relevant activities for Law applicants because they develop exactly the skills admissions tutors test: structuring an argument, responding to counterarguments, and thinking clearly under pressure. If your school has a debating society, join it. If it doesn't, start one.

Essay competitions give you something concrete to reference. The Cambridge Law Faculty essay competition, the Oxford Jurisprudence essay prize, and the Inner Temple essay competition are all worth entering. Even if you don't win, the process of writing a legal essay gives you material for your statement.

Work experience is useful but overvalued. A week at a law firm where you filed documents and sat in on meetings teaches you very little about legal thinking. If you do get a placement, focus on one specific case or situation you observed and reflect on what it showed you about how law works in practice.

Listening to legal podcasts is underrated. Law in Action (BBC Radio 4) covers current legal issues in 30-minute episodes. Referencing a specific episode shows you engage with law as a living subject, not just a textbook one.

The LNAT preparation process itself is a supercurricular. If you're sitting the LNAT, practising critical reasoning and argument analysis directly develops the thinking admissions tutors want to see.`,
    commonMistakes: [
      'Opening with "Law is the foundation of a just society" or any variation. Every other applicant starts this way. It tells the tutor nothing about you.',
      'Listing legal work experience without reflecting on what you observed. "I spent a week at a solicitor\'s office" is a fact, not an insight.',
      'Writing about wanting to "fight for justice" or "help the vulnerable." These are motivations, not evidence of legal thinking. Show you can analyse, not just care.',
      'Only discussing criminal law. Most law degrees and legal careers involve contract, tort, constitutional, or commercial law. Show breadth.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Law and it focuses on what law admissions tutors specifically look for: analytical thinking, engagement with legal concepts, and reflective writing. It pushes you to move beyond "I'm interested in justice" to specific legal arguments you've engaged with and what you think about them. It recommends reading based on what areas of law interest you, not just the standard list. Everything builds toward a personal statement that shows you think like a lawyer.`,
  },
  {
    slug: 'economics',
    name: 'Economics',
    metaTitle: 'Economics personal statement help and UCAS advice | myunioffer',
    metaDesc: 'What Economics admissions tutors look for in your personal statement. Reading recommendations, supercurriculars, and mistakes to avoid. Free AI coaching.',
    heroHook: 'Every Economics applicant mentions Freakonomics. Here\'s how to write a statement that shows genuine intellectual curiosity about how economies work.',
    whatTutorsLookFor: `Economics admissions tutors are looking for two things: mathematical ability and intellectual curiosity about economic questions. A strong Economics applicant doesn't just say they're interested in economics. They engage with a specific economic question, show they've read about it, and have their own view.

The maths component matters more than most applicants realise, especially for top programmes at LSE, Warwick, UCL, and Oxbridge. Your statement should mention mathematical thinking naturally, not as a separate section, but woven into how you discuss economic ideas. If you're analysing an economic argument, the ability to think about it quantitatively is what distinguishes you.

Tutors want to see you go beyond pop economics. Freakonomics and Thinking Fast and Slow are fine starting points, but if those are the only books you reference, you sound like everyone else. Engaging with one academic paper or one specific policy debate shows more initiative than naming five bestsellers.

The strongest applications connect economic theory to real-world observation. A student who read about monetary policy and then looked at what the Bank of England actually did during a specific period is more interesting than someone who summarises a textbook chapter.`,
    reading: [
      { title: 'Why Nations Fail', author: 'Daron Acemoglu & James Robinson', desc: 'Argues that institutions explain economic development. Strong because it\'s arguable. Do you think institutions are really the whole story? What about geography, culture, or luck? Having a view on this gives you something real to discuss.' },
      { title: 'Misbehaving', author: 'Richard Thaler', desc: 'The story of behavioural economics from one of its founders. More rigorous than Nudge and gives you specific experiments and findings to reference. Good for anyone interested in why people don\'t behave rationally.' },
      { title: 'The Undercover Economist', author: 'Tim Harford', desc: 'Better entry point than Freakonomics because it\'s more systematic about core economic concepts. Each chapter builds understanding rather than cherry-picking surprising findings.' },
      { title: 'Poor Economics', author: 'Abhijit Banerjee & Esther Duflo', desc: 'Development economics through the lens of randomised controlled trials. Less commonly cited than other pop economics books. Strong material for discussing evidence-based policy.' },
      { title: 'Bank of England Quarterly Bulletin', author: 'Bank of England (free online)', desc: 'Not a book. Published analyses of actual economic conditions. Referencing a specific BoE analysis shows you engage with real economics, not just popular books. Almost nobody does this.' },
    ],
    supercurriculars: `The most valuable supercurricular for Economics is reading The Economist or the Financial Times regularly and being able to discuss a specific article or argument. Not "I read The Economist every week" as a line in your statement, but actually referencing a specific piece and what you thought about it.

Essay competitions are strong for Economics because they force you to form an argument. The Royal Economic Society essay competition and the Marshall Society essay competition (Cambridge) are the most prestigious. The IEA also runs competitions. Even if you don't win, the writing process gives you material.

The Bank of England\'s educational resources are underused. Their "Explainers" series covers topics like quantitative easing, inflation targeting, and financial stability in accessible but rigorous language. Referencing one of these shows initiative beyond pop economics.

Free online courses on edX or Coursera can work if you engage with specific content. MIT\'s introductory microeconomics or the IMF\'s financial markets course give you technical vocabulary and frameworks. But "I completed a course" is not a supercurricular. "The course introduced me to game theory and I started noticing it in how supermarkets price products" is.

If you have mathematical strength, consider Further Maths or STEP preparation even if your course doesn't require it. Being comfortable with mathematical reasoning is the single biggest advantage in Economics applications at top universities.`,
    commonMistakes: [
      'Name-dropping Freakonomics and Thinking Fast and Slow without engaging with any specific argument. Every Economics applicant mentions these books. If you reference them, you need to say something the admissions tutor hasn\'t read a hundred times.',
      'Describing economics as "everywhere" or "fascinating" without specifying what part of it interests you. Behavioural economics, development economics, monetary policy, labour markets: pick one thread.',
      'Ignoring the mathematical side. Top Economics programmes are quantitative. If your statement reads like it could be for a Politics or Business degree, it\'s not targeted enough.',
      'Writing about wanting to "solve inequality" or "fix the economy." These are political positions, not economic analysis. Show you can think analytically, not just ideologically.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Economics and it pushes you toward the specificity that admissions tutors want. Instead of "I'm interested in economics," it asks what specific economic question you find most interesting and helps you build your statement around that thread. It recommends reading based on your actual interests, not just the standard list. It challenges you to go beyond describing books and start arguing with them.`,
  },
  {
    slug: 'computer-science',
    name: 'Computer Science',
    metaTitle: 'Computer Science personal statement help | myunioffer',
    metaDesc: 'What CS admissions tutors want in your personal statement. Projects, reading, competitions, and mistakes to avoid. Free AI coaching.',
    heroHook: 'Listing programming languages isn\'t a personal statement. Here\'s what Computer Science admissions tutors actually want to see.',
    whatTutorsLookFor: `Computer Science admissions tutors, especially at Oxbridge and Imperial, care more about your mathematical and problem-solving ability than your coding portfolio. A student who can reason through an algorithm and explain why it works is more impressive than someone who built a website following a tutorial.

That said, personal projects matter when they demonstrate genuine problem-solving. Not what you built, but what decisions you made and why. "I built a to-do app" means nothing. "I needed to decide between a linked list and an array for storing tasks, and here's why I chose one over the other" shows computational thinking.

Tutors want to see intellectual curiosity beyond the syllabus. Reading about algorithms, computational theory, or the history of computing and engaging with specific ideas shows you're interested in the subject itself, not just coding as a skill.

For Oxbridge specifically, mathematical thinking dominates interviews. STEP and MAT preparation is directly relevant. If you can think clearly about proofs, logic, and problem decomposition, that matters more than any project.`,
    reading: [
      { title: 'Code', author: 'Charles Petzold', desc: 'Builds from basic switches to a complete computer, layer by layer. Gives you genuine understanding of what happens under the hood, which is far more impressive in a statement than listing languages you know.' },
      { title: 'Algorithms to Live By', author: 'Brian Christian & Tom Griffiths', desc: 'Connects computer science algorithms to everyday decisions. Lighter read but gives you frameworks for talking about CS concepts in a relatable way.' },
      { title: 'Godel, Escher, Bach', author: 'Douglas Hofstadter', desc: 'Dense but rewarding. Explores consciousness, formal systems, and self-reference. Even reading a few chapters gives you deep material for discussing the foundations of computation.' },
      { title: 'The Art of Problem Solving (Volume 1)', author: 'Richard Rusczyk', desc: 'Not a CS book, it\'s mathematical problem-solving. But the thinking it develops is exactly what CS interviews test. Useful if you\'re targeting Oxbridge.' },
    ],
    supercurriculars: `The strongest supercurricular for Computer Science is a personal project where you solved a real problem. Not a tutorial project. Something you identified, designed a solution for, and built yourself. A script that automates something tedious in your life, a tool for your school, a game with interesting mechanics. The size doesn't matter. The thinking does.

Competitions like the British Informatics Olympiad (BIO), UKMT, and Bebras develop problem-solving skills that directly translate to interviews and your statement. Even participating without winning shows initiative.

Contributing to open source is impressive because it shows you can read and navigate other people's code, not just write your own. Even fixing a bug in documentation counts.

For Oxbridge applicants, STEP and MAT preparation is arguably more important than any coding project. Spend your summer doing past papers and building mathematical proof skills.

Avoid: listing programming languages, describing tutorial projects as if you designed them, and prioritising web development over algorithmic thinking. Building a React website impresses employers, not admissions tutors.`,
    commonMistakes: [
      'Listing programming languages as if they\'re achievements. "I know Python, Java, C++, and JavaScript" tells admissions tutors nothing about how you think.',
      'Describing a tutorial project as if you designed it. Tutors can tell. If you followed a YouTube series to build a calculator, don\'t present it as your own creation.',
      'Ignoring mathematics. CS at top universities is a maths-heavy degree. If your statement could equally be for a web design course, it\'s not targeted enough.',
      'Only talking about what you built, never about what went wrong. The debugging story is more interesting than the finished product.',
    ],
    howWeHelp: `Tell the AI coach you're applying for Computer Science and it focuses on what actually matters for CS admissions: problem-solving thinking, not coding skills. It asks about your projects and pushes you to reflect on design decisions and trade-offs, not just features. It suggests reading that goes beyond "learn Python" into the ideas behind computing. For Oxbridge applicants, it helps you articulate mathematical thinking alongside technical work.`,
  },
  {
    slug: 'engineering',
    name: 'Engineering',
    metaTitle: 'Engineering personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write an Engineering personal statement. What admissions tutors look for, reading list, supercurriculars, and common mistakes. Free AI coaching.',
    heroHook: '"Engineering" covers everything from bridges to biomedical devices. Here\'s how to write a personal statement that shows you understand your specific branch.',
    whatTutorsLookFor: `Engineering admissions tutors want to see two things: a genuine understanding of what engineering is (not just "building things") and evidence that you can think analytically about problems. Engineering is applied problem-solving. Your statement needs to show you've done some of that, even at a basic level.

They want to see that you've chosen your specific branch deliberately. Mechanical, electrical, chemical, civil, biomedical, aerospace, each has different priorities. A statement that could apply to any branch of engineering is too vague. Show you know what makes your chosen branch distinctive and why it appeals to you specifically.

Practical experience matters more for Engineering than for most subjects. A project where you designed, built, or tested something, even at a simple level, gives you concrete material. The process matters more than the result. What problem were you solving? What trade-offs did you consider? What failed and what did you learn from it?

Maths and physics are foundational. Tutors want to see you're comfortable applying mathematical thinking to real-world problems, not just solving equations in an exam.`,
    reading: [
      { title: 'To Engineer Is Human', author: 'Henry Petroski', desc: 'About engineering failures and what they teach us about design. Counterintuitively, studying failure is the most interesting way to understand engineering thinking.' },
      { title: 'Stuff Matters', author: 'Mark Miodownik', desc: 'Material science made accessible. Covers why specific materials behave the way they do. Good for chemical and materials engineering applicants, but interesting for any branch.' },
      { title: 'The Design of Everyday Things', author: 'Don Norman', desc: 'How design thinking works. Relevant for any engineering branch because it\'s about how engineers should think about the people who use what they build.' },
      { title: 'Structures: Or Why Things Don\'t Fall Down', author: 'J.E. Gordon', desc: 'Classic introduction to structural engineering principles. Written clearly enough for A-level students. Especially relevant for civil and mechanical engineering.' },
    ],
    supercurriculars: `The best supercurricular for Engineering is a hands-on project. Arduino or Raspberry Pi projects, 3D printing designs, a bridge-building challenge, a water filtration experiment, anything where you designed a solution to a problem and tested it. The result doesn't need to be impressive. The process of identifying requirements, considering options, building a prototype, and evaluating what worked is what admissions tutors want to hear about.

Engineering competitions like the Faraday Challenge, IET competitions, and STEM olympiads give you structured project experience and look strong on your statement.

An EPQ with an engineering focus works well if the topic is specific. "Renewable energy" is too broad. "Comparing the efficiency of small-scale solar panel configurations for UK residential roofs" is specific and shows engineering thinking.

For chemical engineering specifically, anything involving process design or chemistry applied to real-world problems. For electrical, circuits projects or signal processing experiments. For civil, structural analysis of buildings or bridges you've visited.

Factory or site visits, if you can arrange them, give you material about how engineering works in practice. One specific observation from a visit is worth more than a paragraph of generic enthusiasm.`,
    commonMistakes: [
      'Writing a statement that could apply to any branch of engineering. "I want to solve problems and build things" describes every engineer. What specifically about your chosen branch interests you?',
      'Describing a project without explaining your decision-making process. "I built a robot" is a fact. "I chose a servo motor over a stepper motor because..." is engineering thinking.',
      'Ignoring the maths. Engineering is applied mathematics. If your statement doesn\'t mention mathematical thinking anywhere, it\'s incomplete.',
      'Only talking about famous engineering achievements (bridges, skyscrapers, space rockets) without connecting them to your own thinking or experience.',
    ],
    howWeHelp: `Tell the AI coach your specific branch of Engineering and it tailors advice to that discipline. Chemical engineering gets different supercurricular suggestions than electrical or civil. It pushes you to reflect on project decisions and trade-offs, not just describe what you built. It helps you connect your practical experience to the engineering principles behind it.`,
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
    metaTitle: 'PPE personal statement help and UCAS advice | myunioffer',
    metaDesc: 'How to write a PPE personal statement for Oxford, LSE, Warwick and beyond. Reading list, supercurriculars, and mistakes to avoid. Free AI coaching.',
    heroHook: 'PPE is the most interdisciplinary degree you can apply for. Here\'s how to write a statement that doesn\'t read like three separate subjects glued together.',
    whatTutorsLookFor: `PPE admissions tutors want to see a student who can think across disciplinary boundaries. The strongest applications don't treat Philosophy, Politics, and Economics as three separate subjects. They show how questions in one field connect to another.

A student discussing economic inequality who considers both the empirical data (Economics), the policy responses (Politics), and the moral framework for what counts as "fair" (Philosophy) is demonstrating exactly the kind of thinking PPE programmes develop.

Tutors want to see intellectual curiosity and the ability to engage with arguments critically. Not "I read this book and found it interesting" but "this author argues X, but I think their evidence for Y is weaker because Z." That critical voice is what distinguishes strong PPE applicants.

For Oxford specifically, the philosophy component catches many applicants off guard. You need to show some engagement with philosophical reasoning, not just political opinions or economic models. Logic, ethics, or epistemology at even a basic level shows you know what you're signing up for.

Mathematical ability matters for the economics side, especially at Oxford and LSE. Showing comfort with quantitative reasoning strengthens your application significantly.`,
    reading: [
      { title: 'Justice: What\'s the Right Thing to Do?', author: 'Michael Sandel', desc: 'The best entry point into political philosophy for PPE applicants. Each chapter presents a dilemma that combines ethics, politics, and economics.' },
      { title: 'Why Nations Fail', author: 'Acemoglu & Robinson', desc: 'Bridges economics and politics through institutional analysis. Strong because it\'s arguable. What do you think they get wrong?' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', desc: 'Bridges psychology and economics. Useful for the behavioural economics angle, but engage with specific findings rather than summarising.' },
      { title: 'The Communist Manifesto', author: 'Marx & Engels', desc: 'Short, foundational, and gives you something to argue with. You don\'t have to agree with it. Engaging critically with its logic is the point.' },
      { title: 'The Economist magazine', author: 'Weekly', desc: 'Current affairs through an economic lens. Reference a specific article and argue with it rather than saying "I read The Economist regularly."' },
    ],
    supercurriculars: `Essay competitions are the strongest supercurricular for PPE because they force you to construct arguments. The Marshall Society essay competition, the Oxford Philosophy essay prize, and the RES essay competition all overlap with PPE content.

Debating develops the quick analytical thinking that PPE interviews test. If you can construct and defend an argument under time pressure, that skill transfers directly.

Reading across all three disciplines is important. Many applicants lean heavily on economics and ignore philosophy, or focus on politics and neglect the quantitative side. Show balance.

Current affairs engagement through The Economist, Financial Times, or political journals like Prospect gives you material that connects theory to practice.

Model UN works for PPE better than for most subjects because it combines political negotiation with policy analysis, but only if you can reflect on it meaningfully, not just list it as an activity.`,
    commonMistakes: [
      'Writing three separate paragraphs for Philosophy, Politics, and Economics that don\'t connect to each other. PPE is one degree, not three.',
      'Ignoring philosophy. Many applicants focus on politics and economics because they feel more concrete. But PPE programmes, especially Oxford, take philosophy seriously.',
      'Only having political opinions without analytical reasoning behind them. "I believe inequality is wrong" is a position. "Rawls argues inequality is only justified when it benefits the worst-off, and I think this framework has a specific weakness" is analysis.',
      'Listing books without engaging with arguments. Every PPE applicant reads Freakonomics and Sandel. What did you actually think about what they said?',
    ],
    howWeHelp: `Tell the AI coach you're applying for PPE and it helps you weave Philosophy, Politics, and Economics into a coherent thread. It pushes you to connect ideas across disciplines instead of treating them separately. It challenges you to form your own arguments rather than summarising other people's, and suggests reading that bridges multiple areas of PPE.`,
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
