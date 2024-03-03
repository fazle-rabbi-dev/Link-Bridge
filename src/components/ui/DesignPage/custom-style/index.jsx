import { Background } from "./Background"
import { Button } from "./Button"
import { Fonts } from "./Fonts"

export const CustomStyle = () => {
  return (
    <section className="bg-white rounded-md my-6 px-4 space-y-6 py-6 dark-mode md:my-14 md:space-y-10">
      <Background />
      <Button />
      <Fonts />
    </section>
  )
}

