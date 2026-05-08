import Image from "next/image"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function page() {
  const heroSections = [
    {
      title: "Hero Image Callouts",
      description: "A hero section with callouts positioned on top of the image, ideal for highlighting key features or information.",
      src: "/images/hero-image-callouts.png",
      href: "/components/hero-section/hero-image-callouts"
    },
    {
      title: "Git Saturn",
      description: "A saturn planet created using React Three Fiber, showcasing a dynamic and interactive 3D visualization of GitHub data.",
      src: "/images/git-saturn.png",
      href: "/components/hero-section/git-saturn"
    },
  ]
  
  return (
    <div className="p-4">
      <header>
        <Breadcrumb className='bg-secondary/20 rounded-full w-fit border px-3 py-2'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Hero Section</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mt-4 mb-4 text-2xl font-semibold">Hero Section</h1>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {heroSections.map((section) => (
          <Link href={section.href} key={section.title} className="w-fit">
            <div className="rounded-xl border max-w-sm shadow">
            <Image
              src={section.src}
              alt={section.title}
              width={400}
              height={400}
              className="w-full aspect-square object-cover rounded-t-xl"
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