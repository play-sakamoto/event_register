import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Construction } from "lucide-react"

interface EmptyPageProps {
  title: string
  description: string
}

export default function EmptyPage({ title, description }: EmptyPageProps) {
  return (
    <Card className="text-center py-12">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Construction className="mr-2 h-6 w-6 text-gray-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
