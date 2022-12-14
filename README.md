## About the project
The topic of filter bubbles, and targeted advertising through data collection really intrigued me this year, and I wanted to create an application that allowed a user to explore these two topics jointly. I also knew I wanted to create a project that implemented an infinite scroll and emulated a social media site. Thankfully, with the combination of these topics, it was not very difficult to come up with a general concept for an application, but it was a bit hard to narrow down. Then I found my inspiration: dogs.

Hound is an application that emulates a social media site by allowing a user to interact with "posts" of five breeds of dogs. In the background, Hound keeps track of the number of images of each breed the user has liked and then uses this information to fetch and tailor the feed to the preferences of the user. Over time, the user is hopefully able to see that some dog breeds have been filtered out—demonstrating the topic of filter bubbles. A progress bar on the top of the screen displays the progress toward a pop-up appearing--which occurs after a minute of the user interacting with the feed. This pop-up shows the user how many images of each breed they have liked, along with how a very algorithm is able to tailor their feed based on this information. 


## Running the App Locally (via Next.js documentation)Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
