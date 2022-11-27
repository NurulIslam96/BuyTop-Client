import { format } from "date-fns";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Blog = () => {
  const { user } = useContext(AuthContext);
  const date = new Date();
  const formated = format(date, "PP");
  return (
    <section className="bg-gray-800 text-gray-100 my-10 rounded-md">
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-yellow-500">
              <h3 className="text-3xl font-semibold">Blogs</h3>
              <span className="text-sm font-bold tracking-wider uppercase text-gray-400">
                Welcome {user?.displayName}
              </span>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-yellow-500">
                <h3 className="text-xl font-semibold tracking-wide">
                  What are the different ways to manage a state in a React
                  application?
                </h3>
                <time className="text-xs tracking-wide uppercase text-gray-400">
                  {formated}
                </time>
                <p className="mt-3">
                  There are four main types of state you need to properly manage
                  in your React apps: <br /> 1: Local state.
                  <br />
                  2: Global state.
                  <br />
                  3: Server state.
                  <br />
                  4: URL state.
                  <br />
                  <strong>Local State</strong> is data we manage in one or
                  another component. <strong>Global state</strong> is data we
                  manage across multiple components.{" "}
                  <strong>Server state</strong> is data that comes from an
                  external server that must be integrated with our UI state.{" "}
                  <strong>URL state</strong> is data that exists on our URLs,
                  including the pathname and query parameters.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-yellow-500">
                <h3 className="text-xl font-semibold tracking-wide">
                  How does prototypical inheritance work?
                </h3>
                <time className="text-xs tracking-wide uppercase text-gray-400">
                  {formated}
                </time>
                <p className="mt-3">
                  Prototypical inheritance refers to the ability to access
                  object properties from another object. We use a JavaScript
                  prototype to add new properties and methods to an existing
                  object constructor. We can then essentially tell our JS code
                  to inherit properties from a prototype. Prototypical
                  inheritance allows us to reuse the properties or methods from
                  one JavaScript object to another through a reference pointer
                  function.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-yellow-500">
                <h3 className="text-xl font-semibold tracking-wide">
                  What is a unit test? Why should we write unit tests?
                </h3>
                <time className="text-xs tracking-wide uppercase text-gray-400">
                  {formated}
                </time>
                <p className="mt-3">
                  Unit testing is a software development process in which the
                  smallest testable parts of an application, called units, are
                  individually and independently scrutinized for proper
                  operation. The main objective of unit testing is to isolate
                  written code to test and determine if it works as intended.
                  Unit testing is an important step in the development process,
                  because if done correctly, it can help detect early flaws in
                  code which may be more difficult to find in later testing
                  stages.
                  <br />A unit test typically comprises of three stages: Plan,
                  cases and scripting and the unit test itself. In the first
                  step, the unit test is prepared and reviewed. The next step is
                  for the test cases and scripts to be made, then the code is
                  tested.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-yellow-500">
                <h3 className="text-xl font-semibold tracking-wide">
                  React vs. Angular vs. Vue?
                </h3>
                <time className="text-xs tracking-wide uppercase text-gray-400">
                  {formated}
                </time>
                <p className="mt-3">
                  <strong>One important note first:</strong> There is no best
                  framework or library here. All three libraries are very
                  popular for good reasons. They all have their strengths and
                  weaknesses and you can generally use either of the libraries
                  for any project.
                  <br />
                  <strong>Angular</strong> is a framework developed by Google. Google also uses
                  Angular internally, hence we'll not see Angular disappear over
                  night. It will be maintained and continuously improved.<br/><strong>React</strong>
                  is a library built by Facebook: Facebook also uses React
                  internally, hence we'll not see React disappear over night.It
                  will be maintained and continuously improved.<br/><strong>Vue</strong> is a
                  "standalone" project that is not built inside of any company.
                  It used to be a one-man show (Evan You, its founder) but those
                  days are long gone. Nowadays, it has a dedicated team of core
                  contributors that work on Vue.<br/>A detailed comparison is given in the given link:
                  <a className="link link-warning" href="https://academind.com/tutorials/angular-vs-react-vs-vue-my-thoughts"> React vs Angular vs Vue</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
