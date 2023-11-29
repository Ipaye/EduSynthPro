import PDFContent from '@/components/PDFContent'
import TextContent from '@/components/TextContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h3 className="text-3xl font-sans font-medium">Summarize</h3>
        <p className="text-sm text-muted-foreground">upload the text you want to summarize or pass a text file</p>

        <Tabs
          defaultValue="pdf"
          className="space-y-6 mt-6"
        >
          <TabsList>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          <TabsContent
            value="pdf"
            className=" bg-gray-700 bg-opacity-10 backdrop-blur-md rounded-md"
          >
            <PDFContent />
          </TabsContent>
          <TabsContent
            value="text"
            className=" bg-gray-700 bg-opacity-10 backdrop-blur-md rounded-md"
          >
            <TextContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
