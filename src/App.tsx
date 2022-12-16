import { Component, createSignal, For, onMount, createEffect } from "solid-js";

import Post from "./components/posts.component";
import User from "./components/users.component";
import { PostModel, UserModel } from "./models";

const API = {
  POSTS: "https://jsonplaceholder.typicode.com/posts",
  USERS: "https://jsonplaceholder.typicode.com/users",
};

const App: Component = () => {
  console.log("rendered");

  const [activeLink, setActiveLink] = createSignal<"posts" | "users">("posts");
  const [posts, setPosts] = createSignal<PostModel[] | null>(null);
  const [users, setUsers] = createSignal<UserModel[] | null>(null);

  onMount(async () => {
    const posts: PostModel[] = await (
      await fetch(API.POSTS, {
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setPosts(posts);
  });

  createEffect(async () => {
    const users: UserModel[] = await (
      await fetch(API.USERS, {
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setUsers(users);
  });

  return (
    <>
      <nav>
        <a
          onclick={() => setActiveLink("posts")}
          class={activeLink() === "posts" ? "active" : undefined}
        >
          Posts
        </a>
        <a
          onclick={() => setActiveLink("users")}
          class={activeLink() === "users" ? "active" : undefined}
        >
          Users
        </a>
      </nav>

      <main>
        {activeLink() === "posts" ? (
          <For each={posts()} fallback={<div>Loading...</div>}>
            {(item) => (
              <>
                <Post data={item} />
              </>
            )}
          </For>
        ) : (
          <For each={users()} fallback={<div>Loading...</div>}>
            {(item) => (
              <>
                <User data={item} />
              </>
            )}
          </For>
        )}
      </main>
    </>
  );
};

export default App;
