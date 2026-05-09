import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type PropsTableRow = {
  prop: string
  type: string
  required: boolean
  description: string
}

export type PropsTableGroup = {
  title: string
  description?: string
  rows: PropsTableRow[]
  children?: PropsTableGroup[]
}

interface PropsTableProps {
  groups: PropsTableGroup[]
}

function PropsTableGrid({ rows }: { rows: PropsTableRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[120px] whitespace-normal">Prop</TableHead>
          <TableHead className="min-w-[200px] whitespace-normal">Type</TableHead>
          <TableHead className="min-w-[100px] whitespace-normal">Required</TableHead>
          <TableHead className="min-w-[250px] whitespace-normal">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.prop}>
            <TableCell className="whitespace-normal align-top font-medium">{row.prop}</TableCell>
            <TableCell className="whitespace-normal align-top">
              <code className="block whitespace-pre-wrap wrap-break-word font-mono text-sm leading-6">
                {row.type}
              </code>
            </TableCell>
            <TableCell className="whitespace-normal align-top">{row.required ? 'Required' : 'Optional'}</TableCell>
            <TableCell className="whitespace-normal align-top leading-6 text-muted-foreground">{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  )
}

function PropsTableSection({ group }: { group: PropsTableGroup }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold tracking-tight capitalize">{group.title}</h2>
        {group.description ? <p className="text-sm text-muted-foreground">{group.description}</p> : null}
      </div>

      <PropsTableGrid rows={group.rows} />

      {group.children?.length ? (
        <div className="space-y-6 pt-2">
          {group.children.map((child) => (
            <PropsTableSection key={child.title} group={child} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export function PropsTable({ groups }: PropsTableProps) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <PropsTableSection key={group.title} group={group} />
      ))}
    </div>
  )
}