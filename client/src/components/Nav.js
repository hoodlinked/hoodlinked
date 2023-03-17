import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

export default function Nav() {
    return (

        <Breadcrumb bg='orange.500' w='100%' p={4} color='white'px={4} h={20}>
            <BreadcrumbItem>
                <BreadcrumbLink href='/'>
                    Home
                </BreadcrumbLink>
            </BreadcrumbItem>


            <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>
                    Dashboard
                </BreadcrumbLink>
            </BreadcrumbItem>


            <BreadcrumbItem>
                <BreadcrumbLink href='/groups'>
                    Groups
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}
