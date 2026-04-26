import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const GitHubCallback = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [status, setStatus] = useState('processing')

    useEffect(() => {
        const data = searchParams.get('data')
        const error = searchParams.get('error')

        if (error) {
            setStatus('error')
            const errorMessages = {
                github_no_code: 'GitHub authorization was cancelled.',
                github_token_failed: 'Failed to exchange GitHub token.',
                github_no_email: 'No email found on your GitHub account. Please ensure you have a verified email.',
                github_auth_failed: 'GitHub authentication failed.',
            }
            toast.error(errorMessages[error] || 'GitHub sign-in failed.')
            setTimeout(() => navigate('/'), 2000)
            return
        }

        if (data) {
            try {
                const parsed = JSON.parse(decodeURIComponent(data))
                dispatch(login(parsed))
                localStorage.setItem('token', parsed.token)
                toast.success(parsed.message || 'Signed in with GitHub!')
                setStatus('success')
                navigate('/app', { replace: true })
            } catch (e) {
                setStatus('error')
                toast.error('Failed to process GitHub sign-in data.')
                setTimeout(() => navigate('/'), 2000)
            }
        } else {
            setStatus('error')
            toast.error('No data received from GitHub.')
            setTimeout(() => navigate('/'), 2000)
        }
    }, [searchParams, dispatch, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body, #fafafa)' }}>
            <div className="text-center">
                {status === 'processing' && (
                    <>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                border: '3px solid #e5e5e5',
                                borderTop: '3px solid #111',
                                borderRadius: '50%',
                                animation: 'spin 0.7s linear infinite',
                                margin: '0 auto 16px',
                            }}
                        />
                        <p className="text-neutral-600 text-sm font-medium">
                            Signing in with GitHub…
                        </p>
                    </>
                )}
                {status === 'error' && (
                    <p className="text-red-600 text-sm font-medium">
                        Something went wrong. Redirecting…
                    </p>
                )}
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default GitHubCallback
