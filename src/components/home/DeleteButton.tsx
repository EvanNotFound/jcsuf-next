'use client'
import React from 'react'
import { IconButton, Button} from "@primer/react";
import { TrashIcon, XIcon} from '@primer/octicons-react'
import deletePost from '@/lib/deletePost';
import getNewPosts from '@/lib/getNewPosts';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Code,
    useToast
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

type Props = {
    postId: number,
    postTitle: string
}

export default function DeleteButton({postId, postTitle}:Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const {posts, mutate} = getNewPosts();
    const handleDelete = async() => {
        

        const status = await deletePost({postId: postId})
        switch (status.code) {
            case 0:
                onClose()
                const closeToast = () => {
                    toast.closeAll()
                }
				toast({
					position: "top-right",
					duration: 3500,
					render: () => (
						<div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between translate-y-20">
							<div>
								<h3 className="font-bold text-gh-red-9 flex items-center dark:text-gh-red-1">
									<TrashIcon
										size={16}
										className="text-gh-red-6 mr-2 dark:text-gh-red-3"
									/>
									删除成功
								</h3>
							</div>
                            <div>
                                <IconButton aria-label="Close" icon={XIcon} onClick={closeToast} variant="invisible"/>
                            </div>
						</div>
					),
				});
                setTimeout(() => {
                    mutate({ ...posts, articles: posts.articles.filter((post : {id:number}) => post.id !== postId) })
                }, 800)
                break
            case 1:
                alert("指向的帖子不存在！")
                break
            case 2:
                alert("权限不足！")
        }
    }
    
    

  return (
    <>
        <IconButton aria-label="Delete" icon={TrashIcon} onClick={onOpen} variant="danger"/>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='rounded-xl bg-gh-bg dark:bg-gh-darkbg gh-border dark:border-gh-darkborder'>
          <ModalHeader>删除帖子</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='items-center'>
            你确定要删除帖子 <Code className='dark:bg-gh-gray-6 dark:text-gh-gray-0'>{postTitle}</Code> 吗？
          </ModalBody>

          <ModalFooter className='flex justify-end'>
            <Button variant="default" onClick={onClose} className='mr-2'>
              取消
            </Button>
            <Button variant='danger' onClick={handleDelete}>确定删除</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
