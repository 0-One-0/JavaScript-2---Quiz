# Flowly Quiz App

**Flowly** is a digital youth-center social media app where you can compete with other users by doing quizzes. Score from quizzes saves to your profile and to leaderboard. You can also add people to your Rivals(Follow) and they can follow you back. When you want to take a break from quizzes, you can find other activities in Dashboard like Cat of the day!.

**GL & HF**

## Installation

1. git clone https://github.com/0-One-0/JavaScript-2---Quiz/
2. Install dependancy by writing `npm install i` in terminal
3. Create .env file and add the keys provided by us. Add the .env.example template in .env
4. `npm run dev` to host your localhost.
5. If you are using live share `npm run dev -- --host` and in live share press "Share server" and write in 5173.
6. Enjoy

## Navigate App

1. Create account using username, email and password
2. Login with your email and password
3. Now you are in frontpage. Check hamburger menu/navigation bar for more information on "How to play".
4. You can visit your profile by pressing your profile icon. There you see your followers scores and games played. You can also Search players and follow them to have them be put in your Rivals list. You can also press "Followers" to view who is following you. Leaderboard can be found in Dashboard with other API fun.

## Dependancies used

- React
- React-DOM
- React-Router-DOM
- Tslib
- Zustand
- Supabase
- GSAP
- Canvas Confetti

## API used

- Supabase
- Trivia API
- Attack on Titan API
- Cat API
- Harry Potter Spell API
- Joke of the day API
- Kanye Quote API
- Useless Fact API

## Project structure

<details>
<summary>Root files</summary>

```txt
.env.example
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
README.md
vite.config.js
```

</details>

<details>
<summary>src/</summary>

```txt
  App.jsx
  Layout.jsx
  main.jsx
```

</details>

<details>

<summary>src/assets/</summary>

```txt
  dashboard-logo.png
  harry-potter.png
  hero.png
  howto-logo.png
  kanye.png
  laughing-emoji.png
  light-bulb.png
  login-icon.png
  logo.png
  logo2.png
  prize-icon.png
  profile-man.png
  profile-woman.png
  Quiz-logo.png
  react.svg
  thinking.png
  vite.svg
```

</details>
<details>
<summary>src/assets/videos</summary>

```txt
    video1.mp4
    video2.mp4
    video3.mp4
    video4.mp4
```

</details>

<details>
<summary>src/components/</summary>

```txt
  Answers.jsx
  CategoryGridItem.jsx
  FollowersList.jsx
  Footer.jsx
  FrontHeader.jsx
  FrontPageDaily.jsx
  FrontQuizContainer.jsx
  Home.jsx
  HowToPlayCard.jsx
  Links.jsx
  NavBar.jsx
  ProtectedRoute.jsx
  quizcard.jsx
  quizCategories.jsx
  QuizDifficulty.jsx
  QuizResult.jsx
  quizSelect.jsx
  RandomQuizBtn.jsx
  RecentQuizzes.jsx
  RivalsList.jsx
  ScoreboardWidget.jsx
  SearchBar.jsx
  Timer.jsx
  Widget.jsx
  WrongPage.jsx
```

</details>

<details>
<summary>src/css/</summary>

```txt
  App.css
  dashboard.css
  edit-profile.css
  footer.css
  front-page.css
  howtoplay-card.css
  howtoplay.css
  index.css
  login.css
  navbar.css
  profile-page.css
  quiz-card.css
  quiz-result.css
  quiz.css
  quizFront.css
  scoreboardwidget.css
  searchBar.css
  widget.css
  wrong-page.css
```

</details>

<details>
<summary>src/lib/</summary>

```txt
  aot.js
  cat.js
  hpSpells.js
  joke.js
  kanyeQuote.js
  quizParams.js
  supabase.js
  TriviaApi.js
  uselessFact.js
```

</details>

<details>
<summary>src/pages/</summary>

```txt
  AuthLayout.jsx
  Dashboard.jsx
  EditProfile.jsx
  ForgotPassword.jsx
  FrontPage.jsx
  HowToPlay.jsx
  Login.jsx
  NotFound.jsx
  ProfilePage.jsx
  Quiz.jsx
  Signup.jsx
  UpdatePassword.jsx
```

</details>
