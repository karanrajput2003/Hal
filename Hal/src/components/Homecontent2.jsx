import React from 'react'

function Homecontent2() {
  return (
    <>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-indigo-600 tracking-tighter md:text-4xl/tight">How AI-assisted therapy works</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Personalized recommendations, 24/7 support, and progress tracking. Our AI is here to help you on your
                journey to better mental health.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-2">
                <h3 className="text-xl text-black font-bold">Personalized recommendations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our AI analyzes your progress and tailors your therapy sessions to your needs.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl text-black font-bold">24/7 support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You can reach out to our team at any time for guidance and support.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl text-black font-bold">Progress tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You can see your progress over time, which can be motivating and help you identify areas for
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Homecontent2