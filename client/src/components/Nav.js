import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'

export default function Nav() {
    return (

        <Breadcrumb>
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
