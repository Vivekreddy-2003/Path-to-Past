const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text"),
  startBtn = document.querySelector(".start"),
  categorySelect = document.querySelector("#category"),
  numQuestionsSelect = document.querySelector("#num-questions"), // Added
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen"),
  submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next"),
  endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startQuiz = () => {
  const selectedCategory = categorySelect.value;
  const numQuestions = parseInt(numQuestionsSelect.value); // Added
  if (selectedCategory && numQuestions > 0) {
    // Updated
    questions = getQuestionsByCategory(selectedCategory, numQuestions); // Updated
    loadingAnimation();
    setTimeout(() => {
      startScreen.classList.add("hide");
      quiz.classList.remove("hide");
      currentQuestion = 1;
      showQuestion(questions[0]);
    }, 1000);
  } else {
    alert(
      "Please select both a category and the number of questions to start the quiz."
    ); // Updated
  }
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${currentQuestion}</span>`;

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = parseInt(timePerQuestion.value);
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};

submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

const playAudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};

// Sample questions for different categories
const Maurya = [
  {
    question: "Who was the mother of Ashoka?",
    correct_answer: "Subhadrangi",
    incorrect_answers: ["Helena", "Devi", "Durdhara"],
  },
  {
    question: "What was the capital of the Maurya Empire?",
    correct_answer: "Pataliputra",
    incorrect_answers: ["Taxila", "Ujjain", "Varanasi"],
  },
  {
    question:
      "Under whose rule did the Maurya Empire reach its greatest extent?",
    correct_answer: "Ashoka",
    incorrect_answers: ["Bindusara", "Chandragupta Maurya", "Brihadratha"],
  },
  {
    question: "Who was the founder of the Maurya Empire?",
    correct_answer: "Chandragupta Maurya",
    incorrect_answers: ["Ashoka", "Bindusara", "Bimbisara"],
  },
  {
    question:
      "Which famous Mauryan emperor embraced Buddhism after the Kalinga War?",
    correct_answer: "Ashoka",
    incorrect_answers: ["Chandragupta Maurya", "Bindusara", "Brihadratha"],
  },
  {
    question: "Who was the last ruler of the Maurya Empire?",
    correct_answer: "Brihadratha",
    incorrect_answers: ["Chandragupta Maurya", "Ashoka", "Bindusara"],
  },
  {
    question:
      "Who was the prime minister of the Mauryan Empire and later became a Buddhist monk?",
    correct_answer: "Chanakya",
    incorrect_answers: ["Kautilya", "Ashoka", "Megasthenes"],
  },
  {
    question:
      "Which famous Indian treatise on statecraft was authored by Chanakya?",
    correct_answer: "Arthashastra",
    incorrect_answers: ["Manusmriti", "Kamasutra", "Ramayana"],
  },
  {
    question:
      "The Mauryan Empire reached its greatest territorial extent under the reign of:",
    correct_answer: "Ashoka",
    incorrect_answers: ["Chandragupta Maurya", "Bindusara", "Brihadratha"],
  },
  {
    question: "The Mauryan Empire disintegrated around which century CE?",
    correct_answer: "2nd century BCE",
    incorrect_answers: ["4th century BCE", "3rd century CE", "1st century CE"],
  },
  {
    question:
      "Which river was of significant importance to the Mauryan Empire's economy and communication?",
    correct_answer: "Ganges",
    incorrect_answers: ["Yamuna", "Indus", "Godavari"],
  },
  {
    question:
      "What was the name of Chandragupta Maurya's mentor and strategist?",
    correct_answer: "Kautilya",
    incorrect_answers: ["Aryabhata", "Panini", "Vishnu Sharma"],
  },
  {
    question: "Which Mauryan ruler expanded the empire into the Deccan region?",
    correct_answer: "Bindusara",
    incorrect_answers: ["Chandragupta Maurya", "Ashoka", "Brihadratha"],
  },
  {
    question:
      "Which ancient city served as the capital of the Mauryan Empire and is now known as Patna?",
    correct_answer: "Pataliputra",
    incorrect_answers: ["Takshashila", "Varanasi", "Ujjain"],
  },
  {
    question:
      "Who was the contemporary Greek ruler during the reign of Chandragupta Maurya?",
    correct_answer: "Alexander the Great",
    incorrect_answers: ["Cleopatra", "Julius Caesar", "Pericles"],
  },
  {
    question: "Which rock edict of Ashoka inscribed his policy of Dhamma?",
    correct_answer: "Girnar Edict",
    incorrect_answers: ["Kalinga Edict", "Rummindei Edict", "Sanchi Edict"],
  },
  {
    question:
      "Which Mauryan emperor was known for his patronage of Buddhism and propagation of Dhamma?",
    correct_answer: "Ashoka",
    incorrect_answers: ["Chandragupta Maurya", "Bindusara", "Brihadratha"],
  },
  {
    question:
      "Which Greek historian visited the Mauryan Empire and wrote extensively about it?",
    correct_answer: "Megasthenes",
    incorrect_answers: ["Herodotus", "Plutarch", "Thucydides"],
  },
  {
    question: "What was the main economic activity during the Mauryan period?",
    correct_answer: "Trade and Commerce",
    incorrect_answers: ["Agriculture", "Fishing", "Animal Husbandry"],
  },
  {
    question:
      "Which Mauryan emperor was posthumously referred to as 'Devanampriya Priyadarsin'?",
    correct_answer: "Ashoka",
    incorrect_answers: ["Chandragupta Maurya", "Bindusara", "Brihadratha"],
  },
  {
    question:
      "Who was the contemporary ruler of the Persian Empire during the reign of Chandragupta Maurya?",
    correct_answer: "Darius III",
    incorrect_answers: ["Cyrus the Great", "Xerxes I", "Artaxerxes II"],
  },
];

const Magadha = [
  {
    question: "Which ancient kingdom was the nucleus of the Mauryan Empire?",
    correct_answer: "Magadha",
    incorrect_answers: ["Kosala", "Vatsa", "Avanti"],
  },
  {
    question:
      "Who was the first ruler of Magadha to establish an empire in ancient India?",
    correct_answer: "Bimbisara",
    incorrect_answers: ["Chandragupta Maurya", "Ashoka", "Bindusara"],
  },
  {
    question:
      "Under whose rule did Magadha become the most powerful kingdom in ancient India?",
    correct_answer: "Ajatashatru",
    incorrect_answers: ["Bimbisara", "Chandragupta Maurya", "Ashoka"],
  },
  {
    question:
      "Which ancient city served as the capital of Magadha during the reign of Bimbisara and Ajatashatru?",
    correct_answer: "Rajagriha",
    incorrect_answers: ["Pataliputra", "Ujjain", "Varanasi"],
  },
  {
    question:
      "Who was the famous contemporary of Gautama Buddha and the king of Magadha?",
    correct_answer: "Bimbisara",
    incorrect_answers: ["Ajatashatru", "Chandragupta Maurya", "Ashoka"],
  },
  {
    question:
      "Which ruler of Magadha is known for his contributions to the First Buddhist Council?",
    correct_answer: "Ajatashatru",
    incorrect_answers: ["Bimbisara", "Chandragupta Maurya", "Ashoka"],
  },
  {
    question:
      "Which Indian emperor annexed the kingdom of Magadha into his empire and shifted his capital to Pataliputra?",
    correct_answer: "Chandragupta Maurya",
    incorrect_answers: ["Ashoka", "Bindusara", "Bimbisara"],
  },
  {
    question:
      "What was the name of the royal palace built by Ajatashatru in Pataliputra?",
    correct_answer: "Hastinapura",
    incorrect_answers: ["Sarnath", "Vaishali", "Ayodhya"],
  },
  {
    question:
      "Which famous Mauryan emperor was the son of Bimbisara, the king of Magadha?",
    correct_answer: "Ajatashatru",
    incorrect_answers: ["Chandragupta Maurya", "Ashoka", "Bindusara"],
  },
  {
    question:
      "Who was the founder of the Haryanka dynasty, the earliest ruling dynasty of Magadha?",
    correct_answer: "Bimbisara",
    incorrect_answers: ["Ajatashatru", "Chandragupta Maurya", "Ashoka"],
  },
  {
    question:
      "Which famous ancient Indian university was located in the kingdom of Magadha?",
    correct_answer: "Nalanda University",
    incorrect_answers: [
      "Taxila University",
      "Vikramashila University",
      "Takshashila University",
    ],
  },
  {
    question:
      "Which ruler of Magadha was known for his patronage of the Jains and was also the son of Bimbisara?",
    correct_answer: "Ajatashatru",
    incorrect_answers: ["Chandragupta Maurya", "Ashoka", "Bindusara"],
  },
  {
    question:
      "Which ancient Indian religious figure was born in Lumbini, which was a part of the kingdom of Magadha?",
    correct_answer: "Gautama Buddha",
    incorrect_answers: [
      "Mahavira",
      "Adi Shankaracharya",
      "Ramakrishna Paramahamsa",
    ],
  },
  {
    question: "Which river flows through the heart of the kingdom of Magadha?",
    correct_answer: "Ganges",
    incorrect_answers: ["Yamuna", "Godavari", "Krishna"],
  },
  {
    question:
      "Which ancient Indian epic mentions the kingdom of Magadha as one of the prominent kingdoms?",
    correct_answer: "Mahabharata",
    incorrect_answers: ["Ramayana", "Bhagavad Gita", "Puranas"],
  },
  {
    question:
      "Which ruler of Magadha is known for his military campaigns and his fortress called Pataligrama?",
    correct_answer: "Ajatashatru",
    incorrect_answers: ["Bimbisara", "Chandragupta Maurya", "Ashoka"],
  },
  {
    question:
      "Which ancient Indian philosopher and teacher resided in the kingdom of Magadha and established a monastic community?",
    correct_answer: "Mahavira",
    incorrect_answers: [
      "Gautama Buddha",
      "Adi Shankaracharya",
      "Ramakrishna Paramahamsa",
    ],
  },
  {
    question:
      "Which ancient Indian text mentions Magadha as a prosperous kingdom with its capital at Girivraja?",
    correct_answer: "Buddhist Jataka Tales",
    incorrect_answers: ["Arthashastra", "Ramayana", "Puranas"],
  },
  {
    question:
      "Which Mauryan emperor was born in the city of Pataliputra in the kingdom of Magadha?",
    correct_answer: "Ashoka",
    incorrect_answers: ["Chandragupta Maurya", "Bindusara", "Bimbisara"],
  },
  {
    question:
      "Which famous Indian emperor is said to have belonged to the Ikshvaku dynasty, which ruled over Magadha?",
    correct_answer: "Ashoka",
    incorrect_answers: ["Chandragupta Maurya", "Bindusara", "Bimbisara"],
  },
  {
    question:
      "Which ancient Indian king of Magadha is mentioned in Buddhist scriptures as a contemporary of Gautama Buddha?",
    correct_answer: "Bimbisara",
    incorrect_answers: ["Ajatashatru", "Chandragupta Maurya", "Ashoka"],
  },

  // Add more social questions
];
const Shunga = [
  {
    question: "Which dynasty succeeded the Maurya Empire in ancient India?",
    correct_answer: "Shunga",
    incorrect_answers: ["Gupta", "Kushan", "Satavahana"],
  },
  {
    question: "Who was the founder of the Shunga dynasty?",
    correct_answer: "Pushyamitra Shunga",
    incorrect_answers: ["Ashoka", "Chandragupta Maurya", "Bindusara"],
  },
  {
    question: "During which century did the Shunga dynasty rule in India?",
    correct_answer: "2nd century BCE",
    incorrect_answers: [
      "1st century BCE",
      "3rd century BCE",
      "4th century BCE",
    ],
  },
  {
    question:
      "Which ancient Indian text mentions the establishment of the Shunga dynasty after the fall of the Mauryas?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Mahabharata", "Buddhist Jataka Tales"],
  },
  {
    question: "Which city served as the capital of the Shunga dynasty?",
    correct_answer: "Pataliputra",
    incorrect_answers: ["Varanasi", "Ujjain", "Takshashila"],
  },
  {
    question: "Who was the last ruler of the Shunga dynasty?",
    correct_answer: "Devabhuti",
    incorrect_answers: ["Pushyamitra Shunga", "Agnimitra", "Vasumitra"],
  },
  {
    question:
      "Which Greek king invaded India during the reign of the Shunga dynasty?",
    correct_answer: "Demetrius",
    incorrect_answers: [
      "Alexander the Great",
      "Seleucus I Nicator",
      "Antiochus III",
    ],
  },
  {
    question:
      "Which Shunga ruler is known for his patronage of Buddhism and for constructing the Great Stupa at Sanchi?",
    correct_answer: "Pushyamitra Shunga",
    incorrect_answers: ["Agnimitra", "Devabhuti", "Vasumitra"],
  },
  {
    question:
      "Which ancient Indian text mentions the assassination of the last Mauryan emperor and the rise of the Shunga dynasty?",
    correct_answer: "Divyavadana",
    incorrect_answers: ["Buddhist Jataka Tales", "Puranas", "Mahabharata"],
  },
  {
    question:
      "Which Shunga ruler is known for his military campaigns and for extending the dynasty's territory?",
    correct_answer: "Agnimitra",
    incorrect_answers: ["Pushyamitra Shunga", "Devabhuti", "Vasumitra"],
  },
  {
    question: "Which Indian city was the stronghold of the Shunga dynasty?",
    correct_answer: "Vidisha",
    incorrect_answers: ["Ujjain", "Kosambi", "Pataliputra"],
  },
  {
    question:
      "Which ancient Indian philosopher is associated with the court of the Shunga king, Pushyamitra?",
    correct_answer: "Nagarjuna",
    incorrect_answers: ["Adi Shankaracharya", "Chanakya", "Aryabhata"],
  },
  {
    question:
      "Who was the son of Pushyamitra Shunga and succeeded him as the ruler of the Shunga dynasty?",
    correct_answer: "Agnimitra",
    incorrect_answers: ["Devabhuti", "Vasumitra", "Bhagabhadra"],
  },
  {
    question:
      "Which Shunga ruler is credited with issuing the first known gold coins in India?",
    correct_answer: "Vasumitra",
    incorrect_answers: ["Pushyamitra Shunga", "Agnimitra", "Devabhuti"],
  },
  {
    question:
      "Which ancient Indian text mentions the Shunga dynasty's oppression of Buddhists?",
    correct_answer: "Mahavamsa",
    incorrect_answers: ["Mahabharata", "Puranas", "Buddhist Jataka Tales"],
  },
  {
    question:
      "Which Shunga king is said to have defeated the Yavanas (Indo-Greeks) and restored the pride of Indian rulers?",
    correct_answer: "Pushyamitra Shunga",
    incorrect_answers: ["Agnimitra", "Devabhuti", "Vasumitra"],
  },
  {
    question:
      "Which ancient Indian scholar is said to have composed the famous work 'Yuga-Purana' during the Shunga period?",
    correct_answer: "Gargi Vachaknavi",
    incorrect_answers: ["Vatsyayana", "Sushruta", "Charaka"],
  },
  {
    question:
      "Who was the last ruler of the Shunga dynasty before it was overthrown by the Kanva dynasty?",
    correct_answer: "Devabhuti",
    incorrect_answers: ["Pushyamitra Shunga", "Agnimitra", "Vasumitra"],
  },
  {
    question:
      "Which Shunga ruler is known for his patronage of the arts, including music and dance?",
    correct_answer: "Bhagabhadra",
    incorrect_answers: ["Pushyamitra Shunga", "Agnimitra", "Devabhuti"],
  },
  {
    question:
      "Which ancient Indian text mentions the Shunga dynasty's rule over Magadha?",
    correct_answer: "Mudrarakshasa",
    incorrect_answers: ["Arthashastra", "Puranas", "Buddhist Jataka Tales"],
  },
];
const Satavahana = [
  {
    question:
      "Which ancient Indian dynasty is known for its contributions to the history of the Deccan region?",
    correct_answer: "Satavahana",
    incorrect_answers: ["Maurya", "Gupta", "Shunga"],
  },
  {
    question: "Who is considered to be the founder of the Satavahana dynasty?",
    correct_answer: "Simuka",
    incorrect_answers: ["Gautamiputra Satakarni", "Pulamavi", "Satakarni II"],
  },
  {
    question:
      "In which region of India did the Satavahana dynasty primarily rule?",
    correct_answer: "Deccan",
    incorrect_answers: ["Gangetic Plain", "Indo-Gangetic Plain", "Gujarat"],
  },
  {
    question:
      "Which Indian emperor of the Satavahana dynasty is known for his extensive military campaigns against the Western Kshatrapas?",
    correct_answer: "Gautamiputra Satakarni",
    incorrect_answers: ["Simuka", "Pulamavi", "Satakarni II"],
  },
  {
    question:
      "Which ancient Indian text mentions the Satavahana dynasty and its rulers?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Which Satavahana ruler is credited with the restoration of Vedic Brahmanism and performing the Ashvamedha sacrifice?",
    correct_answer: "Gautamiputra Satakarni",
    incorrect_answers: ["Simuka", "Pulamavi", "Satakarni II"],
  },
  {
    question: "What was the capital city of the Satavahana dynasty?",
    correct_answer: "Pratishthana",
    incorrect_answers: ["Pataliputra", "Ujjain", "Taxila"],
  },
  {
    question:
      "Which Satavahana ruler is known for his naval expeditions and the establishment of the Satakarni era?",
    correct_answer: "Satakarni II",
    incorrect_answers: ["Simuka", "Gautamiputra Satakarni", "Pulamavi"],
  },
  {
    question:
      "Which ancient Indian text mentions the Satavahana ruler Gautamiputra Satakarni and his military achievements?",
    correct_answer: "Junagadh rock inscription",
    incorrect_answers: [
      "Mahavamsa",
      "Mudrarakshasa",
      "Periplus of the Erythraean Sea",
    ],
  },
  {
    question:
      "Which Satavahana ruler is known for his contributions to Buddhist architecture, including the construction of the Amaravati Stupa?",
    correct_answer: "Pulamavi",
    incorrect_answers: ["Simuka", "Gautamiputra Satakarni", "Satakarni II"],
  },
  {
    question:
      "Which ancient Indian text mentions the Satavahana ruler Gautamiputra Satakarni and his victory over the Western Kshatrapas?",
    correct_answer: "Nasik cave inscription",
    incorrect_answers: [
      "Aihole inscription",
      "Ellora cave inscription",
      "Khalsi inscription",
    ],
  },
  {
    question:
      "Which Satavahana ruler is known for his extensive patronage of Buddhism and his contributions to the development of Buddhist literature?",
    correct_answer: "Vasishthiputra Pulumavi",
    incorrect_answers: ["Simuka", "Gautamiputra Satakarni", "Satakarni II"],
  },
  {
    question:
      "Which foreign ruler invaded India during the reign of the Satavahana king Pulamavi?",
    correct_answer: "Saka-Pahlava",
    incorrect_answers: ["Kushan", "Indo-Greeks", "Indo-Scythians"],
  },
  {
    question:
      "Which Satavahana ruler is associated with the establishment of the Ikshvaku dynasty, which ruled over parts of South India?",
    correct_answer: "Yajna Sri Satakarni",
    incorrect_answers: ["Simuka", "Gautamiputra Satakarni", "Pulamavi"],
  },
  {
    question:
      "Which ancient Indian text mentions the Satavahana king Yajna Sri Satakarni and his military campaigns?",
    correct_answer: "Nasik cave inscription",
    incorrect_answers: [
      "Junagadh rock inscription",
      "Aihole inscription",
      "Khalsi inscription",
    ],
  },
  {
    question:
      "Which Satavahana ruler is known for his ambitious territorial expansions and his conflict with the Western Kshatrapas?",
    correct_answer: "Yajna Sri Satakarni",
    incorrect_answers: ["Simuka", "Gautamiputra Satakarni", "Pulamavi"],
  },
  {
    question:
      "Which ancient Indian text mentions the Satavahana ruler Satakarni II and his victories over his enemies?",
    correct_answer: "Vadnagar inscription",
    incorrect_answers: [
      "Junagadh rock inscription",
      "Nasik cave inscription",
      "Aihole inscription",
    ],
  },
  {
    question:
      "Which Satavahana ruler is associated with the spread of Jainism in South India?",
    correct_answer: "Hāla",
    incorrect_answers: ["Simuka", "Gautamiputra Satakarni", "Pulamavi"],
  },
  {
    question:
      "Which ancient Indian text mentions the Satavahana ruler Hāla and his patronage of Jainism?",
    correct_answer: "Prakrit Prakasha",
    incorrect_answers: ["Brihatkatha", "Ratnavali", "Panchatantra"],
  },
  {
    question:
      "Which Satavahana ruler is associated with the construction of the Naneghat inscription, which describes his rule and achievements?",
    correct_answer: "Gautamiputra Satakarni",
    incorrect_answers: ["Simuka", "Pulamavi", "Satakarni II"],
  },
];
const Kushan = [
  {
    question: "Who was the founder of the Kushan Dynasty?",
    correct_answer: "Kujula Kadphises",
    incorrect_answers: ["Kanishka", "Huvishka", "Vima Kadphises"],
  },
  {
    question: "During which century did the Kushan Dynasty rule in India?",
    correct_answer: "1st to 3rd centuries CE",
    incorrect_answers: [
      "2nd to 4th centuries CE",
      "3rd to 5th centuries CE",
      "4th to 6th centuries CE",
    ],
  },
  {
    question: "What was the capital city of the Kushan Dynasty?",
    correct_answer: "Purushapura (modern-day Peshawar)",
    incorrect_answers: ["Mathura", "Taxila", "Kandahar"],
  },
  {
    question:
      "Under which ruler did the Kushan Dynasty witness its greatest expansion and cultural flourishing?",
    correct_answer: "Kanishka",
    incorrect_answers: ["Kujula Kadphises", "Huvishka", "Vima Kadphises"],
  },
  {
    question:
      "Which Kushan ruler is known for his patronage of Buddhism and the hosting of the Fourth Buddhist Council?",
    correct_answer: "Kanishka",
    incorrect_answers: ["Kujula Kadphises", "Huvishka", "Vima Kadphises"],
  },
  {
    question: "What was the primary religion practiced by the Kushan rulers?",
    correct_answer: "Hinduism and Buddhism",
    incorrect_answers: ["Zoroastrianism", "Christianity", "Jainism"],
  },
  {
    question:
      "Under which Kushan ruler did the dynasty establish extensive trade links with Rome and China along the Silk Road?",
    correct_answer: "Vima Kadphises",
    incorrect_answers: ["Kujula Kadphises", "Kanishka", "Huvishka"],
  },
  {
    question: "Who succeeded Kanishka as the ruler of the Kushan Dynasty?",
    correct_answer: "Huvishka",
    incorrect_answers: ["Kujula Kadphises", "Vima Kadphises", "Vasudeva I"],
  },
  {
    question:
      "Under which Kushan ruler did the empire face invasions from the Sassanian Persians and the White Huns?",
    correct_answer: "Vasudeva I",
    incorrect_answers: ["Kujula Kadphises", "Kanishka", "Huvishka"],
  },
  {
    question:
      "Who was the last significant ruler of the Kushan Dynasty before its decline and fragmentation?",
    correct_answer: "Vasudeva II",
    incorrect_answers: ["Kanishka", "Huvishka", "Vasudeva I"],
  },
  {
    question:
      "Which contemporary dynasty posed a significant challenge to the authority of the Kushan Empire?",
    correct_answer: "Sassanian Empire",
    incorrect_answers: ["Maurya Dynasty", "Gupta Empire", "Hephthalite Empire"],
  },
  {
    question:
      "Under which Kushan ruler did the empire witness the establishment of the Gandhara School of Art?",
    correct_answer: "Kanishka",
    incorrect_answers: ["Kujula Kadphises", "Huvishka", "Vima Kadphises"],
  },
  {
    question:
      "Which ancient Indian text mentions the Kushans as one of the important ruling dynasties?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Who was the famous Greek ambassador who visited the Kushan court and wrote about his experiences in his works?",
    correct_answer: "Megasthenes",
    incorrect_answers: ["Herodotus", "Strabo", "Pliny the Elder"],
  },
  {
    question:
      "Who was the contemporary Chinese traveler who visited India during the Kushan period and wrote about his experiences in his travelogue?",
    correct_answer: "Faxian",
    incorrect_answers: ["Xuanzang", "I-tsing", "Song Yun"],
  },
  {
    question:
      "Which Kushan ruler is known for issuing gold coins featuring images of Hindu deities and Greek gods?",
    correct_answer: "Huvishka",
    incorrect_answers: ["Kujula Kadphises", "Kanishka", "Vima Kadphises"],
  },
  {
    question:
      "Under which Kushan ruler did the empire witness the establishment of Mathura as a major center of art and culture?",
    correct_answer: "Kanishka",
    incorrect_answers: ["Kujula Kadphises", "Huvishka", "Vima Kadphises"],
  },
  {
    question:
      "Which Kushan ruler is known for his extensive conquests in Central Asia and for establishing diplomatic ties with the Han Dynasty of China?",
    correct_answer: "Vima Kadphises",
    incorrect_answers: ["Kujula Kadphises", "Kanishka", "Huvishka"],
  },
  {
    question:
      "Under which Kushan ruler did the empire witness a decline due to internal rebellions and external invasions?",
    correct_answer: "Vasudeva II",
    incorrect_answers: ["Kujula Kadphises", "Kanishka", "Huvishka"],
  },
  {
    question:
      "Who was the contemporary Roman emperor during the reign of Kanishka?",
    correct_answer: "Trajan",
    incorrect_answers: ["Augustus", "Nero", "Hadrian"],
  },
];
const Gupta = [
  {
    question: "Who was the founder of the Gupta Dynasty?",
    correct_answer: "Sri Gupta",
    incorrect_answers: ["Chandragupta I", "Ghatotkacha", "Samudragupta"],
  },
  {
    question: "During which century did the Gupta Dynasty rule in India?",
    correct_answer: "4th to 6th centuries CE",
    incorrect_answers: [
      "3rd to 5th centuries CE",
      "5th to 7th centuries CE",
      "2nd to 4th centuries CE",
    ],
  },
  {
    question: "What was the capital city of the Gupta Dynasty?",
    correct_answer: "Pataliputra",
    incorrect_answers: ["Magadha", "Ujjain", "Ayodhya"],
  },
  {
    question:
      "Under which ruler did the Gupta Dynasty witness a golden age in India, marked by significant advancements in art, science, and literature?",
    correct_answer: "Chandragupta II",
    incorrect_answers: ["Samudragupta", "Chandragupta I", "Kumaragupta I"],
  },
  {
    question:
      "Who was the Gupta ruler known for his extensive military conquests and the establishment of an extensive empire in India?",
    correct_answer: "Samudragupta",
    incorrect_answers: ["Chandragupta II", "Chandragupta I", "Kumaragupta I"],
  },
  {
    question: "What was the primary religion patronized by the Gupta rulers?",
    correct_answer: "Hinduism",
    incorrect_answers: ["Buddhism", "Jainism", "Zoroastrianism"],
  },
  {
    question:
      "Under which Gupta ruler did the empire witness a decline due to weak successors and external invasions?",
    correct_answer: "Skandagupta",
    incorrect_answers: ["Chandragupta II", "Samudragupta", "Kumaragupta I"],
  },
  {
    question: "Who was the last significant ruler of the Gupta Dynasty?",
    correct_answer: "Bhanugupta",
    incorrect_answers: ["Skandagupta", "Chandragupta II", "Kumaragupta II"],
  },
  {
    question:
      "Under which Gupta ruler did the famous Chinese traveler Faxian visit India?",
    correct_answer: "Chandragupta II",
    incorrect_answers: ["Samudragupta", "Chandragupta I", "Kumaragupta I"],
  },
  {
    question:
      "Who succeeded Chandragupta II as the ruler of the Gupta Dynasty?",
    correct_answer: "Kumaragupta I",
    incorrect_answers: ["Skandagupta", "Samudragupta", "Chandragupta II"],
  },
  {
    question:
      "Which contemporary dynasty posed a significant challenge to the Gupta Empire?",
    correct_answer: "Vakataka Dynasty",
    incorrect_answers: ["Maurya Dynasty", "Kushan Empire", "Pallava Dynasty"],
  },
  {
    question:
      "Under which Gupta ruler did the empire face invasions from the Huns under their leader Toramana?",
    correct_answer: "Skandagupta",
    incorrect_answers: ["Chandragupta II", "Samudragupta", "Kumaragupta I"],
  },
  {
    question:
      "Which ancient Indian text mentions the Gupta Dynasty as one of the important ruling dynasties?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Who was the court poet of the Gupta ruler Samudragupta, known for his literary work 'Kavyamimamsa'?",
    correct_answer: "Kalidasa",
    incorrect_answers: ["Bharavi", "Dandin", "Banabhatta"],
  },
  {
    question:
      "Who was the contemporary Chinese traveler who visited the Gupta court and wrote about his experiences in his travelogue?",
    correct_answer: "Faxian",
    incorrect_answers: ["Xuanzang", "I-tsing", "Song Yun"],
  },
  {
    question:
      "Which Gupta ruler is known for his extensive inscriptional evidence, including the 'Allahabad Pillar Inscription'?",
    correct_answer: "Samudragupta",
    incorrect_answers: ["Chandragupta II", "Chandragupta I", "Kumaragupta I"],
  },
  {
    question:
      "Under which Gupta ruler did the famous Chinese traveler Xuanzang visit India?",
    correct_answer: "Kumaragupta I",
    incorrect_answers: ["Skandagupta", "Samudragupta", "Chandragupta II"],
  },
  {
    question:
      "Which famous literary work is associated with the Gupta Dynasty?",
    correct_answer: "Meghaduta",
    incorrect_answers: ["Arthashastra", "Kamasutra", "Mrichchhakatika"],
  },
  {
    question:
      "Who was the contemporary ruler of the Vakataka Dynasty during the reign of Chandragupta II?",
    correct_answer: "Prithvisena II",
    incorrect_answers: ["Narendrasena II", "Rudrasena III", "Pravarasena III"],
  },
  {
    question:
      "Under which Gupta ruler did the empire witness the rise of the Huna invasions in northwest India?",
    correct_answer: "Skandagupta",
    incorrect_answers: ["Chandragupta II", "Samudragupta", "Kumaragupta I"],
  },
];
const Vakataka = [
  {
    question: "Who was the founder of the Vakataka Dynasty?",
    correct_answer: "Vindhyashakti",
    incorrect_answers: ["Pravarasena I", "Rudrasena I", "Narendrasena"],
  },
  {
    question:
      "In which region of ancient India did the Vakataka Dynasty primarily rule?",
    correct_answer: "Central India",
    incorrect_answers: ["Northern India", "Southern India", "Western India"],
  },
  {
    question: "What was the capital city of the Vakataka Dynasty?",
    correct_answer: "Vatsagulma (modern-day Washim)",
    incorrect_answers: ["Pataliputra", "Ujjain", "Vidisha"],
  },
  {
    question:
      "Under which ruler did the Vakataka Dynasty reach its zenith in terms of territorial expansion and cultural achievements?",
    correct_answer: "Pravarasena I",
    incorrect_answers: ["Rudrasena I", "Narendrasena", "Rudrasena II"],
  },
  {
    question:
      "Who was the Vakataka ruler known for his patronage of Buddhism and the construction of the Ajanta Caves?",
    correct_answer: "Harishena",
    incorrect_answers: ["Pravarasena II", "Rudrasena II", "Narendrasena"],
  },
  {
    question: "What was the primary religion practiced by the Vakataka rulers?",
    correct_answer: "Hinduism",
    incorrect_answers: ["Buddhism", "Jainism", "Zoroastrianism"],
  },
  {
    question:
      "Under which ruler did the Vakataka Dynasty face significant challenges from the Gupta Empire and other regional powers?",
    correct_answer: "Narendrasena",
    incorrect_answers: ["Pravarasena II", "Rudrasena II", "Harishena"],
  },
  {
    question: "Who was the last significant ruler of the Vakataka Dynasty?",
    correct_answer: "Prithvisena II",
    incorrect_answers: ["Damodarasena", "Narendrasena II", "Rudrasena III"],
  },
  {
    question:
      "Under which ruler did the Vakataka Dynasty witness extensive cultural developments, including the construction of Buddhist cave temples at Ajanta?",
    correct_answer: "Harishena",
    incorrect_answers: ["Pravarasena II", "Rudrasena II", "Narendrasena"],
  },
  {
    question:
      "Who succeeded Pravarasena I as the ruler of the Vakataka Dynasty?",
    correct_answer: "Rudrasena I",
    incorrect_answers: ["Pravarasena II", "Narendrasena", "Rudrasena II"],
  },
  {
    question:
      "Which contemporary dynasty posed a significant challenge to the authority of the Vakataka Dynasty?",
    correct_answer: "Gupta Empire",
    incorrect_answers: ["Kushan Empire", "Pallava Dynasty", "Chalukya Dynasty"],
  },
  {
    question:
      "Under which ruler did the Vakataka Dynasty face invasions from the Huns, leading to its decline?",
    correct_answer: "Narendrasena II",
    incorrect_answers: ["Prithvisena II", "Rudrasena III", "Pravarasena III"],
  },
  {
    question:
      "Which famous literary work is associated with the Vakataka Dynasty?",
    correct_answer: "Mrichchhakatika",
    incorrect_answers: ["Arthashastra", "Kamasutra", "Meghaduta"],
  },
  {
    question:
      "Who was the contemporary ruler of the Gupta Empire during the reign of Pravarasena II?",
    correct_answer: "Kumaragupta I",
    incorrect_answers: ["Chandragupta II", "Skandagupta", "Kumaragupta II"],
  },
  {
    question:
      "Which ancient Indian text mentions the Vakatakas as one of the important ruling dynasties?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Who was the court poet of the Vakataka ruler Pravarasena II, known for his literary work 'Pravarasenacarita'?",
    correct_answer: "Bharavi",
    incorrect_answers: ["Kalidasa", "Dandin", "Banabhatta"],
  },
  {
    question:
      "Who was the contemporary king of the Pallava Dynasty who engaged in conflicts with the Vakataka Dynasty?",
    correct_answer: "Simhavishnu",
    incorrect_answers: [
      "Mahendravarman I",
      "Narasimhavarman I",
      "Narasimhavarman II",
    ],
  },
  {
    question:
      "Which famous Vakataka ruler was known for his military campaigns against the Western Satraps and the Gupta Empire?",
    correct_answer: "Narendrasena",
    incorrect_answers: ["Pravarasena II", "Rudrasena II", "Harishena"],
  },
  {
    question:
      "Under which ruler did the Vakataka Dynasty face the invasion of the Huns under their leader Toramana?",
    correct_answer: "Prithvisena II",
    incorrect_answers: ["Narendrasena II", "Rudrasena III", "Pravarasena III"],
  },
  {
    question:
      "Who was the contemporary Chinese traveler who visited the Vakataka court and wrote about his experiences in his travelogue?",
    correct_answer: "Faxian",
    incorrect_answers: ["Xuanzang", "I-tsing", "Song Yun"],
  },
];
const Harsha = [
  {
    question: "Who was the founder of the Harsha Dynasty?",
    correct_answer: "Harshavardhana",
    incorrect_answers: ["Prabhakarvardhana", "Rajyavardhana", "Kumaragupta I"],
  },
  {
    question: "During which century did the Harsha Dynasty rule in India?",
    correct_answer: "7th century CE",
    incorrect_answers: ["6th century CE", "8th century CE", "5th century CE"],
  },
  {
    question: "What was the capital city of the Harsha Dynasty?",
    correct_answer: "Kannauj",
    incorrect_answers: ["Magadha", "Pataliputra", "Ayodhya"],
  },
  {
    question:
      "Under which ruler did the Harsha Dynasty reach its peak of power and influence?",
    correct_answer: "Harshavardhana",
    incorrect_answers: ["Prabhakarvardhana", "Rajyavardhana", "Kumaragupta I"],
  },
  {
    question:
      "Which Chinese traveler visited India during the reign of Harshavardhana and wrote extensively about the social and political conditions?",
    correct_answer: "Xuanzang",
    incorrect_answers: ["Faxian", "I-tsing", "Song Yun"],
  },
  {
    question: "What was the primary religion patronized by the Harsha Dynasty?",
    correct_answer: "Hinduism",
    incorrect_answers: ["Buddhism", "Jainism", "Islam"],
  },
  {
    question:
      "Under which ruler did the Harsha Dynasty experience a decline due to defeat in battles against the Chalukyas and the rise of regional powers?",
    correct_answer: "Harshavardhana",
    incorrect_answers: ["Prabhakarvardhana", "Rajyavardhana", "Kumaragupta I"],
  },
  {
    question:
      "What was the title adopted by Harshavardhana, meaning 'ruler of the earth'?",
    correct_answer: "Maharajadhiraja",
    incorrect_answers: ["Maharaja", "Samrat", "Chakravartin"],
  },
  {
    question:
      "Under which ruler did the Harsha Dynasty witness extensive cultural and literary activities, including the establishment of the famous Nalanda University?",
    correct_answer: "Harshavardhana",
    incorrect_answers: ["Prabhakarvardhana", "Rajyavardhana", "Kumaragupta I"],
  },
  {
    question:
      "Who was the court poet and minister of Harshavardhana, known for his literary work 'Kadambari'?",
    correct_answer: "Banabhatta",
    incorrect_answers: ["Kalidasa", "Bharavi", "Dandin"],
  },
  {
    question:
      "Which contemporary South Indian dynasty challenged the authority of the Harsha Dynasty and eventually led to its decline?",
    correct_answer: "Chalukyas",
    incorrect_answers: ["Pallavas", "Cholas", "Pandyas"],
  },
  {
    question:
      "Who succeeded Harshavardhana as the ruler of the Harsha Dynasty?",
    correct_answer: "Rajyavardhana",
    incorrect_answers: ["Prabhakarvardhana", "Kumaragupta I", "Adityavardhana"],
  },
  {
    question:
      "Which famous literary work was composed by the Chinese traveler Xuanzang during his visit to India?",
    correct_answer: "Great Tang Records on the Western Regions",
    incorrect_answers: [
      "Journey to the West",
      "The Travels of Marco Polo",
      "The Divine Comedy",
    ],
  },
  {
    question:
      "Which famous Indian philosopher and logician was associated with the court of Harshavardhana?",
    correct_answer: "Kumarila Bhatta",
    incorrect_answers: ["Adi Shankaracharya", "Vasubandhu", "Dignaga"],
  },
  {
    question:
      "Who was the contemporary king of the Deccan region who defeated Harshavardhana in a battle, leading to the decline of the Harsha Dynasty?",
    correct_answer: "Pulakeshin II",
    incorrect_answers: ["Vikramaditya II", "Krishna I", "Mangalesha"],
  },
  {
    question:
      "What was the title adopted by Prabhakarvardhana, father of Harshavardhana?",
    correct_answer: "Maharajadhiraja",
    incorrect_answers: ["Maharaja", "Samrat", "Chakravartin"],
  },
  {
    question: "Which famous Indian epic poem was patronized by Harshavardhana?",
    correct_answer: "Harshacharita",
    incorrect_answers: ["Ramayana", "Mahabharata", "Bhagavad Gita"],
  },
  {
    question: "Who was the Chinese emperor during the reign of Harshavardhana?",
    correct_answer: "Emperor Taizong of Tang",
    incorrect_answers: [
      "Emperor Wu of Han",
      "Emperor Shun of Tang",
      "Emperor Gaozu of Tang",
    ],
  },
  {
    question:
      "Which ancient Indian text mentions Harshavardhana as one of the important rulers?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Which famous Chinese traveler visited the court of Harshavardhana and left detailed accounts of his observations in his travelogue?",
    correct_answer: "Xuanzang",
    incorrect_answers: ["Faxian", "I-tsing", "Song Yun"],
  },
];
const Chola = [
  {
    question: "Who was the founder of the Chola Dynasty?",
    correct_answer: "Vijayalaya Chola",
    incorrect_answers: [
      "Rajaraja Chola I",
      "Rajendra Chola I",
      "Kulottunga Chola I",
    ],
  },
  {
    question:
      "In which region of ancient India did the Chola Dynasty primarily rule?",
    correct_answer: "Southern India",
    incorrect_answers: ["Northern India", "Deccan Plateau", "Eastern India"],
  },
  {
    question: "What was the capital city of the Chola Dynasty?",
    correct_answer: "Tanjavur",
    incorrect_answers: ["Madurai", "Kanchipuram", "Tiruchirappalli"],
  },
  {
    question:
      "Under which Chola ruler did the dynasty reach its zenith in terms of political power and territorial expansion?",
    correct_answer: "Rajaraja Chola I",
    incorrect_answers: [
      "Rajendra Chola I",
      "Kulottunga Chola I",
      "Rajadhiraja Chola",
    ],
  },
  {
    question:
      "Who was the Chola ruler known for his naval expeditions and conquests up to Southeast Asia?",
    correct_answer: "Rajendra Chola I",
    incorrect_answers: [
      "Rajaraja Chola I",
      "Kulottunga Chola I",
      "Rajadhiraja Chola",
    ],
  },
  {
    question: "What was the primary religion practiced by the Chola rulers?",
    correct_answer: "Hinduism",
    incorrect_answers: ["Buddhism", "Jainism", "Zoroastrianism"],
  },
  {
    question:
      "Which Chola ruler constructed the famous Brihadeeswarar Temple in Thanjavur?",
    correct_answer: "Rajaraja Chola I",
    incorrect_answers: [
      "Rajendra Chola I",
      "Kulottunga Chola I",
      "Rajadhiraja Chola",
    ],
  },
  {
    question: "What was the primary source of income for the Chola Dynasty?",
    correct_answer: "Trade and commerce",
    incorrect_answers: [
      "Taxation on agricultural produce",
      "Tribute from vassal states",
      "Mining and minting of coins",
    ],
  },
  {
    question:
      "Who succeeded Rajaraja Chola I as the ruler of the Chola Dynasty?",
    correct_answer: "Rajendra Chola I",
    incorrect_answers: [
      "Kulottunga Chola I",
      "Rajadhiraja Chola",
      "Rajaraja Chola II",
    ],
  },
  {
    question:
      "Under which Chola ruler was the Chola Empire extended to the Maldives, Sri Lanka, and parts of Southeast Asia?",
    correct_answer: "Rajendra Chola I",
    incorrect_answers: [
      "Rajaraja Chola I",
      "Kulottunga Chola I",
      "Rajadhiraja Chola",
    ],
  },
  {
    question:
      "Who was the Chola ruler known for his patronage of literature and the compilation of the Tamil work 'Chola Ula'?",
    correct_answer: "Rajadhiraja Chola",
    incorrect_answers: [
      "Rajaraja Chola I",
      "Rajendra Chola I",
      "Kulottunga Chola I",
    ],
  },
  {
    question:
      "Which ancient Indian text mentions the Cholas as one of the ruling dynasties?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question: "Who was the last significant ruler of the Chola Dynasty?",
    correct_answer: "Kulottunga Chola III",
    incorrect_answers: [
      "Rajaraja Chola II",
      "Rajendra Chola II",
      "Rajadhiraja Chola II",
    ],
  },
  {
    question:
      "Under which Chola ruler did the famous Chinese traveler Wang Dayuan visit India?",
    correct_answer: "Kulottunga Chola I",
    incorrect_answers: [
      "Rajaraja Chola I",
      "Rajendra Chola I",
      "Rajadhiraja Chola",
    ],
  },
  {
    question:
      "Which Chola ruler is known for his contributions to the development of Tamil literature and the revival of Shaivism?",
    correct_answer: "Rajaraja Chola I",
    incorrect_answers: [
      "Rajendra Chola I",
      "Kulottunga Chola I",
      "Rajadhiraja Chola",
    ],
  },
  {
    question:
      "Who was the court poet of Rajaraja Chola I, known for his Tamil literary work 'Kalingattuparani'?",
    correct_answer: "Ottakoothar",
    incorrect_answers: ["Kambar", "Poykaiyar", "Thiruvalluvar"],
  },
  {
    question:
      "Which Chola ruler is associated with the construction of the Airavatesvara Temple in Darasuram?",
    correct_answer: "Rajaraja Chola II",
    incorrect_answers: [
      "Kulottunga Chola II",
      "Rajendra Chola II",
      "Rajadhiraja Chola II",
    ],
  },
  {
    question:
      "Who was the Chola ruler known for his military campaigns against the Western Chalukyas and the Hoysalas?",
    correct_answer: "Rajaraja Chola II",
    incorrect_answers: [
      "Kulottunga Chola II",
      "Rajendra Chola II",
      "Rajadhiraja Chola II",
    ],
  },
  {
    question:
      "Under which Chola ruler was the Chola Empire weakened due to internal conflicts and external invasions?",
    correct_answer: "Rajadhiraja Chola II",
    incorrect_answers: [
      "Rajaraja Chola II",
      "Kulottunga Chola II",
      "Rajendra Chola II",
    ],
  },
  {
    question:
      "Who was the last ruler of the Chola Dynasty before its decline and eventual absorption into the emerging Pandya and Hoysala kingdoms?",
    correct_answer: "Rajendra Chola III",
    incorrect_answers: [
      "Kulottunga Chola III",
      "Rajadhiraja Chola II",
      "Rajaraja Chola II",
    ],
  },
];
const Mughal = [
  {
    question: "Who was the founder of the Mughal Dynasty in India?",
    correct_answer: "Babur",
    incorrect_answers: ["Akbar", "Shah Jahan", "Aurangzeb"],
  },
  {
    question:
      "Under which Mughal emperor did the empire reach its zenith in terms of territorial expansion and cultural achievements?",
    correct_answer: "Akbar",
    incorrect_answers: ["Babur", "Shah Jahan", "Aurangzeb"],
  },
  {
    question:
      "Who was the Mughal emperor known for constructing the Taj Mahal?",
    correct_answer: "Shah Jahan",
    incorrect_answers: ["Babur", "Akbar", "Aurangzeb"],
  },
  {
    question:
      "Which Mughal emperor is known for his strict enforcement of Islamic law and austere lifestyle?",
    correct_answer: "Aurangzeb",
    incorrect_answers: ["Babur", "Akbar", "Shah Jahan"],
  },
  {
    question: "Who was the last significant Mughal emperor?",
    correct_answer: "Bahadur Shah II",
    incorrect_answers: ["Aurangzeb", "Shah Alam II", "Jahangir"],
  },
  {
    question: "What was the primary religion practiced by the Mughal emperors?",
    correct_answer: "Islam",
    incorrect_answers: ["Hinduism", "Buddhism", "Christianity"],
  },
  {
    question:
      "Who was the Mughal emperor known as 'Alamgir,' meaning 'Conqueror of the World'?",
    correct_answer: "Aurangzeb",
    incorrect_answers: ["Akbar", "Shah Jahan", "Babur"],
  },
  {
    question:
      "Which Mughal emperor is known for his policy of religious tolerance and the establishment of Din-i Ilahi?",
    correct_answer: "Akbar",
    incorrect_answers: ["Babur", "Shah Jahan", "Aurangzeb"],
  },
  {
    question:
      "What was the capital city of the Mughal Empire during the reign of Akbar?",
    correct_answer: "Fatehpur Sikri",
    incorrect_answers: ["Delhi", "Agra", "Lahore"],
  },
  {
    question: "Who succeeded Aurangzeb as the Mughal emperor?",
    correct_answer: "Bahadur Shah I",
    incorrect_answers: ["Shah Alam II", "Jahandar Shah", "Farrukhsiyar"],
  },
  {
    question:
      "Which Mughal emperor faced significant challenges from the Marathas and other regional powers?",
    correct_answer: "Aurangzeb",
    incorrect_answers: ["Akbar", "Shah Jahan", "Babur"],
  },
  {
    question:
      "Under which Mughal emperor did the empire face the rebellion of his sons, leading to the War of Succession?",
    correct_answer: "Shah Jahan",
    incorrect_answers: ["Babur", "Akbar", "Aurangzeb"],
  },
  {
    question: "What was the primary source of income for the Mughal Empire?",
    correct_answer: "Taxation on agricultural produce",
    incorrect_answers: [
      "Trade and commerce",
      "Tribute from vassal states",
      "Mining and minting of coins",
    ],
  },
  {
    question:
      "Who was the Mughal emperor known for his patronage of arts and architecture, including the construction of the Red Fort in Delhi?",
    correct_answer: "Shah Jahan",
    incorrect_answers: ["Babur", "Akbar", "Aurangzeb"],
  },
  {
    question:
      "Which Mughal emperor is associated with the construction of the Badshahi Mosque in Lahore?",
    correct_answer: "Aurangzeb",
    incorrect_answers: ["Babur", "Akbar", "Shah Jahan"],
  },
  {
    question:
      "Who was the Mughal emperor known for his love for music, art, and poetry, earning him the title 'Shaikhu Khurram'?",
    correct_answer: "Shah Jahan",
    incorrect_answers: ["Babur", "Akbar", "Aurangzeb"],
  },
  {
    question:
      "Which ancient Indian text mentions the Mughals as one of the ruling dynasties?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Who was the Mughal emperor who shifted the capital from Agra to Delhi?",
    correct_answer: "Aurangzeb",
    incorrect_answers: ["Babur", "Akbar", "Shah Jahan"],
  },
  {
    question:
      "Which Mughal emperor faced the rebellion of his sons, leading to a war of succession known as the War of the Three Sultans?",
    correct_answer: "Shah Jahan",
    incorrect_answers: ["Babur", "Akbar", "Aurangzeb"],
  },
  {
    question:
      "Who was the court poet of Shah Jahan, known for his work 'Diwan-i-Khaas'?",
    correct_answer: "Abdul Hamid Lahori",
    incorrect_answers: ["Amir Khusrow", "Mir Taqi Mir", "Saiyid Ali Tabrizi"],
  },
];
const British = [
  {
    question:
      "When did the British East India Company gain its first territorial foothold in India?",
    correct_answer: "1600",
    incorrect_answers: ["1630", "1610", "1620"],
  },
  {
    question:
      "Which British governor-general is often credited with starting the process of British colonial expansion in India?",
    correct_answer: "Lord Wellesley",
    incorrect_answers: ["Lord Cornwallis", "Lord Dalhousie", "Lord Hastings"],
  },
  {
    question:
      "In which year was the British East India Company granted the Diwani of Bengal by the Mughal emperor?",
    correct_answer: "1765",
    incorrect_answers: ["1707", "1757", "1773"],
  },
  {
    question: "What was the significance of the Battle of Plassey in 1757?",
    correct_answer: "It established British control over Bengal.",
    incorrect_answers: [
      "It marked the end of French influence in India.",
      "It marked the beginning of the Sepoy Mutiny.",
      "It led to the dissolution of the Mughal Empire.",
    ],
  },
  {
    question:
      "Under whose leadership did the British East India Company win the Battle of Plassey?",
    correct_answer: "Robert Clive",
    incorrect_answers: ["Lord Dalhousie", "Warren Hastings", "Lord Wellesley"],
  },
  {
    question:
      "Who was the last Mughal emperor to rule before the British annexation of his territories?",
    correct_answer: "Bahadur Shah II",
    incorrect_answers: ["Bahadur Shah I", "Shah Alam II", "Muhammad Shah"],
  },
  {
    question:
      "What was the immediate cause of the First War of Indian Independence, also known as the Sepoy Mutiny?",
    correct_answer: "Use of greased cartridges",
    incorrect_answers: [
      "Introduction of new religious practices",
      "Imposition of higher taxes",
      "Expulsion of Indian princes",
    ],
  },
  {
    question:
      "Who was the British Governor-General of India during the Sepoy Mutiny?",
    correct_answer: "Lord Canning",
    incorrect_answers: ["Lord Cornwallis", "Lord Dalhousie", "Lord Wellesley"],
  },
  {
    question:
      "Which act passed by the British Parliament in 1858 transferred the powers of the East India Company to the British Crown?",
    correct_answer: "Government of India Act (1858)",
    incorrect_answers: [
      "Government of India Act",
      "Pitt's India Act",
      "Regulating Act",
    ],
  },
  {
    question: "Who was the first Viceroy of India under British rule?",
    correct_answer: "Lord Canning",
    incorrect_answers: ["Lord Curzon", "Lord Ripon", "Lord Mountbatten"],
  },
  {
    question: "When did Queen Victoria proclaim herself Empress of India?",
    correct_answer: "1876",
    incorrect_answers: ["1848", "1858", "1901"],
  },
  {
    question:
      "Which British viceroy is known for introducing the Vernacular Press Act and the Ilbert Bill controversy?",
    correct_answer: "Lord Curzon",
    incorrect_answers: ["Lord Dalhousie", "Lord Ripon", "Lord Lytton"],
  },
  {
    question: "What was the significance of the Ilbert Bill controversy?",
    correct_answer: "It proposed equal treatment of Indian and British judges.",
    incorrect_answers: [
      "It proposed granting voting rights to Indians.",
      "It aimed to abolish the caste system.",
      "It sought to establish Indian representation in the British Parliament.",
    ],
  },
  {
    question:
      "Who was the British viceroy during the partition of Bengal in 1905?",
    correct_answer: "Lord Curzon",
    incorrect_answers: ["Lord Minto", "Lord Harding", "Lord Chelmsford"],
  },
  {
    question:
      "Which Indian leader was known for his opposition to the partition of Bengal and led the Swadeshi Movement?",
    correct_answer: "Bal Gangadhar Tilak",
    incorrect_answers: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Subhas Chandra Bose",
    ],
  },
  {
    question:
      "Which British viceroy is associated with the Montagu-Chelmsford Reforms, also known as the Government of India Act (1919)?",
    correct_answer: "Lord Chelmsford",
    incorrect_answers: ["Lord Minto", "Lord Reading", "Lord Irwin"],
  },
  {
    question:
      "When did the British announce the decision to withdraw from India?",
    correct_answer: "1947",
    incorrect_answers: ["1935", "1942", "1950"],
  },
  {
    question: "Who was the last Viceroy of India?",
    correct_answer: "Lord Mountbatten",
    incorrect_answers: ["Lord Wavell", "Lord Linlithgow", "Lord Irwin"],
  },
  {
    question:
      "Which Indian leader negotiated with the British for Indian independence and became the first Prime Minister of independent India?",
    correct_answer: "Jawaharlal Nehru",
    incorrect_answers: [
      "Mahatma Gandhi",
      "Subhas Chandra Bose",
      "Sardar Vallabhbhai Patel",
    ],
  },
  {
    question:
      "When did India officially become a republic and cease to be a dominion within the British Commonwealth?",
    correct_answer: "1950",
    incorrect_answers: ["1947", "1949", "1952"],
  },
];
const Kakatiya = [
  {
    question: "Who was the founder of the Kakatiya Dynasty?",
    correct_answer: "Ganapati Deva",
    incorrect_answers: ["Rudrama Devi", "Prataparudra", "Bhadrachalam Ramadas"],
  },
  {
    question: "During which century did the Kakatiya Dynasty rule in India?",
    correct_answer: "12th to 14th centuries CE",
    incorrect_answers: [
      "11th to 13th centuries CE",
      "13th to 15th centuries CE",
      "10th to 12th centuries CE",
    ],
  },
  {
    question: "What was the capital city of the Kakatiya Dynasty?",
    correct_answer: "Warangal",
    incorrect_answers: ["Vijayanagara", "Hampi", "Golconda"],
  },
  {
    question:
      "Under which ruler did the Kakatiya Dynasty reach its peak of power and territorial expansion?",
    correct_answer: "Prataparudra II",
    incorrect_answers: ["Ganapati Deva", "Rudrama Devi", "Beta II"],
  },
  {
    question:
      "Who was the Kakatiya ruler known for her exceptional leadership and administrative skills?",
    correct_answer: "Rudrama Devi",
    incorrect_answers: ["Ganapati Deva", "Prataparudra II", "Beta II"],
  },
  {
    question:
      "What was the primary religion patronized by the Kakatiya rulers?",
    correct_answer: "Hinduism",
    incorrect_answers: ["Buddhism", "Jainism", "Islam"],
  },
  {
    question:
      "Under which ruler did the Kakatiya Dynasty face invasions from the Delhi Sultanate under the command of Alauddin Khalji?",
    correct_answer: "Prataparudra II",
    incorrect_answers: ["Ganapati Deva", "Rudrama Devi", "Beta II"],
  },
  {
    question:
      "Who succeeded Ganapati Deva as the ruler of the Kakatiya Dynasty?",
    correct_answer: "Rudrama Devi",
    incorrect_answers: ["Prataparudra II", "Beta II", "Mahadeva"],
  },
  {
    question:
      "Under which ruler did the Kakatiya Dynasty witness extensive architectural and cultural developments, including the construction of the Warangal Fort?",
    correct_answer: "Rudrama Devi",
    incorrect_answers: ["Ganapati Deva", "Prataparudra II", "Beta II"],
  },
  {
    question:
      "Who was the last significant ruler of the Kakatiya Dynasty before its downfall to the Delhi Sultanate?",
    correct_answer: "Prataparudra II",
    incorrect_answers: ["Ganapati Deva", "Rudrama Devi", "Beta II"],
  },
  {
    question:
      "Which contemporary dynasty posed a significant challenge to the authority of the Kakatiya Dynasty?",
    correct_answer: "Delhi Sultanate",
    incorrect_answers: [
      "Vijayanagara Empire",
      "Chola Dynasty",
      "Pallava Dynasty",
    ],
  },
  {
    question:
      "Under which ruler did the Kakatiya Dynasty witness the decline and fragmentation of its empire due to internal rebellions and external invasions?",
    correct_answer: "Prataparudra II",
    incorrect_answers: ["Ganapati Deva", "Rudrama Devi", "Beta II"],
  },
  {
    question:
      "Which famous literary work is associated with the Kakatiya Dynasty?",
    correct_answer: "Kakatiya Charitamu",
    incorrect_answers: ["Ramayana", "Mahabharata", "Bhagavad Gita"],
  },
  {
    question:
      "Who was the court poet of the Kakatiya ruler Prataparudra II, known for his literary work 'Mankutimmana Kagga'?",
    correct_answer: "D.V. Gundappa",
    incorrect_answers: ["Pampa", "Kumaravyasa", "Raghavanka"],
  },
  {
    question:
      "Who was the contemporary ruler of the Delhi Sultanate who invaded the Kakatiya Kingdom and captured Warangal?",
    correct_answer: "Alauddin Khalji",
    incorrect_answers: [
      "Muhammad bin Tughluq",
      "Qutb-ud-din Aibak",
      "Firoz Shah Tughlaq",
    ],
  },
  {
    question:
      "Which ancient Indian text mentions the Kakatiyas as one of the important ruling dynasties?",
    correct_answer: "Puranas",
    incorrect_answers: ["Arthashastra", "Ramayana", "Mahabharata"],
  },
  {
    question:
      "Who was the contemporary Chinese traveler who visited the Kakatiya court and wrote about his experiences in his travelogue?",
    correct_answer: "Wang Dayuan",
    incorrect_answers: ["Xuanzang", "Faxian", "I-tsing"],
  },
  {
    question:
      "Who was the famous musician and poet associated with the Kakatiya court, known for his literary work 'Nandi Kesari'?",
    correct_answer: "Nannaya Bhattaraka",
    incorrect_answers: ["Tikkana", "Srinatha", "Peddana"],
  },
  {
    question:
      "Under which ruler did the Kakatiya Dynasty witness the establishment of the Kakatiya Empire as a major power in South India?",
    correct_answer: "Ganapati Deva",
    incorrect_answers: ["Rudrama Devi", "Prataparudra II", "Beta II"],
  },
  {
    question:
      "Who was the contemporary king of the Hoysala Dynasty who engaged in conflicts with the Kakatiya Dynasty?",
    correct_answer: "Ballala III",
    incorrect_answers: ["Vishnuvardhana", "Narasimha I", "Vira Narasimha II"],
  },
];

// Function to get questions by selected category and number of questions
const getQuestionsByCategory = (category, numQuestions) => {
  // Updated
  switch (category) {
    case "9":
      return getRandomQuestions(Maurya, numQuestions); // Updated
    case "10":
      return getRandomQuestions(Magadha, numQuestions);
    case "11":
      return getRandomQuestions(Shunga, numQuestions);
    case "12":
      return getRandomQuestions(Satavahana, numQuestions);
    case "14":
      return getRandomQuestions(Kushan, numQuestions);
    case "15":
      return getRandomQuestions(Gupta, numQuestions);
    case "16":
      return getRandomQuestions(Vakataka, numQuestions);
    case "17":
      return getRandomQuestions(Harsha, numQuestions);
    case "18":
      return getRandomQuestions(Chola, numQuestions);
    case "19":
      return getRandomQuestions(Mughal, numQuestions);
    case "20":
      return getRandomQuestions(British, numQuestions);
    case "21":
      return getRandomQuestions(Kakatiya, numQuestions);
    case "22":
      return getRandomQuestions(Chola, numQuestions); // Updated
    // Add cases for other categories
    default:
      return [];
  }
};

// Function to get random questions from a category
const getRandomQuestions = (questionsArray, numQuestions) => {
  // Updated
  const randomIndices = getRandomIndices(questionsArray.length, numQuestions); // Updated
  return randomIndices.map((index) => questionsArray[index]);
};

// Function to generate random indices
const getRandomIndices = (length, numQuestions) => {
  // Updated
  const indices = [];
  while (indices.length < Math.min(numQuestions, length)) {
    const randomIndex = Math.floor(Math.random() * length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
};
