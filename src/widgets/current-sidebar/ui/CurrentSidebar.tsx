import { TagSidebar } from '@widgets/tag-sidebar'

export function CurrentSidebar({tags}: { tags: Array<{ key: string; label: string }> }) {
    return <TagSidebar all={tags}/>
}
