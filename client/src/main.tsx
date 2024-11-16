import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import BookForm from "./pages/BookForm";
import Layout from "./components/Layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/books/new" component={BookForm} />
          <Route path="/books/:id/edit" component={BookForm} />
          <Route>404 Page Not Found</Route>
        </Switch>
      </Layout>
      <Toaster />
    </SWRConfig>
  </StrictMode>,
);
