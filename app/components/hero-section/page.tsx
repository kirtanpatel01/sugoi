import Image from "next/image"
import Link from "next/link"

function page() {
  const heroSections = [
    {
      title: "Hero Image Callouts",
      description: "A hero section with callouts positioned on top of the image, ideal for highlighting key features or information.",
      src: "/images/hero-image-callouts.png",
      href: "/components/hero-section/hero-image-callouts"
    },
  ]
  
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Hero Section</h1>
      <div className="grid grid-cols-3 gap-4">
        {heroSections.map((section) => (
          <Link href={section.href} key={section.title} className="w-fit">
            <div className="rounded-xl border max-w-sm shadow">
            <Image
              src={section.src}
              alt={section.title}
              width={400}
              height={400}
              className="w-full rounded-t-xl"
            />
            <div className="border-t p-4">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default page