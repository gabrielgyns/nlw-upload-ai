import { Github, FileVideo, Upload, Wand2 } from 'lucide-react'
import { Button } from "./components/ui/button";
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Select } from './components/ui/select';
import { SelectTrigger } from './components/ui/select';
import { SelectValue } from './components/ui/select';
import { SelectContent } from './components/ui/select';
import { SelectItem } from './components/ui/select';
import { Slider } from './components/ui/slider';

export function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      {/* header */}
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💜 no NLW da Rocketseat
          </span>

          <Separator orientation='vertical' className='h-6' />

          <Button variant="outline">
            <Github className='w-4 h-4 mr-2'/>
            Github
          </Button>
        </div>
      </div>

      {/* main content */}
      <main className='flex-1 p-6 flex gap-6'>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...' 
            />
            <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA...'
              readOnly 
            />
          </div>

          <p className='text-sm text-muted-foreground'>
            <span className='text-violet-400'>⚠️</span> Lembre-se: você pode utilizar a variável <code className='text-violet-400'>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>
        <aside className='w-80 space-y-6'>
          <form className='space-y-6'>
            {/* form - load video */}
            <label 
              htmlFor="video" 
              className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
            >
              <FileVideo className='w-4 h-4' />
              Selecione um vídeo
            </label>
            <input type="file" id='video' accept='video/mp4' className='sr-only' /> {/* sr-only -> screen read only, removes the element from screen, the idea is to use the label for make a custom clickable file input */}

            <Separator />

            {/* form - transcription prompt */}
            <div className='space-y-2'>
              <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
              <Textarea
                id='transcription_prompt'
                className='h-20 leading-relaxed resize-none'
                placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)'
              />
            </div>
            
            <Button type='submit' className='w-full gap-2'>
              Carregar vídeo
              <Upload className='w-4 h-4' />
            </Button>
          </form>

          <Separator />

          <form className='space-y-6'>
            {/* form - prompt */}
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Selecione um prompt...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='title'>Título do YouTube</SelectItem>
                  <SelectItem value='description'>Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* form - model */}
            <div className='space-y-2'>
              <Label>Modelo</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-xs text-muted-foreground italic'>Você poderá customizar essa opção em breve!</span>
            </div>

            <Separator />

            {/* form - temper */}
            <div className='space-y-4'>
              <div className='flex justify-between items-center mb-5'>
                <Label>Temperatura</Label>
                <span className='text-xs text-muted-foreground'>0.5</span>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.1}
              />
              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                Valores mais altos tendem a deixar o resultado mais criativo e com mais chances de possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type='submit' className='gap-2 w-full'>
              Executar
              <Wand2 className='h-4 w-4' />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
