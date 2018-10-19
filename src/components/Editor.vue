<template lang="pug">
  editor.editor(
    ref="editor"
    :extensions="extensions"
    :editable="editable"
    @update="onUpdate"
  )
    div.menu(v-if="editable", slot="menubar" slot-scope="{ nodes, marks }")
      div(v-if="nodes && marks")
        button(
          :class="{ 'is-active': marks.bold.active() }"
          @click.prevent='marks.bold.command'
        )
          i.feather-bold
        button(
          :class="{ 'is-active': marks.italic.active() }"
          @click.prevent="marks.italic.command"
        )
          i.feather-italic
        button(
          :class="{ 'is-active': marks.strike.active() }"
          @click.prevent="marks.strike.command"
        )
          i.feather-minus
        button(
          :class="{ 'is-active': marks.underline.active() }"
          @click.prevent="marks.underline.command"
        )
          i.feather-underline
        button(
          :class="{ 'is-active': nodes.paragraph.active() }"
          @click.prevent="nodes.paragraph.command"
        ) ¶
        button(
          :class="{ 'is-active': nodes.heading.active({ level: 1 }) }"
          @click.prevent="nodes.heading.command({ level: 1 })"
        )
          b H1
        button(
          :class="{ 'is-active': nodes.heading.active({ level: 2 }) }"
          @click.prevent="nodes.heading.command({ level: 2 })"
        )
          b H2
        button(
          :class="{ 'is-active': nodes.heading.active({ level: 3 }) }"
          @click.prevent="nodes.heading.command({ level: 3 })"
        )
          b H3
        button(
          :class="{ 'is-active': nodes.bullet_list.active() }"
          @click.prevent="nodes.bullet_list.command"
        )
          i.feather-list
        button(
          :class="{ 'is-active': nodes.ordered_list.active() }"
          @click.prevent="nodes.ordered_list.command"
        )
          i.feather-list
        button(
          :class="{ 'is-active': nodes.blockquote.active() }"
          @click.prevent="nodes.blockquote.command"
        )
          i.feather-chevron-right
        button(
          @click.prevent="showImagePrompt(nodes.image.command)"
        )
          i.feather-image
    .area(slot="content" slot-scope="props", :class="{ editable }")
</template>

<script>
  import { Editor } from 'tiptap'
  import {
    // Nodes
    BlockquoteNode,
    BulletListNode,
    HeadingNode,
    HardBreakNode,
    ImageNode,
    ListItemNode,
    OrderedListNode,

    // Marks
    BoldMark,
    ItalicMark,
    LinkMark,
    StrikeMark,
    UnderlineMark,

    // General Extensions
    HistoryExtension,
    PlaceholderExtension
  } from 'tiptap-extensions'

  export default {
    components: {
      Editor
    },
    props: {
      initialValue: {
        type: String,
        default: null
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        value: null,
        extensions: [
          new BlockquoteNode(),
          new BulletListNode(),
          new HeadingNode({ maxLevel: 3 }),
          new HardBreakNode(),
          new ImageNode(),
          new ListItemNode(),
          new OrderedListNode(),
          new BoldMark(),
          new ItalicMark(),
          new LinkMark(),
          new StrikeMark(),
          new UnderlineMark(),
          new HistoryExtension(),
          new PlaceholderExtension()
        ]
      }
    },
    mounted () {
      if (this.initialValue && this.initialValue.length > 0) {
        this.$refs.editor.setContent(this.initialValue)
      }
    },
    methods: {
      onUpdate ({ getHTML }) {
        let html = getHTML()

        if (html === '<p></p>') {
          this.value = null
        } else {
          this.value = html
        }

        this.$emit('input', this.value)
      },
      showImagePrompt (command) {
        const src = prompt('Enter the url of your image here')
        if (src !== null) {
          command({ src })
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .editor.error
    .menu, .area
      border-color: red

    .menu
      border-bottom-color: $border-color

  .menu
    border: $border

    button
      padding: 0.5rem 0.5rem
      background-color: transparent
      border: none
      cursor: pointer

      &:hover
        background-color: rgba(0, 0, 0, 0.02)

      &:not(:first-of-type)
        border-left: $border

      &:last-of-type
        border-right: $border

      &.is-active
        color: white
        background-color: black

        &:hover
          background-color: black

  .area
    padding: 1rem 2rem
    color: initial

    &.editable
      background-color: rgba(0, 0, 0, 0.02)
      border: $border
      border-top-color: transparent !important

  .floating-menu
    position: absolute
    margin-top: -0.5rem
    margin-left: 1rem
    visibility: hidden
    opacity: 0
    transition: opacity 0.2s, visibility 0.2s

    button
      padding: 0.5rem 0.5rem
      background-color: transparent
      border: none
      cursor: pointer
</style>
