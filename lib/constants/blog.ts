import dedent from "dedent";

export enum BlogPostTopic {
  Reflection = "Reflection",
  Industry = "Industry",
}

export type BlogPost = {
  id: number;
  title: string;
  datetime: string; // ISO time
  topic: BlogPostTopic;
  read_time: string;
  excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Dealing with Career Unknowns Post-Graduation",
    datetime: "2026-07-11T14:26:00+08:00",
    topic: BlogPostTopic.Reflection,
    read_time: "4 min read",
    excerpt: dedent`
      For the first 6 weeks after graduation, there were already a lot I had to think about - both in the positive sense and in the negative sense. 

      There was a lot I had achieved in my tenure at Don Bosco Technical College, such as taking leadership roles, participating in different seminars, being able to give my all in projects (especially my Capstone Project which spanned around a year), and achieving Service Award as a College Student Council member, a Magna Cum Laude award for 1.26 GPA, and being the Batch Valedictorian. I had basically a hand on a lot of things, pushing myself as much as I could. 

      Although deep down inside me I knew that achieving those credentials did not have as great of a value in the market or economy as much as I had perceived it to be. I knew that doing them was more of a personal thing than a prestige thing - to see how far I can exceed myself academically. My father reassured me that no matter the grade that I had achieved, he would still support me to the best of his ability, and my mother said the same (but was shedding tears during my speech, haha), so I had less pressure than expected. If anything, I had pressured myself because I wanted to answer the question of \"How far can I reach before I set foot on the stage of my last day as a student?\". 

      Yet that time is done, and I closed that chapter of my life 6 weeks ago - along with my batchmates who I crossed paths with. Now, it was more of trying to understand the speed of the market and what I needed to do not just in my 20s but for the rest of my life. 

      I had been sitting on my laptop yesterday finding YouTube videos to entertain myself and lighten up my spirits after spending a few hours building this very website you see today. A man on his mid-30s had been talking about how today's graduating generation deserved an apology for entering the job market in one of the worst times in history, and says that it is normal to feel lost in your 20s. \"Life is not a race\", he says, \"You compete in the idea of attaining career milestones and compare yourself to a batchmate that got his first job at 4 months post-graduation, when in reality, you reach your 30s and realize that it does not matter\". Of course, I paraphrase, but the definition is extremely close to the original quote.

      Don't get me wrong, I still can't help but to worry... but worrying got me nowhere. I'd much rather just stomach it and hope that the first career milestone of having a job will come eventually - just like how the graduation diploma eventually would arrive in due time. Having hope is a real pain because acceptance isn't the easiest thing to do, but it is a choice that every one can make in their day-to-day (at least in my case, I can attest to that). 

      Who knows how long would I be unemployed. 8 weeks? 12? 16? 3 months? Half a year? I don't know - that is outside of what I can predict. I may not predict the future, but I know that I can at least predict what I can do in my everyday: whether it would be submitting one more job application, answering to one more recruiter, and building one line at a time. Eventually, I will be taken by life to a place where I need to be the most. Usually, that just means being present - and that hasn't change over the past 6 weeks.
      `,
  },

  {
    id: 2,
    title:
      "Looking at \'What Works\' as Someone Who Looked at \'What's Hyped\'",
    datetime: "2026-07-11T14:43:00+08:00",
    topic: BlogPostTopic.Industry,
    read_time: "4 min read",
    excerpt: dedent`
      Vite for React.js was my very first framework that I can remember.

      I remember making React/TypeScript projects from scratch/barebones, and when I was making a new React project, I stumbled upon Node.js Package Manager or NPM and used it in order to scaffold a new Vite application. Here's the thing: I had no idea what I just did aside from typing a command (for retention) and seeing my repository being built from scratch. I didn't know what to feel, mainly because I didn't know what the hell just happened.

      I saw everything was already built: a dedicated folder for the components, the boilerplate and scaffolding in HTML already generated, and a package.json file containing all relevant libraries was already there. I only knew about 10 to 15% of it, and I did not appreciate back then how much of the work was already built for me. All I had to do was build.

      This was also a self-study, which was an important thing to note because I had no one to ask what the hell was going on outside from GPT 3.5 (which is questionable if you were to have him as a teacher, but he answered back. Eventually I learned to be more distrusting of LLMs.)

      Over the course of 4 years, I had learned more and more about the difference of building with frameworks and building without frameworks. The former is so much easier, my gosh. Being able to build without one provided flexibility and control, but building with a framework provided me with not only the scaffolding but also the additional ecosystem and user support.

      I garnered more and more frameworks that I used in my projects including Nextjs, Laravel, FastAPI, Flask, and more. That along with the guidance of my professors, I had been able to expand on the different pros and cons of these frameworks.

      Though admittedly, as I have realized lately, this was a double-edged sword: I got so caught up in the 4 years in knowing the latest technologies that a subconsciously slowly disregarded what works.

      It also hit home with the fact that a lot of the postings in the job boards also concern themselves with the fact that they don't find what's new, but also what has worked and what is tested by time.

      Like it's almost humbling: I had no idea there were still technologies by technical breadth has no awareness of, and they have existed for so long. I'd honestly like to pay respects to many of those technologies because not only did they serve their purpose but they also have spanned for years with some being decades... and I feel like a fool as much as I am fascinated by the history of these technologies.

      I have learned Java, but it was only post-graduation where I realized a lot of its value. Java and its open-source framework called Spring Boot have been the backbone of many financial technology (FinTech) companies such as banks and digital financial services applications like G-Cash (again, from what I can recall). Angular (and Angular 2 or AngularJS) have spanned over two decades of building, maintenance, and support... not to mention Ruby on Rails (which I have heard already before from other software engineers), jQuery, C# and its .NET enterprise stack which is proven time and time again, Nginx, etc.

      It is incredibly interesting at least for my end to be able to read and learn about these new technologies. A shame that I have not enough time to be able to learn all of them in a deeper manner, but at the very least, my respect goes out to the software engineers that use tools and technologies that work instead of just using what's new.

      As an up-and-coming software engineer (side note, I can't write that without thinking how I sound like LLMs now), I don't know what stacks I will have the face in the future... but at least for certain I want to learn the stack which has powered the industry before I entered.

      Maybe that would help me learn more on better decision-making skills that I can use in my career.
    `,
  },

  {
    id: 3,
    title: "Learning to Slow Down in the Age of Artificial Intelligence",
    datetime: "2026-07-11T16:22:00+08:00",
    topic: BlogPostTopic.Reflection,
    read_time: "5 min read",
    excerpt: dedent`
      I have plenty of shortcomings as a software engineer.

      One habit I've developed over the years is regularly reflecting on my work ethic, my technical ability, and the decisions I make while building software. That constant self-evaluation helps me stay grounded and gives me a clearer picture of where I need to improve. I use the term *software engineer* because it's intentionally broad—it reminds me that there will always be something new to learn, whether it's technical knowledge, communication, or the way I approach solving problems.

      Without diving too deeply into each one, I know where many of my weaknesses lie. I'm still at the beginning of my career, which naturally means I have less experience than engineers who have spent years in the industry. There is also plenty of room for me to deepen my understanding of the languages I use every day. For example, there are still Python or SQL keywords I occasionally forget despite having worked with both for years. Beyond the technical side, I also wish I had done a better job building relationships during my internship. I treated my teammates with respect and kindness, but looking back, I could have invested more effort into collaborating with them and getting to know them over those three months.

      Out of all these shortcomings, one stands out because it's relatively new yet increasingly common among students and fresh graduates in computing-related programs. That weakness is becoming overly dependent on artificial intelligence while learning how to build software.

      I fell into that trap myself.

      During my later years in college and throughout much of my self-study, I leaned on large language models far more than I should have. Over time, I realized that I wasn't actually becoming a better programmer—I was simply becoming better at writing prompts. Instead of thinking through problems myself, I often reached for AI first. It was fast, convenient, and usually good enough.

      Eventually, that started to bother me.

      I began deliberately changing how I learned. Instead of asking AI to generate entire solutions, I spent more time reading official documentation, watching technical talks and tutorials, and learning from discussions with experienced developers online. When I did use AI, I treated it more like a research assistant than an autopilot. I wanted to understand *why* code worked instead of simply copying *what* it produced. Ironically, stepping away from AI made me appreciate it even more because I finally understood where it added value and where it couldn't replace genuine understanding.

      I also started noticing the same pattern around me. I came across many posts from graduates who admitted they struggled to build projects without an LLM beside them. I experienced it firsthand during collaborations as well—AI-generated code would often be tested briefly before being merged, with little discussion about architecture, maintainability, or long-term design. That realization genuinely scared me. I didn't want to reach a point where the projects I built reflected ChatGPT's thinking more than my own.

      Over time, both I and many of the people around me learned from those mistakes. I slowed down. I became more intent-based. Today, I still use tools like Copilot and Claude, but my relationship with them is very different. I use them to explore unfamiliar concepts, verify my understanding, or accelerate repetitive tasks like scaffolding—not to replace the thinking that software engineering requires.

      This portfolio is a good example of that mindset. It certainly wasn't built without AI, and I have no reason to pretend otherwise. But I understand this codebase. I understand why it's structured the way it is, where its strengths are, and where its flaws still exist. In fact, if you compare the earlier parts of this project to newer features like this blog page, you'll probably notice how my architecture has gradually improved alongside my understanding.

      Someone could argue that if the code is imperfect anyway, I might as well let AI write everything.

      My response is simple: I'd rather own imperfect code that I genuinely understand than polished code I can't confidently explain. Writing software this way is slower, but the knowledge stays with me long after the feature is finished. Every mistake becomes my own lesson instead of someone else's solution.

      None of this is meant to criticize people who rely heavily on AI. These tools have become a normal part of modern software development, and I use them every day myself. I don't believe the answer is to reject AI completely, nor do I believe we should hand over every decision to it. The challenge is finding an equilibrium. For people like me, the temptation isn't that AI exists—it's how easy it is to let it think on our behalf.

      After all, writing code is only one part of software engineering. Long before a single line is typed, we still have to understand the problem, make trade-offs, design systems, communicate with others, and decide what we're actually trying to build. Those are skills no autocomplete can fully develop for us.

      I genuinely enjoy working with AI. I built a Retrieval-Augmented Generation project because I was fascinated by how these systems work, from document ingestion to retrieval and response generation. My appreciation for AI has only grown over time. If there's one lesson I'd want others to take from my experience, it's this: don't lose confidence in your own ability to think, create, and solve problems. Let AI strengthen your craftsmanship—not replace it.
      `,
  },
];
