import { Link } from "components/documentation";

const QAS = [
  {
    question:
      "Q1. What is a resume builder? Why resume builder is better than resume template doc?",
    answer: (
      <>
        <p>
          There are two ways to create a resume today. One option is to use a
          resume template, such as an office/google doc, and customize it
          according to your needs. The other option is to use a resume builder,
          an online tool that allows you to input your information and
          automatically generates a resume for you.
        </p>
        <p>
          Using a resume template requires manual formatting work, like copying
          and pasting text sections and adjusting spacing, which can be
          time-consuming and error-prone. It is easy to run into formatting
          issues, such as using different bullet points or font styles after
          copying and pasting. On the other hand, a resume builder like
          CareerCraft saves time and prevents formatting mistakes by
          automatically formatting the resume. It also offers the convenience of
          easily changing font types or sizes with a simple click. In summary, a
          resume builder is easier to use compared to a resume template.
        </p>
      </>
    ),
  },
  {
    question:
      "Q2. What uniquely sets CareerCraft apart from other resume builders and templates?",
    answer: (
      <>
        <p>
          Other than CareerCraft, there are some great free resume builders out
          there, e.g. <Link href="https://rxresu.me/">Reactive Resume</Link>,{" "}
          <Link href="https://flowcv.com/">FlowCV</Link>. However, CareerCraft
          stands out with 2 distinctive features:
        </p>{" "}
        <p>
          <span className="font-semibold">
            1. CareerCraft is designed specifically for the South African job market and
            best practices.
          </span>
          <br />
          Unlike other resume builders that target a global audience and offer
          many customization options, CareerCraft intentionally only offers
          options that are aligned with South African best practices. For example, it
          excludes the option to add a profile picture to avoid bias and
          discrimination. It offers only the core sections, e.g. profile, work
          experience, education, and skills, while omitting unnecessary sections
          like references. Additionally, CareerCraft only offers a top down
          single column resume design as opposed to two column design, because
          single column design works best for AST. <br />{" "}
        </p>
        <p>
          <span className="font-semibold">
            2. CareerCraft is super privacy focus.
          </span>{" "}
          <br />
          While other resume builders may require email sign up and store user
          data in their databases, CareerCraft believes that resume data should
          remain private and accessible only on user's local machine. Therefore,
          CareerCraft doesn't require sign up to use the app, and all inputted
          data is stored in user’s browser that only user has access to.
        </p>
      </>
    ),
  },
  {
    question: "Q3. Who created CareerCraft and why?",
    answer: (
      <p>
        CareerCraft was created to help job seekers in South Africa and beyond create
        professional resumes that stand out. As professionals who understand the
        challenges of creating effective CVs, we noticed many job seekers were
        making common mistakes that could cost them opportunities.
        This led us to create CareerCraft, where we integrated best practices and our
        knowledge into this resume builder. Our hope is that CareerCraft can help
        anyone to easily create a modern professional resume that follows best
        practices and enable anyone to apply for jobs with confidence.
      </p>
    ),
  },
  {
    question: "Q4. How can I support CareerCraft?",
    answer: (
      <>
        <p>
          The best way to support CareerCraft is to share your thoughts and
          feedback with us to help further improve it. You can send us an email
          at{" "}
          <Link href="mailto:dev@thabojafta.co.za">dev@thabojafta.co.za</Link>{" "}
          or{" "}
          <Link href="https://github.com/thaboxan/ZA-Resume/issues/new">
            open an issue
          </Link>{" "}
          at our Github repository. Whether you like it or not, we would love to
          hear from you.
        </p>
        <p>
          Another great way to support ZA-CV is by spreading the words.
          Share it with your friends, on social media platforms, or with your
          school's career center. Our goal is to reach more people who struggle
          with creating their resume, and your word-of-mouth support would be
          greatly appreciated. If you use Github, you can also show your support
          by{" "}
          <Link href="https://github.com/thaboxan/ZA-Resume">
            giving the project a star
          </Link>{" "}
          to help increase its popularity and reach.
        </p>
      </>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="mx-auto max-w-3xl divide-y divide-gray-300 lg:mt-4 lg:px-2">
      <h2 className="text-center text-3xl font-bold">Questions & Answers</h2>
      <div className="mt-6 divide-y divide-gray-300">
        {QAS.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <h3 className="font-semibold leading-7">{question}</h3>
            <div className="mt-3 grid gap-2 leading-7 text-gray-600">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
