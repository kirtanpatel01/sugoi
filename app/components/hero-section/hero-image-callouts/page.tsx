import HeroImageCallouts from '@/components/custom/hero-image-callouts'
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { IconCircleCheckFilled, IconPlus } from '@tabler/icons-react'

function page() {
  const nodes = [
    {
      position: { top: 20, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500" />
          <span>Team Learning Programs</span>
        </div>
      ),
    },
    {
      position: { top: 30, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500 " />
          <span>1:1 Mentor Sessions</span>
        </div>
      )
    },
    {
      position: { top: 50, left: -2 },
      content: (
        <div className="max-w-24 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-4xl">35+</h1>
          <span className="text-xs">Supported Regions</span>
        </div>
      )
    },
    {
      position: { top: 85, left: 105 },
      content: (
        <div className="max-w-36 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl flex-wrap">
          <h1 className="font-medium text-4xl">2,400+</h1>
          <span className="text-xs">Guided Learning Modules</span>
        </div>
      )
    },
    {
      position: { top: 70, left: 0 },
      content: (
        <div className="bg-background rounded-3xl p-3 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-xl">Build Your Focus</h1>
          <div className="text-xs flex gap-2">
            {["Communication", "Leadership", "Strategy"].map((skill) => (
              <div key={skill} className="flex items-center gap-1 rounded-full border border-blue-500 bg-blue-500/10 p-1.5">
                <IconPlus className="text-blue-500" size={16} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ]

  return (
    <div className='p-4'>
      <Breadcrumb className='bg-secondary/20 rounded-full w-fit border p-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components/hero-section">Hero Section</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hero Image Callouts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <HeroImageCallouts
        image={{
          src: "https://i.pinimg.com/1200x/c8/16/1b/c8161b685b3848fe8804be950ddbd02b.jpg",
          alt: "Hero Image",
          width: 400,
          classNmame: "rounded-2xl"
        }}
        nodes={nodes}
        className="mx-auto"
      />
    </div>
  )
}

export default page