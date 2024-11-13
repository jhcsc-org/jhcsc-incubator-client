import { authenticatorComponents, authenticatorFormFields } from '@/components/custom-authenticator'
import Layout from '@/components/layout/main-layout'
import { PubSubProvider } from '@/context/pubsub-context'
import { PUBSUBCONFIG } from '@/lib/constants'
import { useCustomTheme } from '@/lib/theme'
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface IRootRouteContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<IRootRouteContext>()({
  component: () => (
    <ConfiguredEntryPointFunction>
      <Outlet />
    </ConfiguredEntryPointFunction>
  ),
})

function ConfiguredEntryPointFunction({ children }: { children: React.ReactNode }) {
  const theme = useCustomTheme()
  return (
    <ThemeProvider colorMode="system" theme={theme}>
      <Authenticator className="h-[100vh]" formFields={authenticatorFormFields} components={authenticatorComponents}>
        <PubSubProvider config={PUBSUBCONFIG}>
          <Layout>
            {children}
          </Layout>
        </PubSubProvider>
      </Authenticator>
    </ThemeProvider>
  )
}