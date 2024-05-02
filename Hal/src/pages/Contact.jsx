import React from 'react'

function Contact() {
  return (
    <>
       <section class="w-full md:py-24 border-t" id="contact">
        <br />
        <br />
      <div class="container flex flex-col items-center justify-center px-4 space-y-4 md:px-6">
        <div class="space-y-2 text-center">
          <h2 class="text-3xl font-bold text-indigo-600 tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
          <br />
          <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Ready to take the first step towards healing? Contact us to schedule an appointment.
          </p>
        </div>
        <div class="mx-auto w-full max-w-[400px] space-y-2">
          <form class="grid gap-2">
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Name"
              type="text"
            />
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Email"
              type="email"
            />
            <textarea
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              placeholder="Message"
            ></textarea>
            <button
              class="inline-flex items-center bg-indigo-600 text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              type="submit"
            >
              Submit
            </button>
      </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact